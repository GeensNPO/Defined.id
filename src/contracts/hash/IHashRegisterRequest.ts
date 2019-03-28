import {BaseRequest} from "../BaseRequest";

export interface IHashRegisterRequest extends BaseRequest {
    documentHash: string;
    nemCatapultBlockchain: string;
    nodeUri: string;
}
