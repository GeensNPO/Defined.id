import nem2Sdk = require("symbol-sdk");
import {NemTransactionService} from '..';
import PublicAccount = nem2Sdk.PublicAccount;

export class IdentityService {
    public static AccountRegistered(account: PublicAccount, nodeUri: string): Promise<boolean> {
      return NemTransactionService.getRegisteredHashes(account, nodeUri).then((hashes) => {
        return (hashes !== undefined && hashes.length > 0);
      });
    }
}
