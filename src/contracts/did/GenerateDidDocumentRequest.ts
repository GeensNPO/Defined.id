import {BaseRequest} from "../BaseRequest";
import { IService, IPublicKey} from "../.."

export interface GenerateDidDocumentRequest extends BaseRequest {
    did: string;
    salt: string;
    pubKey: IPublicKey[];
    services: IService[];
}
