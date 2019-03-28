import {BaseRequest} from "../BaseRequest";

export interface IGenerateKeyRequest extends BaseRequest {
    keyId: number;
    personaId: number;
    connectionId?: number;
    seed: string;
}
