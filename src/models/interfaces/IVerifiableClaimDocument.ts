import {IVerifiableClaim} from "./IVerifiableClaim";

export interface IVerifiableClaimDocument {
    context: string[];
    id: string;
    type: string[];
    issuer: string;
    claim: IVerifiableClaim;
    issuanceDate: string;
    expirationDate: string;
}
