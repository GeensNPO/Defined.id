import {IGenerateKeyRequest} from "../../contracts/key/IGenerateKeyRequest";
import {IGenerateKeyResponse} from "../../contracts/key/IGenerateKeyResponse";
import {KeyValidator, Purposes, Key} from "../..";
import {BaseHandler} from "../BaseHandler";

export class GenerateKeyHandler extends BaseHandler<IGenerateKeyRequest, IGenerateKeyResponse> {

    handleCore(request: IGenerateKeyRequest): IGenerateKeyResponse {

            const key = new Key(
                // @ts-ignore
                Purposes.find(request.keyId),
                request.seed,
                request.personaId,
                request.connectionId
            );

        return {
            key: key
        };
    }

    validateCore(request: IGenerateKeyRequest): string[] {
        const errors: string[] = [];

        if (!request.seed) errors.push('Seed is required');

        if (!request.personaId && request.personaId !== 0) errors.push('Persona id is required');
        else if (!KeyValidator.isNaturalNumber(request.personaId)) errors.push('Persona id is invalid');

        if (!request.connectionId) errors.push('Connection id is required');
        if (request.connectionId && !KeyValidator.isNaturalNumber(request.connectionId)) errors.push('Connection id is invalid');

        if (!request.keyId) errors.push('Key id is required');
        else Purposes.find(request.keyId) === undefined ? errors.push(`Key id : {${request.keyId}} is invalid`) : '';

        return errors;
    }

}
