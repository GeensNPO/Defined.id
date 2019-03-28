import {ProofOfOwnership} from "..";
const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');

export class ProofOfOwnershipService {
    public static proveOwnership(poo: ProofOfOwnership, privateKey64: Uint8Array): string[] {
      const errors: string[] = [];
      const keypair = nacl.sign.keyPair.fromSecretKey(privateKey64);

      if(Buffer.compare(keypair.publicKey, poo.publicKey)) errors.push('Incorrect Private Key');
      if(poo.signature) errors.push('A ProofOfOwnerschip is already present');
      if(errors.length === 0) {
        poo.timestamp = new Date();
        poo.signature = this.generateProofOfOwnership(poo, privateKey64);
      }

      return errors;
    }

    public static verify(poo: ProofOfOwnership): string[] {
      const errors: string[] = [];

      if(!poo.timestamp) errors.push('No timestamp');
      if(!poo.signature) errors.push('No proofOfOwnership');
      if (errors.length > 0) return errors;

      const messageToVerify = this.getProofOfOwnershipMessage(poo);
      const signature = naclUtil.decodeBase64(poo.signature);
      if(!nacl.sign.detached.verify(messageToVerify, signature, poo.publicKey)) errors.push('Invalid Proof Of Ownership');

      return errors;
    }

    static generateProofOfOwnership(poo: ProofOfOwnership, privateKey64: Uint8Array): string{
      const messageToSign = this.getProofOfOwnershipMessage(poo);
      const result = nacl.sign.detached(messageToSign, privateKey64);

      return naclUtil.encodeBase64(result);
    }

    static getProofOfOwnershipMessage(poo: ProofOfOwnership): Uint8Array {
      let timestamp = new Date();
      if(poo.timestamp) timestamp = poo.timestamp;
      return naclUtil.decodeUTF8(`${poo.didProver}${poo.didVerifier}${timestamp.getTime()}`);
    }
}
