import {BaseRequest, Encodes, IKey} from "../..";

export interface GeneratePublicKeyDocumentRequest extends BaseRequest {
    did: string,
    pubKeys: IKey[];
    encode: Encodes;
}
