import {NemAccount, Key, Purposes, IKeyPurpose} from "../..";

import nem2Sdk = require("symbol-sdk");

const NetworkType = nem2Sdk.NetworkType;


describe('NemAccount', () => {

    const privateKeyRegex = /[A-Fa-f0-9]{64}/;
    const addressRegex = /[A-Z0-9\-]{45}/;

    describe('with valid', () => {
        describe('NemAccount', () => {
            const personaId: number = 1;
            const seed: string = "seed";
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
                        expect(nemAccount.privateKey).toMatch(privateKeyRegex);

                    });
                test('address', () => {
                    expect(nemAccount.address).toMatch(addressRegex);
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
