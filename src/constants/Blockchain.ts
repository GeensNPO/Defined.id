import nem2Sdk = require("nem2-sdk");
import NetworkType = nem2Sdk.NetworkType;


export class Blockchain {

  public static getNetworkTypeByBlockchain(blockchain: string): NetworkType | undefined {
    switch (blockchain) {
        case "PublicTestnet":
            return NetworkType.MIJIN_TEST;

        default:
            undefined

    }
  }
}
