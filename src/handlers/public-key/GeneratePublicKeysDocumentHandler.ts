import { Encodes, IKey, IPublicKey, KeyValidator, DidValidator, SecurityService, GeneratePublicKeyDocumentRequest, GeneratePublicKeyDocumentResponse} from "../..";
import {IMeta} from "../../models/interfaces/IMeta";
import {BaseHandler} from "../BaseHandler";


export class GeneratePublicKeysDocumentHandler extends BaseHandler<GeneratePublicKeyDocumentRequest, GeneratePublicKeyDocumentResponse> {

    handleCore(request: GeneratePublicKeyDocumentRequest): GeneratePublicKeyDocumentResponse {
        const context: string[] = [
            "https://w3id.org/did/v1",
            "https://w3id.org/security/v1"
        ];

        const pubKeys: IPublicKey[] = [];

        request.pubKeys.forEach((key: IKey) => {

            switch (request.encode as Encodes) {
                case Encodes.Base58: {
                    pubKeys.push({
                        id: request.did + "#" + key.purpose.purpose.toString() + "-" + key.purpose.id,
                        owner: request.did,
                        type: key.purpose.type,
                        publicKeyBase58: SecurityService.base58Encode(key.publicKey)
                    });
                    break;
                }
                case Encodes.Hex: {
                    pubKeys.push({
                        id: request.did + "#" + key.purpose.purpose.toString() + "-" + key.purpose.id,
                        owner: request.did,
                        type: key.purpose.type,
                        publicKeyHex: key.publicKey.toString('hex')
                    });
                    break;
                }
                case Encodes.Pem: {
                    pubKeys.push({
                        id: request.did + "#" + key.purpose.purpose.toString() + "-" + key.purpose.id,
                        owner: request.did,
                        type: key.purpose.type,
                        publicKeyPem: SecurityService.pemEncode(key.publicKey)
                    });
                    break;
                }
            }

        });

        const meta: IMeta = {
            createdAt: (new Date()).toISOString(),
            createdBy: 'http://defined-id/'
        };

        return {
            context: context,
            pubKey: pubKeys,
            meta: meta
        };
    }

    validateCore(request: GeneratePublicKeyDocumentRequest): string[] {
        const errors: string[] = [];

        if (!request.encode) errors.push('Encode is required');
        else if (!KeyValidator.isEncodeValid(request.encode)) errors.push('Encode is invalid');

        if (!request.pubKeys || request.pubKeys.length === 0) errors.push('PubKeys is required');
        else {
            request.pubKeys.forEach((key: IKey) => {
                if (!KeyValidator.validateKeyModel(key)) errors.push(`Pub key with did : ${request.did} is invalid`);
            });
        }

        if (!request.did) errors.push('Did is required');
        else if (!DidValidator.isDidStringValid(request.did)) errors.push('Did is invalid');

        return errors;
    }

}
