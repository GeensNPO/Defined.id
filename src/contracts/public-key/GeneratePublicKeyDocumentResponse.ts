import {BaseResponse, IPublicKey} from "../..";
import {IMeta} from "../../models/interfaces/IMeta";

export interface GeneratePublicKeyDocumentResponse extends BaseResponse {
    context: string[];
    pubKey: IPublicKey[];
    meta: IMeta;
}
