import { Controller } from "@hotwired/stimulus"
import { Keypair, getTokenLargestAccounts, getParsedAccountInfo, clusterApiUrl, SystemProgram, Connection, PublicKey, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, createSetAuthorityInstruction, AuthorityType } from '@solana/spl-token';
import { getPythProgramKeyForCluster, PriceStatus, PythHttpClient } from "@pythnetwork/client";
const SOLANA_CLUSTER_NAME = 'devnet'
const RAFFLE_TICKET_ACCT = new PublicKey('7cBbMRmDkByDkyRnbeg1svwi95wA2yD8JR4wBDB6XS2L')

// Connects to data-controller="donation"
export default class extends Controller {
  static targets = ["val", "estimate"]
  static values = {
    creator: String
  }

  connect() {
    this.update_price()
  }

  three(){
    this.valTarget.value = 3
  }

  seven() {
    this.valTarget.value = 7
  }

  ten() {
    this.valTarget.value = 10
  }

  hideModal() {
    document.getElementById("modal-background").remove()
    this.element.parentElement.removeAttribute("src")
    this.element.remove()
  }

  get_provider() {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }
  }

  donate() {
    document.getElementById("disabled").disabled = true
    document.getElementById("disabled").innerHTML = 'Processing...'

    const provider = this.get_provider()
    const connection = new Connection(clusterApiUrl('devnet'))
    const amount = this.valTarget.value
    const creator_id = new PublicKey(this.creatorValue)

    async function main(connection, provider, amount, creator_id) {
      const price = await get_price()
      const creator_wallet = await get_creator_wallet(connection, creator_id)
      const new_amt = amount / price
      
       // Send sol to creator wallet
      const signature = await phantomTransfer(provider, creator_wallet, new_amt)
      return signature
    }

    // Find creator wallet address
    async function get_creator_wallet(connection, creator_id) {
      const largestAccounts = await connection.getTokenLargestAccounts(
        creator_id
      )
      const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address
      )
      return largestAccountInfo.value.data.parsed.info.owner
    }

    async function phantomTransfer(provider, creator_wallet, new_amt) {
      const transaction = new Transaction()
      transaction.add(
        SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: creator_wallet,
            lamports: Math.round(new_amt*LAMPORTS_PER_SOL),
        })
      )

      await connection.getRecentBlockhash('finalized').then((result) => {
        transaction.recentBlockhash = result.blockhash
      })
      transaction.feePayer = provider.publicKey
      const signedTransaction = await provider.signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize())
      return signature
    }

    // Convert amount to sol
    async function get_price() {
      const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER_NAME), 'confirmed');
      const pythPublicKey = getPythProgramKeyForCluster(SOLANA_CLUSTER_NAME)
      const pythClient = new PythHttpClient(connection, pythPublicKey)
      const data = await pythClient.getData();

      for (let symbol of data.symbols) {
        if (symbol === 'Crypto.SOL/USD') {
          const price = data.productPrice.get(symbol)

          if (price.price && price.confidence) {
            // tslint:disable-next-line:no-console
            return price.price
          } else {
            // tslint:disable-next-line:no-console
            return null
          }
        }
      }
    }

    main(connection, provider, amount, creator_id).then((signature) => {
      document.getElementById("disabled").innerHTML = 'Completed'
      document.getElementById("donation_confirmation").value = signature
      Rails.fire(document.querySelector('form'), 'submit')
    }).catch((error) => {
      console.error(error)
    })
  }

  claimTickets() {
    async function sendRaffleTickets(connection, payer, provider, amount) {
      const toAddress = await createDonorAcct(connection, payer, provider)
      const raffleAmount = getRaffleAmount(amount)
      const raffle_sig = await transfer(payer, toAddress, raffleAmount)
      return raffle_sig
    }

    async function transfer(payer, toAddress, amount) {
      const connection = new Connection(clusterApiUrl('devnet'))
      const signature = await transfer(
        connection,
        payer,
        RAFFLE_TICKET_ACCT,
        toAddress,
        payer.publicKey,
        amount
      )
      console.log('mint tx:', signature)
    }

    // Send donor creator key
    async function createDonorAcct(connection, payer, provider) {
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        RAFFLE_TICKET_ACCT,
        provider.publicKey
      )
      return toTokenAccount.address
    }

    function getRaffleAmount(amount){
      switch(true) {
        case amount >= 10:
          return 3
        case amount >= 7 && amount < 10:
          return 2
        case amount >= 3 && amount < 7:
          return 1
        default:
          return 0
      }
    }
  }

  update_price() {
    (async() => {
      const connection = new Connection(clusterApiUrl(SOLANA_CLUSTER_NAME), 'confirmed');
      const pythPublicKey = getPythProgramKeyForCluster(SOLANA_CLUSTER_NAME)
      const pythClient = new PythHttpClient(connection, pythPublicKey)
      const data = await pythClient.getData();

      for (let symbol of data.symbols) {
        if (symbol === 'Crypto.SOL/USD') {
          const price = data.productPrice.get(symbol)

          if (price.price && price.confidence) {
            // tslint:disable-next-line:no-console
            this.estimateTarget.innerHTML = `<p style="font-size:small">Current $${price.price.toFixed(2)}/SOL<p>`
          } else {
            // tslint:disable-next-line:no-console
            this.estimateTarget.innerHTML = `${symbol}: price currently unavailable. status is ${PriceStatus[price.status]}`
          }
        }
      }
    })()
  }

  initialize_keypair() {
    const secret = JSON.parse(gon.private_key ?? "")
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
  }
}
