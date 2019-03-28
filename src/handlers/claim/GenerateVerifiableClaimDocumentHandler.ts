import {BaseHandler} from "../BaseHandler";
import {GenerateVerifiableClaimDocumentResponse} from "../../contracts/claim/GenerateVerifiableClaimDocumentResponse";
import {GenerateVerifiableClaimDocumentRequest} from "../../contracts/claim/GenerateVerifiableClaimDocumentRequest";
import {VerifiableClaimValidator} from "../../services/validators/VerifiableClaimValidator";
import {IVerifiableClaimDocument} from "../../models/interfaces/IVerifiableClaimDocument";

export class GenerateVerifiableClaimDocumentHandler extends BaseHandler<GenerateVerifiableClaimDocumentRequest, GenerateVerifiableClaimDocumentResponse> {

    handleCore(request: GenerateVerifiableClaimDocumentRequest): GenerateVerifiableClaimDocumentResponse {

        let type = request.type;
        if (type && type.indexOf('VerifiableCredential') === -1) type.push('VerifiableCredential');
        if (!type) type = ['VerifiableCredential'];

        let context = request.context;
        if (context && context.indexOf('https://w3id.org/security/v2') === -1) context.push('https://w3id.org/security/v2');
        if (context && context.indexOf('https://www.w3.org/2018/credentials/v1') === -1) context.push('https://www.w3.org/2018/credentials/v1');
        if (!context) context = ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/security/v2'];

        const document: IVerifiableClaimDocument = {
            context: context,
            id: request.id,
            type: type,
            issuer: request.issuer,
            claim: request.claim,
            issuanceDate: request.issuanceDate,
            expirationDate: request.expirationDate
        };

        return {
            verifiableClaimDocument: document
        }
    }

    validateCore(request: GenerateVerifiableClaimDocumentRequest): string[] {
        let errors: string[] = [];

        if (!request.id) errors.push('Id is required');
        else if (!VerifiableClaimValidator.isIdValid(request.id)) errors.push('Id is invalid');

        if (request.type && !Array.isArray(request.type)) errors.push('Type is invalid');

        if (request.context && !Array.isArray(request.context)) errors.push('Context is invalid');

        if (!request.issuer) errors.push('Issuer is required');

        if (!request.claim) errors.push('Claim is required');
        else {
            const claimErrros = VerifiableClaimValidator.validateVerifiableClaim(request.claim);
            if (claimErrros.length > 0) errors = errors.concat(claimErrros);
        }

        if (!request.issuanceDate) errors.push('Issuance date is required');
        else if (!VerifiableClaimValidator.isDateValid(request.issuanceDate)) errors.push('Issuance date is invalid');
        else if (Date.parse(request.issuanceDate) > Date.parse((new Date()).toISOString())) errors.push('Issuance date can not be in the future');

        if (!request.expirationDate) errors.push('Expiration date is required');
        else if (!VerifiableClaimValidator.isDateValid(request.expirationDate)) errors.push('Expiration date is invalid');
        else if (Date.parse(request.expirationDate) < Date.parse((new Date()).toISOString())) errors.push('Expiration date can not be in the future');

        return errors;
    }

}
