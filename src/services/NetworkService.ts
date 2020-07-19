import { error } from "util";
const fetch = require("node-fetch");

export class NetworkService {
   
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