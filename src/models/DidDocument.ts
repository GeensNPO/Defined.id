import {IDidDocument, IPublicKey, IService} from "..";

export class DidDocument implements IDidDocument {

    context: string[];
    created: string;
    id: string;
    publicKey: IPublicKey[];
    salt: string;
    service: IService[];

    constructor(context: string[], created: string, id: string, publicKey: IPublicKey[], salt: string, service: IService[]) {
        this.context = context;
        this.created = created;
        this.id = id;
        this.publicKey = publicKey;
        this.salt = salt;
        this.service = service;
    }

    format(): string {
        return JSON.stringify({
            context: this.context,
            id: this.id,
            salt: this.salt,
            publicKey: this.publicKey,
            service: this.service,
            created: this.created
        });
    }

}
