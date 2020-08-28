import {ProofOfOwnership, ProofOfOwnershipService} from "../..";
const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');

describe('ProofOfOwnershipService', () => {
    const seedArray = [ 248, 126, 119, 48, 9, 44, 137, 82, 91, 232, 108, 164, 235, 96, 73, 107, 110, 34, 42, 29, 130, 139, 107, 145, 101, 186, 57, 83, 246, 48, 67, 48 ];
    const seedArray2 = [ 200, 126, 119, 48, 9, 44, 137, 82, 91, 232, 108, 164, 235, 96, 73, 107, 110, 34, 42, 29, 130, 139, 107, 145, 101, 186, 57, 83, 246, 48, 67, 48 ];
    const key1 = nacl.sign.keyPair.fromSeed(new Uint8Array(seedArray));
    const key2 = nacl.sign.keyPair.fromSeed(new Uint8Array(seedArray2));
    const did1 = 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2';
    const did2 = 'did:defined:16e9h1AJe12tZRVptjhcCopwbHBSaD5TQ3';
    var date1 = new Date(1549894940000);
    const signature = 'YTTkzw2pXIoMFIeimERWiJ5WEqL4gqmX+dy+ZWwMFrSpNjQPIukIDsoAgiAmFNu4oPtNk0MY0EO0aXrzR2TgAQ==';
    const invalidSignature = 'INVALIDSBzZJbZTttgAtyM15fpuLcAfVSGdikvHk7U9IaY9lnZ7V9vUhlUkCqNyIYLhkTXLgdnosMXMqCtqLAw==';

    describe('with valid', () => {
        describe ('proveOwnership', () => {
          const poo = new ProofOfOwnership(did1, did2, key1.publicKey);
          const result = ProofOfOwnershipService.proveOwnership(poo, key1.secretKey)

          test('no errors', () => {
              expect(result).toEqual([]);
          });

          test('proof present', () => {
              expect(poo.signature).toBeDefined();
          });

          test('timestamp present', () => {
              expect(poo.timestamp).toBeDefined();
          });
        });

        describe ('getProofOfOwnershipMessage', () => {
          const poo = new ProofOfOwnership(did1, did2, key1.publicKey, date1);
          const result = ProofOfOwnershipService.getProofOfOwnershipMessage(poo);
          test('valid Result', () => {
            expect(result).toEqual(naclUtil.decodeUTF8(`${did1}${did2}${date1.getTime()}`));
          });
        });

        describe ('generateProofOfOwnership', () => {
          const poo = new ProofOfOwnership(did1, did2, key1.publicKey, date1);
          const result = ProofOfOwnershipService.generateProofOfOwnership(poo, key1.secretKey);
          test('valid Result', () => {
            expect(result).toEqual(signature);
          });
        });

        describe ('verify', () => {
            const poo = new ProofOfOwnership(did1, did2, key1.publicKey, date1, signature);
            const result = ProofOfOwnershipService.verify(poo);
            test('no errors', () => {
              expect(result).toEqual([]);
            });
        });
    });

    describe('with invalid', () => {
        describe ('proveOwnership', () => {
          test('incorrect secretKey', () => {
              const poo = new ProofOfOwnership(did1, did2, key1.publicKey);
              const result = ProofOfOwnershipService.proveOwnership(poo, key2.secretKey)
              expect(result).toEqual(['Incorrect Private Key']);
          });

          test('proof already present', () => {
              const poo = new ProofOfOwnership(did1, did2, key1.publicKey, date1, signature);
              const result = ProofOfOwnershipService.proveOwnership(poo, key1.secretKey)
              expect(result).toEqual(['A ProofOfOwnership is already present']);
          });
        });

        describe ('verify', () => {
          test('no proof of ownership', () => {
            const poo = new ProofOfOwnership(did1, did2, key1.publicKey, date1);
            const result = ProofOfOwnershipService.verify(poo);
            expect(result).toEqual(['No proofOfOwnership']);
          });

          test('no timestamp', () => {
            const poo = new ProofOfOwnership(did1, did2, key1.publicKey, undefined, signature);
            const result = ProofOfOwnershipService.verify(poo);
            expect(result).toEqual(['No timestamp']);
          });
          test('invalid signature', () => {
            const poo = new ProofOfOwnership(did1, did2, key1.publicKey, date1, invalidSignature);
            const result = ProofOfOwnershipService.verify(poo);
            expect(result).toEqual(['Invalid Proof Of Ownership']);
          });
        });
    });
});
