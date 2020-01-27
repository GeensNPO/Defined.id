import nem2Sdk = require("nem2-sdk");
import {IdentityService} from '../../services/IdentityService';
import {NemTransactionService} from '../../services/NemTransactionService';

const NetworkType = nem2Sdk.NetworkType;
const Account = nem2Sdk.Account;


describe('IdentityService', () => {
    describe('with valid', () => {
        describe('AccountRegistered', () => {
            test('no hashes registered', (done) => {
                const getRegisteredHashesMock = jest.fn();
                getRegisteredHashesMock.mockResolvedValue([]);

                NemTransactionService.getRegisteredHashes = getRegisteredHashesMock.bind(NemTransactionService);

                const account = Account.generateNewAccount(NetworkType.TEST_NET);

                const registeredPromise = IdentityService.AccountRegistered(account.publicAccount, 'invalidhost:3000');
                registeredPromise.then((result) => {
                    expect(result).toBeFalsy();
                    done();
                })
            });

            test('one or more hash registered', (done) => {
                const getRegisteredHashesMock = jest.fn();
                getRegisteredHashesMock.mockResolvedValueOnce(['abcdefg'])
                getRegisteredHashesMock.mockResolvedValueOnce(['abcdefg', 'hijklmnop', 'qrstuvw']);


                NemTransactionService.getRegisteredHashes = getRegisteredHashesMock.bind(NemTransactionService);

                const account = Account.generateNewAccount(NetworkType.MIJIN_TEST);

                IdentityService.AccountRegistered(account.publicAccount, 'invalidhost:3000').then((result) => {
                    expect(result).toBeTruthy();
                    done();
                })

                IdentityService.AccountRegistered(account.publicAccount, 'invalidhost:3000').then((result) => {
                    expect(result).toBeTruthy();
                    done();
                })
            });
        });
    });
});
