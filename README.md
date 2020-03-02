# Defined.id

An open-source library with the core components for the defined.id identity solution built on the [NEM Blockchain](https://nem.io/).

## Requirements

### Node.js

* Node.js 11.X.X

## Installation

```bash
npm install @geens_npo/defined-id
```

## Documentation

### Getting started

Import Defined.id package.

**Example:**
```typescript
import "@geens_npo/defined-id";

//to import specific module
import {SecurityService} from "@geens_npo/defined-id";
```

### Initialize Keys

Initializes derived keys based on a password.

**Example:**
```typescript
const password = "password";

const derivedKey = SecurityService.scrypt(password);
```

### Generate Seed

Generate random seed.

**Example:**
```typescript
const seed = SeedService.generateSeed();
```

### Generate Key

Generate key.

**Example:**
```typescript
const keyId = 1;
const seed = "b8e4c8c72e5ac28d01d2712729cd381548e8a4982df82b97f4778179165aa4b1eaae41dc54a6328721b05fd1025736d80cc19e9bc4abe6423a85c1114a4b6188";
const personaId = 1;
const connectionId  = 2;

const key = new Key(
                // @ts-ignore
                Purposes.find(keyId),
                seed,
                personaId,
                connectionId
            );
```

### Generate a proof of ownership for a public key

**Example:**
```typescript
const didProver = "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP";
const didVerifier = "did:defined:1ATaPiJdX2u4NHeYVux1iYcdDCTrXpdoxC";

  const poo = new ProofOfOwnership(didProver, didVerifier, key.publicKey);
  const errors = ProofOfOwnershipService.proveOwnership(poo, key.privateKey64);
```

### Verify a proof of ownership for a public key

Verify a proof of ownership for a public key.

**Example:**
```typescript
const didProver = "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP";
const didVerifier = "did:defined:1ATaPiJdX2u4NHeYVux1iYcdDCTrXpdoxC";
const signature = "YFipwAdFVonV4/9zQjPdzPLArX181RAaK3UvXixQ7Rg0lX/sz8FLEK4sJU+2zJhAPHIFlNyD87+9wsBWTRf1Aw==";
const publicKeyBytes = Buffer.from("ccc98085b11e5b96c614036294be077d0b66a272b6476d3ba7eb440a3c2df00d", "hex");
const timestampDate: Date = new Date(1548947150636);


const poo: ProofOfOwnership = new ProofOfOwnership(didProver, didVerifier, publicKeyBytes, timestampDate, signature);
const errors = ProofOfOwnershipService.verify(poo);
```

### Generate DID

Generate DID.

**Example:**
```typescript
const method = "defined";
const nemPublicKey = "D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B";

const did: Did = new Did(method, nemPublicKey);
```

### Generate DID Document
DID document generation.

**Example:**
```typescript
const services : IService[] = [
  {  "did" : did.format(),
     "serviceName": "openid",
     "type": "OpenIdConnectVersion1.0Service",
     "serviceEndpoint": "https://openid.example.com/"
  }, 
  { "did" : did.format(),
     "serviceName": "vcr",
     "type": "CredentialRepositoryService",
     "serviceEndpoint": "https://repository.example.com/service/8377464"
  },
  {   "did" : did.format(),
     "serviceName": "xdi",
     "type": "XdiService",
     "serviceEndpoint": "https://xdi.example.com/8377464"
  }
 ];

const publicKey : IPublicKey =
{
  "id": did.format() + "#authentication-key-1",
  "owner": did.format(),
  "type": "Ed25519VerificationKey2018",
  "publicKeyHex": key.publicKey.toString('hex').toUpperCase(),

}

const didDocument: IDidDocument = {
            context: ['https://w3id.org/did/v1', 'https://w3id.org/security/v1'],
            id: did.format(),
            salt: did.salt,
            publicKey: [publicKey],
            service: services,
            created: (new Date()).toISOString()
        };

```

### Generate Verifiable Claim

Verifiable claim document generation.

**Example:**
```typescript
const context =  ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/v2'];
const type = ['VerifiableCredential'];
const issuer = "Defined.id";
const claim = {
  "id": "http://defined.id/vc/1",
  "firstName": "Defined",
  "lastName": "Id"
};
const issuanceDate = "2018-10-10";
const expirationDate = "2020-10-10";

 const document: IVerifiableClaimDocument = {
            context: context,
            id: did.format(),
            type: type,
            issuer: issuer,
            claim: claim,
            issuanceDate: issuanceDate,
            expirationDate: expirationDate
        };
```

### Generate Proof of Document

Add proof to a document.

**Example:**
```typescript

const document = {
                     "context": [
                         "https://w3id.org/did/v1",
                         "https://w3id.org/security/v1"
                     ],
                     "id": "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                     "salt": "52e1aea9-c6ac-4af2-bec0-aaf9cd30a182",
                     "publicKey": [
                         {
                             "id": "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                             "owner": "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                             "type": "Ed25519VerificationKey2018",
                             "publicKeyHex": "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"
                         },
                         {
                             "id": "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#granting-key-2",
                             "owner": "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                             "type": "Ed25519VerificationKey2018",
                             "publicKeyHex": "00e8b5ce1df5c8984511591967b17ae0913581e2daca7b403507536b0294c6eacd"
                         }
                     ],
                     "service": [
                         {
                             "serviceName": "openid",
                             "type": "OpenIdConnectVersion1.0Service",
                             "serviceEndpoint": "https://openid.example.com/"
                         },
                         {
                             "serviceName": "vcr",
                             "type": "CredentialRepositoryService",
                             "serviceEndpoint": "https://repository.example.com/service/8377464"
                         },
                         {
                             "serviceName": "xdi",
                             "type": "XdiService",
                             "serviceEndpoint": "https://xdi.example.com/8377464"
                         }
                     ],
                     "created": "2019-03-01T09:53:34.698Z"
                 };

const proofDocument = ProofOfDocumentService.generateProof(document, key.key, "http://www.defined.id");
```

### Generate Document Hash

Generate document sha256 hash.

**Example:**
```typescript

const documentHash = SecurityService.sha256StringHash(JSON.stringify(didDocument))
```

### Register Document Hash on NEM Catapult

**Example:**
```typescript
const nemCatapultBlockchain = "PublicTestnet";
const documentHash = "caf6c9e744640159cc972fc83bbb44e09141cfc2c205274cb9cb08a583bbeec5";
const nemAccount = new NemAccount(key.key, nemCatapultBlockchain);
const nodeUri = "http://localhost:3000";
NemTransactionService.timestampTransaction(nemAccount, documentHash, nodeUri).then((transaction) => {
    console.log(transaction);
    }).catch((error) => {
      console.log(error);
    })

```

### Verify Document Hash Registration

**Example:**
```typescript
const nemPublicKey = "D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B";
const nemCatapultBlockchain = "PublicTestnet";
const documentHash = "caf6c9e744640159cc972fc83bbb44e09141cfc2c205274cb9cb08a583bbeec5";
const nodeUri = "http://localhost:3000";
 return NemTransactionService.getTransactionIndexForHash(nemPublicKey, documentHash, nodeUri, nemCatapultBlockchain).then((result) => {
        let info;
        switch (result) {
            case -1:
                info = "Hash was not registered";
                break;
            case 0:
                info = "Hash was registered";
                break;
            default:
                info = "Hash was registered but is outdated";
                break;
        }
 }).catch((error) => {
         console.log(error);
 })
```

## Tests

Clone Github repository to run tests:

```bash
git clone https://github.com/GeensNPO/Defined.id.git
```

Install npm packages:

```bash
npm install
```

Run tests:

```bash
npm test
```

## Contributing

This project is developed and maintained by Geens NPO. Contributions are welcome and appreciated. Feel free to start an issue or create a pull request.  

## Changelog

* 0.1.0 version: DID, DID document, verifiable claim generation, document hash creation and registering on NEM Catapult Blockchain.

## License

Copyright (c) 2019 Geens NPO. Licensed under the [LGPL v3](LICENSE).