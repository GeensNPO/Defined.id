import nem2Sdk = require("nem2-sdk");
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
    return fetch(nodeUri + '/block/1')
      .then((response: { json: () => any; }) => {
        return response.json();
      })
      .then((json: { meta: { generationHash: string; }; }) => {
        return json.meta.generationHash as string
      }).catch(
        console.log(error)
      )
      
  }
  
}
