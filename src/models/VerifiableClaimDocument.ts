import {IVerifiableClaim} from "./interfaces/IVerifiableClaim";
import {IVerifiableClaimDocument} from "./interfaces/IVerifiableClaimDocument";

export class VerifiableClaimDocument implements IVerifiableClaimDocument {
    context: string[];
    id: string;
    type: string[];
    issuer: string;
    claim: IVerifiableClaim;
    issuanceDate: string;
    expirationDate: string;

    constructor(context: string[], id: string, type: string[], issuer: string, claim: IVerifiableClaim, issuanceDate: string, expirationDate: string) {
        this.context = context;
        this.id = id;
        this.type = type;
        this.issuer = issuer;
        this.claim = claim;
        this.issuanceDate = issuanceDate;
        this.expirationDate = expirationDate;
    }

    format(): string {
        return JSON.stringify({
            context: this.context,
            id: this.id,
            type: this.type,
            issuer: this.issuer,
            claim: this.claim,
            issuanceDate: this.issuanceDate,
            expirationDate: this.expirationDate
        });
    }
}
