import {IKey, Encodes} from "../..";

export class KeyValidator {

    private static derivePathRegex = new RegExp("^m(\\/[0-9]+')+$");

    public static isDerivePathValid(derivePath: string): boolean {
        return this.derivePathRegex.test(derivePath);
    }

    public static isNaturalNumber(number: number): boolean {
        return number >= 0 && Math.floor(number) === +number;
    }

    public static isEncodeValid(encode: string): boolean {
        return Object.keys(Encodes).some((key: string) => (Encodes as any)[key] === encode)
    }

    public static validateKeyModel(key: IKey): string[] {
        const errors: string[] = [];

        if (!key.purpose) errors.push('Purpose is required');

        if (!key.personaId && key.personaId !== 0) errors.push('Persona id is required');
        else if (!KeyValidator.isNaturalNumber(key.personaId)) errors.push('Persona id is invalid');

        if (key.connectionId && !KeyValidator.isNaturalNumber(key.connectionId)) errors.push('Connection id is invalid');

        if (!key.publicKey) errors.push('Public key is required');
        if (!key.privateKey) errors.push('Private key is required');

        return errors;
    }

}
