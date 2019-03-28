import {BaseRequest} from "../..";

export interface IProveOwnershipRequest extends BaseRequest {
    didProver: string;
    didVerifier: string;
    keyId: number;
    personaId: number;
    connectionId?: number;
    seed: string;
}
