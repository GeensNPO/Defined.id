export class ProofOfOwnership {
    //DID string of the prover
    public didProver: string;

    //DID string of the verifier
    public didVerifier: string;

    //Public key to prove ownership of
    public publicKey: Buffer;

    //Base64 representation of the signature
    public signature?: string;

    //Timestamp of the signature
    public timestamp?: Date;

    constructor(didProver: string, didVerifier: string, publicKey: Buffer, timestamp?: Date, signature?: string) {
        this.didProver = didProver;
        this.didVerifier = didVerifier;
        this.publicKey = publicKey;
        if(signature) this.signature = signature;
        if(timestamp) this.timestamp = timestamp;
    }
}
