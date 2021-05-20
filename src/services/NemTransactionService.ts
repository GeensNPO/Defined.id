import nem2Sdk = require('symbol-sdk');
import { NemAccount, TransactionFilter, Blockchain } from '..';
import { NetworkService } from './NetworkService';
import PublicAccount = nem2Sdk.PublicAccount;
import TransferTransaction = nem2Sdk.TransferTransaction;
import Transaction = nem2Sdk.Transaction;
import { RepositoryFactoryHttp, TransactionGroup, TransactionSearchCriteria, TransactionType } from 'symbol-sdk';

const Address = nem2Sdk.Address;
const Deadline = nem2Sdk.Deadline;
const Account = nem2Sdk.Account;
const UInt64 = nem2Sdk.UInt64;
const PlainMessage = nem2Sdk.PlainMessage;
const Mosaic = nem2Sdk.Mosaic;
const MosaicId = nem2Sdk.MosaicId;
const TransactionHttp = nem2Sdk.TransactionHttp;
const AccountHttp = nem2Sdk.AccountHttp;
// const XEM = nem2Sdk.NetworkCurrencyLocal;

export class NemTransactionService {
  public static createTimestampTransaction(
    nemAccount: NemAccount,
    epochAdjustment: number,
    hash: string,
    nodeUri: string,
  ): Promise<nem2Sdk.SignedTransaction> {
    return new Promise(async (resolve, reject) => {
      const privateKey: string | undefined = nemAccount.privateKey;
      const address: string | undefined = nemAccount.address;
      const networkType: nem2Sdk.NetworkType | undefined = nemAccount.networkType;
      if (networkType && address && privateKey) {
        let transferTransaction = TransferTransaction.create(
          Deadline.create(epochAdjustment),
          Address.createFromRawAddress(address),
          [],
          PlainMessage.create(hash),
          networkType,
          UInt64.fromUint(2000000), // should be a config parameter
        );

        const account = Account.createFromPrivateKey(privateKey, networkType);
        const generationHash = await NetworkService.getGenerationHash(nodeUri);
        return resolve(account.sign(transferTransaction, generationHash));
      } else {
        return reject('Failed to create timestamp transaction');
      }
    });
  }

  public static announceTransaction(signedTransaction: any, nodeUri: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const transactionHttp = new TransactionHttp(nodeUri);

      return transactionHttp.announce(signedTransaction).subscribe(
        ok => resolve(signedTransaction.hash),
        err => reject(err),
      );
    });
  }

  public static timestampTransaction(nemAccount: NemAccount, hash: number, nodeUri: string, epochAdjustment: string) {
    return this.createTimestampTransaction(nemAccount, hash, nodeUri, epochAdjustment).then(signedTransaction => {
      return this.announceTransaction(signedTransaction, nodeUri);
    });
  }

  public static getTransactionIndexForHash(pubKey: string, hash: string, nodeUri: string, blockchain: string) {
    const networkType = Blockchain.getNetworkTypeByBlockchain(blockchain);
    if (networkType) {
      const account = PublicAccount.createFromPublicKey(pubKey, networkType);

      return this.getTransactionIndexForHashAndAccount(account, hash, nodeUri);
    } else {
      return Promise.reject('NetworkType is undefined');
    }
  }

  //Lookup the documentHash in the blockchain, by retrieving the outgoing transactions for "account" and check if the documentHash is registered in this transaction somewhere
  //Return the index of the transaction that contains this. (0 is the latest transaction)
  public static getTransactionIndexForHashAndAccount(account: PublicAccount, hash: string, nodeUri: string) {
    //Extract the timestamps which are in the payload
    return new Promise((resolve, reject) => {
      const repositoryFactory = new RepositoryFactoryHttp(nodeUri);
      const transactionHttp = repositoryFactory.createTransactionRepository();

      const searchCriteria: TransactionSearchCriteria = {
        group: TransactionGroup.Confirmed,
        signerPublicKey: account.publicKey,
        pageNumber: 1,
        pageSize: 100,
        type: [TransactionType.TRANSFER],
      };
      transactionHttp.search(searchCriteria).subscribe(
        page => {
          return resolve(this.getTransactionIndexForHashAndTxList(hash, page.data));
        },
        err => reject(err),
      );
    });
  }

  public static getRegisteredHashes(account: PublicAccount, nodeUri: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const accountHttp = new AccountHttp(nodeUri);
      const repositoryFactory = new RepositoryFactoryHttp(nodeUri);
      const transactionHttp = repositoryFactory.createTransactionRepository();
      const searchCriteria: TransactionSearchCriteria = {
        group: TransactionGroup.Confirmed,
        signerPublicKey: account.publicKey,
        pageNumber: 1,
        pageSize: 100,
        type: [TransactionType.TRANSFER],
      };
      transactionHttp.search(searchCriteria).subscribe(
        page => {
          return resolve(NemTransactionService.getRegisteredHashesFromTxList(page.data));
        },
        err => reject(err),
      );
    });
  }

  public static getRegisteredHashesFromTxList(txs: Transaction[]): string[] {
    let result: Transaction[] = txs
      .filter(TransactionFilter.transferTransactionSameSenderReceiver)
      .sort(TransactionFilter.sortTransactionsByHeight);

    const hashes: string[] = result.map(tx => {
      const transTx: TransferTransaction = tx as TransferTransaction;
      return transTx.message.payload.toLowerCase();
    });

    return hashes;
  }

  public static getTransactionIndexForHashAndTxList(hash: string, txs: Transaction[]) {
    const hashes = this.getRegisteredHashesFromTxList(txs);
    return hashes.indexOf(hash.toLowerCase());
  }
}
