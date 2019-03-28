import nem2Sdk = require("nem2-sdk");
import Transaction = nem2Sdk.Transaction;
import TransferTransaction = nem2Sdk.TransferTransaction;

export class TransactionFilter {
  public static transferTransactionSameSenderReceiver(tx: Transaction): boolean {
    if(tx instanceof TransferTransaction && tx.signer && tx.recipient.equals(tx.signer.address)) {
      return true;
    } else {
      return false;
    }
  }

  public static sortTransactionsByHeight(a: Transaction, b: Transaction): number {
    //TransactionHeight is a Uint64 object.
    if(a && b && a.transactionInfo && a.transactionInfo.height && b.transactionInfo && b.transactionInfo.height) {
      const higherDiff = b.transactionInfo.height.higher - a.transactionInfo.height.higher;
      const lowerDiff = b.transactionInfo.height.lower - a.transactionInfo.height.lower;

      return higherDiff ? higherDiff : lowerDiff;
    } else {
      throw new Error('Expected transactions as input, but could not access heights');
    }
  }
}
