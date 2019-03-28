import {derivePath} from "../constants/hd-key";

const crypto = require('crypto');
const sha256 = require('js-sha256').sha256;
const base58 = require("base-58");
const base58check = require('base58check');
const ripemd160 = require('ripemd160');

var EC = require('elliptic').ec;
var encoderOptions = {
    curveParameters: [1, 3, 132, 0, 10],
    privatePEMOptions: {label: 'PRIVATE KEY'},
    publicPEMOptions: {label: 'PUBLIC KEY'},
    curve: new EC('ed25519')
};
var KeyEncoder = require('key-encoder'), keyEncoder = new KeyEncoder(encoderOptions);


export class SecurityService {

    public static scrypt(password: string): string {
        return crypto.scryptSync(password, 'c7553c09-1ddc-4263-a0bc-f47a3d2297b5', 256);
    }

    public static sha256Hash(bytes: Uint8Array): string {
        return sha256(bytes);
    }

    public static derivePath(path: string, hexSeed: string): { key: Buffer; chainCode: Buffer; } {
        return derivePath(path, hexSeed);
    }

    public static base58Encode(buffer: Buffer): string {
        return base58.encode(buffer);
    }

    public static pemEncode(buffer: Buffer): string {
        return keyEncoder.encodePublic(buffer, 'raw', 'pem')
    }

    public static base58CheckEncode(text: string): string {
        return base58check.encode(text);
    }

    public static base58CheckDecode(text: string): string {
        return base58check.decode(text);
    }

    public static ripemd160Hash(text: string): string {
        return new ripemd160().update(text).digest('hex');
    }

    public static sha256StringHash(text: string): string {
        return sha256(text);
    }
}
