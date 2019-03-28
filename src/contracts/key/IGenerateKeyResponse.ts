import {Key} from "../..";
import {BaseResponse} from "../BaseResponse";

export interface IGenerateKeyResponse extends BaseResponse {
    key?: Key;
}
