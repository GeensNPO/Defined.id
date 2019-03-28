import {IKeyPurpose} from "./IKeyPurpose";

export interface IKey {
    purpose: IKeyPurpose;
    connectionId?: number;
    personaId: number;
    publicKey: Buffer;
    privateKey: Buffer;
}
