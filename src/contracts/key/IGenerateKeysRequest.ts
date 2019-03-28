import {IGenerateKeyRequest} from "./IGenerateKeyRequest";

export interface IGenerateKeysRequest extends IGenerateKeyRequest {
    keyIds: number[];
    personaId: number;
    connectionId?: number;
    seed: string;
}
