import {IGenerateKeysRequest} from "../../contracts/key/IGenerateKeysRequest";
import {IGenerateKeysResponse} from "../../contracts/key/IGenerateKeysResponse";
import {Key, Purposes, KeyValidator} from "../..";
import {GenerateKeyHandler} from './GenerateKeyHandler';

export class GenerateKeysHandler extends GenerateKeyHandler{

    handleCore(request: IGenerateKeysRequest): IGenerateKeysResponse {
        const keys: Key[] = [];

        request.keyIds.forEach((keyId: number) => {
            const tempRequest = {
                // @ts-ignore
                keyId: keyId,
                seed: request.seed,
                personaId: request.personaId,
                connectionId: request.connectionId
            }
            const key = super.handleCore(tempRequest).key;
            const addKey = key ? keys.push(key) : undefined ;

        });

        return {
            keys: keys
        };
    }

    validateCore(request: IGenerateKeysRequest): string[] {
        const errors: string[] = [];

        if (!request.seed) errors.push('Seed is required');

        if (!request.personaId && request.personaId !== 0) errors.push('Persona id is required');
        else if (!KeyValidator.isNaturalNumber(request.personaId)) errors.push('Persona id is invalid');

        if (!request.connectionId) errors.push('Connection id is required');
        if (request.connectionId && !KeyValidator.isNaturalNumber(request.connectionId)) errors.push('Connection id is invalid');

        if (!request.keyIds || request.keyIds.length === 0) errors.push('Key ids are required');
        else request.keyIds.forEach((keyId: number) => Purposes.find(keyId) === undefined ? errors.push(`Key id : {${keyId}} is invalid`) : '');

        return errors;
    }

}
