import nem2Sdk = require("symbol-sdk");
import {Key} from "./Key";
import {Blockchain} from "..";
import {Account, NetworkType} from "symbol-sdk";
import {KeyPurposes} from "../enums/KeyPurposes";


export class NemAccount {

    private _key: Key;
    private _privateKey: string | undefined;
    private _publicKey: string | undefined;
    private _address: string | undefined;
    private readonly _blockchain: string;
    private readonly _networkType: NetworkType | undefined;
    private readonly _account: Account | undefined;

    constructor(key: Key, blockchain: string) {
        this._key = key;
        this._blockchain = blockchain;
        this._privateKey = this.derivePrivateKey();
        this._publicKey= this.derivePublicKey();
        this._networkType = this.deriveNetworkType();
        this._account = this.deriveAccount();
        this._address = this.deriveAddress();

    }

    private derivePrivateKey(): string | undefined{
        if (this._key.purpose.purpose == KeyPurposes.nemRegistrationKey) {

            this._privateKey = this._key.privateKey.toString('hex').toUpperCase();

            return this._privateKey;
        }
        return undefined;
    }

    private derivePublicKey(): string | undefined{
        if (this._key.purpose.purpose == KeyPurposes.nemRegistrationKey) {

            this._publicKey = this._key.publicKey.toString('hex').toUpperCase();

            return this._publicKey;
        }
        return undefined;
    }

    private deriveAddress(): string | undefined{
        this._address = this._account ? this._account.address.pretty(): undefined;
        return this._address;
    }

    private deriveNetworkType(): NetworkType | undefined {
        const networkType = Blockchain.getNetworkTypeByBlockchain(this._blockchain);
        if(networkType) return networkType;
    }

    private deriveAccount(): nem2Sdk.Account | undefined {
        if (this._networkType && this._privateKey) {
            return Account.createFromPrivateKey(this._privateKey, this._networkType);
        }
        return undefined;
    }

    private getGenerationHash(): string | undefined{
        const generationHash = Blockchain
        return 
    }

    get publicAccount(): nem2Sdk.PublicAccount | undefined{
        return this._account ? this._account.publicAccount: undefined;
    }

    get networkType(): nem2Sdk.NetworkType | undefined{
        return this._networkType;
    }

    get privateKey(): string | undefined{
        return this._privateKey;
    }
    get publicKey(): string | undefined{
        return this._publicKey;
    }

    get address(): string | undefined {
        return this._address;
    }

}
