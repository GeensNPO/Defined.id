import nem2Sdk = require("nem2-sdk");
import NetworkType = nem2Sdk.NetworkType;


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
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.meta.generationHash as string
      })
      
  }
  
}
