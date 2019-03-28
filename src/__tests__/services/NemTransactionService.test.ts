import {NemAccount, NemTransactionService, Purposes, Key} from "../..";
import nem2Sdk = require("nem2-sdk");
import TransferTransaction = nem2Sdk.TransferTransaction;
import Transaction = nem2Sdk.Transaction;

const Address = nem2Sdk.Address;
const Deadline = nem2Sdk.Deadline;
const UInt64 = nem2Sdk.UInt64;
const PlainMessage = nem2Sdk.PlainMessage;
const Mosaic = nem2Sdk.Mosaic;
const MosaicId = nem2Sdk.MosaicId;
const NetworkType = nem2Sdk.NetworkType;
const TransactionInfo = nem2Sdk.TransactionInfo;
const Account = nem2Sdk.Account;

const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);
const account2 = Account.generateNewAccount(NetworkType.MIJIN_TEST);

let validTransferTransaction = new TransferTransaction(
    NetworkType.MIJIN_TEST,
    3,
    Deadline.create(),
    UInt64.fromUint(0),
    account.address,
    [new Mosaic(new MosaicId("nem:xem"), UInt64.fromUint(0))],
    PlainMessage.create('1e04c3815f90220d3d3fdcc8bdae00c24b3d4fd9d2b3858a6eddeb973840c155'),
    undefined,
    account.publicAccount,
    new TransactionInfo(UInt64.fromUint(2), 0, '5C5D5BE3E511A20001701A97')
);

let validTransferTransaction3 = new TransferTransaction(
    NetworkType.MIJIN_TEST,
    3,
    Deadline.create(),
    UInt64.fromUint(0),
    account.address,
    [new Mosaic(new MosaicId("nem:xem"), UInt64.fromUint(0))],
    PlainMessage.create('49928a57bdeb69d3642dbd6da1c6b014892a3b182c4d9e7fefc637c57746f6ab'),
    undefined,
    account.publicAccount,
    new TransactionInfo(UInt64.fromUint(101), 0, '5C5D5BE3E511A20001701A97')
);

let validTransferTransaction2 = new TransferTransaction(
    NetworkType.MIJIN_TEST,
    3,
    Deadline.create(),
    UInt64.fromUint(0),
    account.address,
    [new Mosaic(new MosaicId("nem:xem"), UInt64.fromUint(0))],
    PlainMessage.create('59928a57bdeb69d3642dbd6da1c6b014892a3b182c4d9e7fefc637c57746f6ab'),
    undefined,
    account.publicAccount,
    new TransactionInfo(UInt64.fromUint(23), 0, '5C5D5BE3E511A20001701A97')
);

let transferTransactionDifferentReceiver = new TransferTransaction(
    NetworkType.MIJIN_TEST,
    3,
    Deadline.create(),
    UInt64.fromUint(0),
    account2.address,
    [new Mosaic(new MosaicId("nem:xem"), UInt64.fromUint(0))],
    PlainMessage.create('49928a57bdeb69d3642dbd6da1c6b014892a3b182c4d9e7fefc637c57746f6ab'),
    undefined,
    account.publicAccount,
    new TransactionInfo(UInt64.fromUint(210), 0, '5C5D5BE3E511A20001701A97')
);
describe('NemTransactionService', () => {

    const transactionRegex = /[A-F0-9]{64}/;

    describe('with valid', () => {
        describe('NemTransactionService', () => {
            const personaId: number = 1;
            const seed: string = "seed";
            const connectionId = 2;
            const blockchain: string = "PublicTestnet";
            const keyId: number = 100;
            const nodeUri: string = "http://somehost:3000";
            const documentHash = "caf6c9e744640159cc972fc83bbb44e09141cfc2c205274cb9cb08a583bbeec5";



                let key = new Key(
                    // @ts-ignore
                    Purposes.find(keyId),
                    seed,
                    personaId,
                    connectionId
                );
                let nemAccount = new NemAccount(key, blockchain);
                let signedTransaction: nem2Sdk.SignedTransaction;
                test('signedTransaction', () => {


                        NemTransactionService.createTimestampTransaction(nemAccount, documentHash).then((sgndTransaction) => {
                            signedTransaction = sgndTransaction;
                            expect(sgndTransaction).toBeInstanceOf(nem2Sdk.SignedTransaction);
                        }).catch((error) => {
                            expect(error).toBeUndefined();
                        });
                });
                test('transaction', () => {


                    let announceTransactionMock = jest.fn();
                    announceTransactionMock.mockResolvedValue(signedTransaction.hash);
                    NemTransactionService.announceTransaction = announceTransactionMock.bind(NemTransactionService);

                    NemTransactionService.timestampTransaction(nemAccount, documentHash, nodeUri).then((transaction: string) => {
                        expect(transaction).toMatch(transactionRegex);
                    }).catch((error) => {
                        expect(error).toBeUndefined();
                    });


                });
        });

        describe('getRegisteredHashesFromTxList', () => {
            const returnedTransactions = [validTransferTransaction, validTransferTransaction3, validTransferTransaction2, transferTransactionDifferentReceiver];

            const hashes: string[] = NemTransactionService.getRegisteredHashesFromTxList(returnedTransactions);

            expect(hashes).toEqual(['49928a57bdeb69d3642dbd6da1c6b014892a3b182c4d9e7fefc637c57746f6ab', '59928a57bdeb69d3642dbd6da1c6b014892a3b182c4d9e7fefc637c57746f6ab', '1e04c3815f90220d3d3fdcc8bdae00c24b3d4fd9d2b3858a6eddeb973840c155']);

        });

        describe('getTransactionIndexForHashAndTxList', () => {
            const notRegisteredHash = '9f158b40887aad871b16994cbd7121edcae0f1ffe56bacc3278fc998d609dbf7';
            const upToDateHash = '49928a57bdeb69d3642dbd6da1c6b014892a3b182c4d9e7fefc637c57746f6ab';
            const outdatedHash = '1e04c3815f90220d3d3fdcc8bdae00c24b3d4fd9d2b3858a6eddeb973840c155';

            test('hash not found', () => {
                const returnedTransactions = [validTransferTransaction, validTransferTransaction2, validTransferTransaction3];

                const index = NemTransactionService.getTransactionIndexForHashAndTxList(notRegisteredHash, returnedTransactions);
                expect(index).toEqual(-1);
            });

            test('hash up to date', () => {
                const returnedTransactions = [validTransferTransaction, validTransferTransaction2, validTransferTransaction3];

                const index = NemTransactionService.getTransactionIndexForHashAndTxList(upToDateHash, returnedTransactions);
                expect(index).toEqual(0);
            });

            test('hash outdated', () => {
                const returnedTransactions = [validTransferTransaction, validTransferTransaction2, validTransferTransaction3];

                const index = NemTransactionService.getTransactionIndexForHashAndTxList(upToDateHash, returnedTransactions);
                expect(index).toEqual(0);
            });

            test('other receivers are excluded', () => {
                const returnedTransactions = [validTransferTransaction, validTransferTransaction2, validTransferTransaction3, transferTransactionDifferentReceiver];

                const index = NemTransactionService.getTransactionIndexForHashAndTxList(outdatedHash, returnedTransactions);
                expect(index).toBeGreaterThan(0);
            });
        });
    });
});
