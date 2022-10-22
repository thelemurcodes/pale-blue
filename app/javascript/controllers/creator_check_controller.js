import { Controller } from "@hotwired/stimulus"
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

// Connects to data-controller="creator-check"
export default class extends Controller {
  static values = {
    creator: String
  }

  connect() {
    const connection = new Connection(clusterApiUrl('devnet'))
    const creator_id = new PublicKey(this.creatorValue);

    async function main(connection, creator_id) {
      const provider = get_provider()
      try {
        await provider.connect();
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
      } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
      }
      const creator_wallet = await get_creator_wallet(connection, creator_id)
      const provider_wallet = provider.publicKey.toString()
      return creator_wallet === provider_wallet
    }

    async function get_creator_wallet(connection, creator_id) {
      const largestAccounts = await connection.getTokenLargestAccounts(
        creator_id
      )
      const largestAccountInfo = await connection.getParsedAccountInfo(
        largestAccounts.value[0].address
      )
      return largestAccountInfo.value.data.parsed.info.owner
    }
    function get_provider() {
      if ('phantom' in window) {
        const provider = window.phantom?.solana;

        if (provider?.isPhantom) {
          return provider;
        }
      }
    }

    main(connection, creator_id).then((test) => {
      if (test) {
        document.getElementById("edit").disabled = false
        document.getElementById("edit").hidden = false
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
