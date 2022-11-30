import { Controller } from "@hotwired/stimulus"
import { clusterApiUrl, Connection, GetProgramAccountsFilter} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Connects to data-controller="get-creator-for-fil"
export default class extends Controller {
  connect() {
  }

  getCreator() {
    const provider = this.get_provider()
    const connection = new Connection(clusterApiUrl('devnet'))

    async function getTokenAccounts(provider, connection) {
      let mint_tokens = []
      const filters = [
        {
          dataSize: 165,    //size of account (bytes)
        },
        {
          memcmp: {
            offset: 32,     //location of our query in the account (bytes)
            bytes: provider.publicKey.toBase58(),  //our search criteria, a base58 encoded string
          }
        }
      ]

      const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,   //SPL Token Program, new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        {filters: filters})

       accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo = account.account.data
        const mintAddress = parsedAccountInfo["parsed"]["info"]["mint"]
        const tokenBalance = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"]
        //Log results
        if (tokenBalance === 1) {
          mint_tokens.push(mintAddress)
        }
      })

      return mint_tokens
    }

    getTokenAccounts(provider, connection).then((mint_tokens) => {
      document.getElementById("fil_creator_id").value = mint_tokens
      Rails.fire(document.querySelector('form'), 'submit')
    }).catch((error) => {
      console.log(error)
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
}
