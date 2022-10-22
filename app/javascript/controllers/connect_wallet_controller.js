import { Controller } from "@hotwired/stimulus"
import { clusterApiUrl, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, createSetAuthorityInstruction, AuthorityType } from '@solana/spl-token';
import { getPythProgramKeyForCluster, PriceStatus, PythHttpClient } from "@pythnetwork/client";
const MINT_WALLET = '7gtFJYqghDgXahfyMw9qoqJaUqNgGnpNY1TBHcrhuCUn';
const SOLANA_CLUSTER_NAME = 'devnet'

// Connects to data-controller="connect-wallet"
export default class extends Controller {
  static targets = ['wallet']

  initialize() {
    const provider = this.get_provider()
    provider.connect({ onlyIfTrusted: true })
    .then(() => {
      this.display_wallet(provider.publicKey.toString())
    })
    .catch((error) => {
        console.log(error)
    })
  }

  display_wallet(address) {
    const display = `${address.slice(0,4)}...${address.slice(address.length - 4)}`
    this.walletTarget.innerHTML = display
  }

  connect_wallet() {
    const provider = this.get_provider()
    async function main() {
        await provider.connect()
    }
    main().then(() => {
      this.display_wallet(provider.publicKey.toString())
    }).catch((error) => {
      console.error(error)
    })
  }

  get_provider() {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }
  }

  get_price() {
    async function main() {
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
            console.log(`${symbol}: price currently unavailable. status is ${PriceStatus[price.status]}`)
          }
        }
      }
    }
    main().then((price) => {
      const amount = 10 / price
      console.log(amount)
    }).catch((error) => {
      console.log(error)
    })
  }

  apply(){
    document.getElementById("disabled").disabled = true
    document.getElementById("disabled").innerHTML = 'Processing...'
    const provider = this.get_provider()
    const connection = new Connection(clusterApiUrl('devnet'))

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
            return (10 / price.price)
          } else {
            // tslint:disable-next-line:no-console
            return null
          }
        }
      }
    }

    async function main(connection, provider) {
      const amount = await get_price()
      const transaction = new Transaction()
      transaction.add(
        SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            toPubkey: MINT_WALLET,
            lamports: Math.round(amount*LAMPORTS_PER_SOL),
        })
      )

      await connection.getRecentBlockhash('finalized').then((result) => {
        transaction.recentBlockhash = result.blockhash
      })
      transaction.feePayer = provider.publicKey
      const { signature } = await provider.signAndSendTransaction(transaction)
      await connection.getSignatureStatus(signature)
    }

    main(connection, provider).then(() => {
      this.new_mint()
    }).catch((error) => {
      console.error(error)
    })
  }

  new_mint() {
    const payer = this.initialize_keypair()
    const provider = this.get_provider()

    async function main(payer, provider) {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

      const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        null,
        0
      )

      console.log(mint.toBase58())

      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
      )

      console.log(fromTokenAccount.address.toBase58())

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        provider.publicKey
      )

      console.log(toTokenAccount.address.toBase58())

      let signature = await mintTo(
        connection,
        payer,
        mint,
        fromTokenAccount.address,
        payer.publicKey,
        1
      )

      console.log('mint tx:', signature)

      const transaction = new Transaction()
        .add(createSetAuthorityInstruction(
          mint,
          payer.publicKey,
          AuthorityType.MintTokens,
          null
        ))

      await sendAndConfirmTransaction(connection, transaction, [payer])

      signature = await transfer(
        connection,
        payer,
        fromTokenAccount.address,
        toTokenAccount.address,
        payer.publicKey,
        1
      )
      console.log('mint tx:', signature)
      return mint.toBase58()
    }

    main(payer, provider).then((paleBlueID) => {
      document.getElementById("disabled").innerHTML = 'Completed';
      document.getElementById('creator_pale_blue_tkn').value = paleBlueID
      Rails.fire(document.querySelector('form'), 'submit')
    }).catch((error) => {
      document.getElementById("disabled").innerHTML = 'Error';
      console.error(error)
    })
  }

  initialize_keypair() {
    const secret = JSON.parse(gon.private_key ?? "")
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
  }
}
