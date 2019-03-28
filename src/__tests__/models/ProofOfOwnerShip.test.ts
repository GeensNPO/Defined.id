import {ProofOfOwnership} from "../..";
const nacl = require('tweetnacl');


describe('ProofOfOwnership', () => {
    const did1 = 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2';
    const did2 = 'did:defined:16e9h1AJe12tZRVptjhcCopwbHBSaD5TQ3';
    const key1 = nacl.sign.keyPair();

    describe('valid no proof', () => {
      const poo = new ProofOfOwnership(did1, did2, key1.publicKey);

        test ('creation', () => {
          expect(poo).toBeTruthy();
          expect(poo.didProver).toEqual(did1);
          expect(poo.didVerifier).toEqual(did2);
          expect(poo.publicKey).toEqual(key1.publicKey);
          expect(poo.timestamp).toBeUndefined();
          expect(poo.signature).toBeUndefined();
        });
    });

    describe('valid with proof', () => {
      const now = new Date();
      const signature = "+l+uFpXj1NIETVQ80CM+AzV6HAZxn3iC+Sco5ccUr6oDeeg67SviamvtRo3LQ7WULFEyx37T90t5Mn5ovUKJBQ==";
      const poo = new ProofOfOwnership(did1, did2, key1.publicKey, now, signature);

        test ('creation', () => {
          expect(poo).toBeTruthy();
          expect(poo.didProver).toEqual(did1);
          expect(poo.didVerifier).toEqual(did2);
          expect(poo.publicKey).toEqual(key1.publicKey);
          expect(poo.timestamp).toEqual(now);
          expect(poo.signature).toEqual(signature);
        });
    });
});
