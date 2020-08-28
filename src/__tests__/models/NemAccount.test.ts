import {NemAccount, Key, Purposes, IKeyPurpose} from "../..";

import nem2Sdk = require("symbol-sdk");
import {MnemonicPassPhrase} from 'symbol-hd-wallets';

const NetworkType = nem2Sdk.NetworkType;


describe('NemAccount', () => {

    const account = {
        privateKey: 'ECBDA04A87178D7D14D61B8A78F9BED1F7B4C67BD21E9480E45EAFA4D31684D7',
        publicKey: '747516EC3411EA1F5614AF8620DACC90650FDBD96E37B1548D1D7B59EA932C03',
        address: 'TD5I4Q-P6RTOP-WQY3IM-IOGU2L-AUOSMM-3QKBKS-K6I'
    }

    describe('with valid', () => {
        describe('NemAccount 24 words', () => {

            const personaId: number = 1;
            const seed: string = 'emerge tennis tail van twelve recycle whip lock cloth say zoo heart push tower list oak burden husband local order effort front mansion royal'
            const connectionId = 2;
            const blockchain: string = "PublicTestnet";
            const keyId: number = 100;


                let key = new Key(
                    // @ts-ignore
                    Purposes.find(keyId),
                    seed,
                    personaId,
                    connectionId
                );
                let nemAccount = new NemAccount(key, blockchain);
                
                test('private key', () => {
                        expect(nemAccount.privateKey).toMatch(account.privateKey);

                    });
                test('public key', () => {
                    expect(nemAccount.publicKey).toMatch(account.publicKey);
                })
                test('address', () => {
                    expect(nemAccount.address).toMatch(account.address);
                });
                test('blockchain', () => {
                    expect(nemAccount.networkType).toBe(NetworkType.TEST_NET);

                });
                test('blockchain type', () => {
                    //Network type is number
                    expect(typeof nemAccount.networkType).toBe('number');

                })


        })
    });
    describe('with invalid', () => {

        describe('NemAccount', () => {
            const personaId: number = 1;
            const seed: string = "seed";
            const connectionId = 2;
            const blockchain: string = "PublicNotTestnet";
            const keyId: number = 1;


                let key: Key;
                let nemAccount: NemAccount;

                test('blockchain', done  => {key = new Key(
                    // @ts-ignore
                    Purposes.find(keyId),
                    seed,
                    personaId,
                    connectionId
                );
                    nemAccount = new NemAccount(key, blockchain);
                    expect(nemAccount.networkType).toBe(undefined);
                    done();

                });
                test('blockchain type', () => {
                    expect(typeof nemAccount.networkType).not.toBe('number');

                })




        })
    });
});
