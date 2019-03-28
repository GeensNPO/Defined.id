import {BaseResponse} from "../..";

export interface IProveOwnershipResponse extends BaseResponse {
    didProver: string;
    didVerifier: string;
    publicKey: string;
    timestamp: number;
    signature: string;
}
