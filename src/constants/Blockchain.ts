import nem2Sdk = require("symbol-sdk");
import NetworkType = nem2Sdk.NetworkType;
import { error } from "util";
const fetch = require("node-fetch");


export class Blockchain {

  public static getNetworkTypeByBlockchain(blockchain: string): NetworkType | undefined {
    switch (blockchain) {
        case "PublicTestnet":
            return NetworkType.TEST_NET;

        default:
            undefined

    }
  }

  public static getGenerationHash(nodeUri: string): Promise<string> {
    return fetch(nodeUri + '/node/info')
      .then((response: { json: () => any; }) => {
        return response.json();
      })
      .then((json: { networkGenerationHashSeed: string; }) => {
        return json.networkGenerationHashSeed as string
      }).catch(
        console.log(error)
      )
      
  }
  
}
