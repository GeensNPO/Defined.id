import {BaseResponse} from "../BaseResponse";
import {IVerifiableClaimDocument} from "../../models/interfaces/IVerifiableClaimDocument";

export interface GenerateVerifiableClaimDocumentResponse extends BaseResponse {
    verifiableClaimDocument: IVerifiableClaimDocument;
}
