import nem2Sdk = require("symbol-sdk");
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
  
}
