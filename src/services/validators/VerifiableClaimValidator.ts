import {IVerifiableClaim} from "../../models/interfaces/IVerifiableClaim";

export class VerifiableClaimValidator {

    private static idRegex = new RegExp("^http://defined.id/vc.*$");

    static isIdValid(id: string): boolean {
        return this.idRegex.test(id);
    }

    static isDateValid(date: string): boolean {
        return !!Date.parse(date);
    }

    static validateVerifiableClaim(verifiableClaim: IVerifiableClaim): string[] {
        const errors: string[] = [];

        if (!verifiableClaim.id) errors.push('Claim: Id is required');
        else if (!this.isIdValid(verifiableClaim.id)) errors.push('Claim: Id is invalid');

        if (Object.keys(verifiableClaim).length < 2) errors.push('Claim: At least 1 property is required');

        return errors;
    }
}
