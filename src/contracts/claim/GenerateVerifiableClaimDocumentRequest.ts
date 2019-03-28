import {BaseRequest} from "../BaseRequest";
import {IVerifiableClaim} from "../../models/interfaces/IVerifiableClaim";

export interface GenerateVerifiableClaimDocumentRequest extends BaseRequest {
    context?: string[];
    id: string;
    type?: string[];
    issuer: string;
    claim: IVerifiableClaim;
    issuanceDate: string;
    expirationDate: string;
}
