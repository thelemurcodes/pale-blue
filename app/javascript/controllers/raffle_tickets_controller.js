import { Controller } from "@hotwired/stimulus"
import { PublicKey, clusterApiUrl, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer, createSetAuthorityInstruction, AuthorityType } from '@solana/spl-token';
import { main } from "@popperjs/core";

// Connects to data-controller="raffle-tickets"
export default class extends Controller {
  static values = {
    amt: String
  }
  connect() {
    console.log(this.amtValue)
  }

  create() {
    this.new_mint()
  }

  mintNew() {
    document.getElementById("disabled").disabled = true
    document.getElementById("disabled").innerHTML = 'Processing...'
    const payer = this.initialize_keypair()
    const amt = parseInt(this.amtValue)

    async function main(payer, amt) {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const key = new PublicKey('7cBbMRmDkByDkyRnbeg1svwi95wA2yD8JR4wBDB6XS2L')
      const assoc = new PublicKey('E2gvKoXw85npsqvSDKXC3WeJa6X2p6UZjYqoJ1LYRKPE')
      let signature = await mintTo(
        connection,
        payer,
        key,
        assoc,
        payer.publicKey,
        amt
      )

      console.log('mint tx:', signature)
    }

    main(payer, amt).then(() => {
      this.createDonorAcct()
    }).catch((error) => {
      console.error(error)
    })

  }

  new_mint() {
    const payer = this.initialize_keypair()

    async function main(payer) {
      const key = new PublicKey('5STBTakXip2YTvnG5ANCGHqwmxLbguB5UzdsAqkb2jVv')

      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

      const mint = await createMint(
        connection,
        payer,
        payer.publicKey,
        key,
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

    }

    main(payer).then(() => {
    }).catch((error) => {
      console.error(error)
    })
  }

  createDonorAcct() {
    const payer = this.initialize_keypair()
    const provider = this.get_provider()

    async function main(payer, provider) {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const key = new PublicKey('7cBbMRmDkByDkyRnbeg1svwi95wA2yD8JR4wBDB6XS2L')

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        key,
        provider.publicKey
      )

      console.log(toTokenAccount.address.toBase58())
    }

    main(payer, provider).then(() => {
      this.transfer()
    }).catch((error) => {
      console.error(error)
    })
  }

  transfer() {
    const payer = this.initialize_keypair()
    const amt = parseInt(this.amtValue)

    async function main(payer, amt) {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const from = new PublicKey('E2gvKoXw85npsqvSDKXC3WeJa6X2p6UZjYqoJ1LYRKPE')
      const to = new PublicKey('7zpmzAXsrLWjbMGp22mGS2fSBhcG2puXBPxJdPDNhhjH')
      let signature = await transfer(
        connection,
        payer,
        from,
        to,
        payer.publicKey,
        amt
      )
      console.log('mint tx:', signature)
    }

    main(payer, amt).then(() => {
      document.getElementById("disabled").innerHTML = 'Completed'
      document.getElementById("donation_redeemed").value = true
      Rails.fire(document.querySelector('form'), 'submit')
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

  initialize_keypair() {
    const secret = JSON.parse(gon.private_key ?? "")
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
  }
}
