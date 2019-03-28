import {IGenerateKeyResponse} from "./IGenerateKeyResponse";
import {Key} from "../..";

export interface IGenerateKeysResponse extends IGenerateKeyResponse {
    keys: Key[];
}
