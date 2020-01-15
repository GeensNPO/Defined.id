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
/*
  public static getGenerationHash(nodeUri: string): any {
    fetch(nodeUri + '/block/1')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json.meta.generationHash as String
      });
  }*/
  public static getGenerationHash(nodeUri: string): string {
   return "DAC066B6DEC25B4255BAE7872C001147EE1CAE5063080B839D0D2219A901209C"
  }
}
