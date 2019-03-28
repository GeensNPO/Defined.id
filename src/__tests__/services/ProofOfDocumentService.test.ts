import {ProofOfDocumentService, Key, Purposes, IKeyPurpose} from "../../";


const validDoc = {
    "context": {
        "attributes": "http://schema.org/CreativeWork",
        "author": "http://schema.org/author",
        "text": "http://schema.org/text",
        "created": "http://purl.org/dcterms/created",
        "dateCreated": "http://schema.org/dateCreated",
        "datePublished": "http://schema.org/datePublished",
        "name": "http://schema.org/name",
        "tags": "http://schema.org/keyword",
        "type": "http://schema.org/additionalType",
        "publicKey": "http://schema.org/Text"
    },
    "id": "c76146528c62dac83429217b6a7e159542b7a2d0c06432d6b7c9ba9cb3ebd39a",
    "publicKey": "02badf4650ba545608242c2d303d587cf4f778ae3cf2b3ef99fbda37555a400fd2",
    "type": "Work",
    "created": "2017-11-13T15:00:00.000Z",
    "attributes": {
        "name": "The Raven",
        "author": "Edgar Allan Poe",
        "tags": "poem",
        "dateCreated": "",
        "datePublished": "1845-01-29T03:00:00.000Z",
        "text": "Once upon a midnight dreary..."
    }
};

const validDocSpaced = {
    "context": {
        "attributes": "http://schema.org/CreativeWork",
        "author": "http://schema.org/author",
        "text": "http://schema.org/text",
        "created": "http://purl.org/dcterms/created",
            "dateCreated": "http://schema.org/dateCreated",
        "datePublished": "http://schema.org/datePublished",
        "name": "http://schema.org/name",
            "tags": "http://schema.org/keyword",
        "type": "http://schema.org/additionalType",
            "publicKey": "http://schema.org/Text"
    },
    "id": "c76146528c62dac83429217b6a7e159542b7a2d0c06432d6b7c9ba9cb3ebd39a",
    "publicKey": "02badf4650ba545608242c2d303d587cf4f778ae3cf2b3ef99fbda37555a400fd2",
        "type": "Work",
    "created": "2017-11-13T15:00:00.000Z",
    "attributes": {
        "name": "The Raven",
        "author": "Edgar Allan Poe",
        "tags": "poem",
        "dateCreated": "",
        "datePublished": "1845-01-29T03:00:00.000Z",
        "text": "Once upon a midnight dreary..."
    }
};

describe (("ProofOfDocumentService"), () => {

    describe(("with valid"), () => {

        describe(("DidDocument"), () => {
            let signature1 : string, signature2 : string;
            const seed = "seed";
            const personaId = 1;
            const keyId = 1;
            const connectionId = 2;
            const defined = "https://defined.id";


            const purpose: IKeyPurpose | undefined = Purposes.find(keyId);

            if (purpose) {
                let key = new Key(
                    purpose,
                    seed,
                    personaId,
                    connectionId
                );

                test("proof", () => {
                    const document = ProofOfDocumentService.generateProof(validDoc, key, defined);
                    signature1 = document.proof.signatureValue;
                    expect(document.proof).not.toBeUndefined();
                });
                test("proofs match", () => {

                    const document = ProofOfDocumentService.generateProof(validDocSpaced, key, defined);
                    signature2 = document.proof.signatureValue;
                    expect(signature1).toEqual(signature2);
                })
            }

        })

    });
});
