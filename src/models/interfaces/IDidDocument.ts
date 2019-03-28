import {IPublicKey} from "./IPublicKey";
import {IService} from "./IService";

export interface IDidDocument {
    context: string[];
    id: string;
    salt: string;
    created: string;
    publicKey: IPublicKey[];
    service: IService[];
}
