import {Key, SecurityService} from "..";

const jsonld = require('jsonld');
const nacl = require('tweetnacl');

export class ProofOfDocumentService {

    public static generateProof(document: any, key: Key, creator: string): any {
        const keypair = nacl.sign.keyPair.fromSecretKey(key.privateKey64);
        const didBuffer: Uint8Array = Buffer.from(JSON.stringify(document));

        const sign = nacl.sign.detached(didBuffer, keypair.secretKey);
        document.proof = {
            type: "Ed25519Signature2018",
            created: new Date().toISOString(),
            creator: creator,
            signatureValue: SecurityService.sha256StringHash(JSON.stringify(sign))
        };

        return document;
    }


}
