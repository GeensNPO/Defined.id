import {BaseResponse} from "../BaseResponse";

export interface IHashRegisterResponse extends BaseResponse {
    documentHash: string;
    nemCatapultBlockchain: string;
    nodeUri: string;
}
