import { Controller } from "@hotwired/stimulus"
import { getPythProgramKeyForCluster, PriceStatus, PythHttpClient } from "@pythnetwork/client";
import { Connection, clusterApiUrl } from '@solana/web3.js';
const SOLANA_CLUSTER_NAME = 'devnet'

// Connects to data-controller="apply"
export default class extends Controller {
  static targets = ['status', 'estimate']
  connect() {
    this.update_price()
  }

  get_provider() {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
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
            this.statusTarget.innerHTML = `<p>Current USD/SOL:
            $${price.price.toFixed(2)}<p><p>Creator ID cost estimate:
            ${(10 / price.price).toFixed(2)} SOL</p>`
          } else {
            // tslint:disable-next-line:no-console
            console.log(`${symbol}: price currently unavailable. status is ${PriceStatus[price.status]}`)
          }
        }
      }
    })()
  }
}
