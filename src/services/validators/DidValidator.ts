import {IDid} from "../..";

export class DidValidator {

    private static methodRegex = /^[a-z]+$/;
    private static didStringRegex = /^did:[a-z]+:[0-9A-Za-z]{34}$/;
    private static saltRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    private static hexRegex = /^[a-fA-F0-9]+$/;

    public static isMethodValid(method: string): boolean {
        return this.methodRegex.test(method);
    }

    public static isSaltValid(salt: string): boolean {
        return this.saltRegex.test(salt);
    }

    public static isNemPublicKeyValid(nemPublicKey: string): boolean {
        const validLength = !(nemPublicKey.length !== 64 && nemPublicKey.length !== 66);
        const validHexFormat = this.hexRegex.test(nemPublicKey);
        return validLength && validHexFormat;
    }

    public static isDidStringValid(didString: string): boolean {
        return this.didStringRegex.test(didString);
    }

    public static validateDidModel(did: IDid): string[] {
        const errors: string[] = [];

        if (!did.method) errors.push('Method is required');
        else if (!this.isMethodValid(did.method)) errors.push('Method is invalid');

        if (!did.nemPublicKey) errors.push('Nem public key is required');
        else if (!this.isNemPublicKeyValid(did.nemPublicKey)) errors.push('Nem public key is invalid');

        if (!did.salt) errors.push('Salt is required');
        else if (!this.isSaltValid(did.salt)) errors.push('Salt is invalid');

        return errors;
    }
}
