import {GenerateDidDocumentRequest, GenerateDidDocumentResponse, DidValidator, IDidDocument} from "../..";
import {BaseHandler} from "../BaseHandler";


export class GenerateDidDocumentHandler extends BaseHandler<GenerateDidDocumentRequest, GenerateDidDocumentResponse> {

    handleCore(request: GenerateDidDocumentRequest): GenerateDidDocumentResponse {

        const didDocument: IDidDocument = {
            context: ['https://w3id.org/did/v1', 'https://w3id.org/security/v1'],
            id: request.did,
            salt: request.salt,
            publicKey: request.pubKey,
            service: request.services,
            created: (new Date()).toISOString()
        };

        return {
            didDocument: didDocument
        };
    }

    validateCore(request: GenerateDidDocumentRequest): string[] {
        const errors: string[] = [];

        if (!request.did) errors.push('Did is required');
        else if (!DidValidator.isDidStringValid(request.did)) errors.push('Did is invalid');

        if (!request.salt) errors.push('Salt is required');
        else if (!DidValidator.isSaltValid(request.salt)) errors.push('Salt is invalid');

        if (!request.pubKey || request.pubKey.length === 0) errors.push('PubKey is required');

        if (!request.services || request.services.length === 0) errors.push('Services are required');

        return errors;
    }


}
