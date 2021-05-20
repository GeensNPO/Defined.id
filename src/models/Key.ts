import { SecurityService, IKey, IKeyPurpose } from '..';
import { KeyTypes } from '../enums/KeyTypes';
import nem2Sdk = require('symbol-sdk');
import { ExtendedKey, MnemonicPassPhrase, Wallet, Network } from 'symbol-hd-wallets';
import { AccountService } from 'symbol-sdk';

const nacl = require('tweetnacl');
const naclUtil = require('tweetnacl-util');

const Account = nem2Sdk.Account;
const NetworkType = nem2Sdk.NetworkType;

export class Key implements IKey {
  public purpose: IKeyPurpose;
  public connectionId?: number;
  public personaId: number;
  public secretSeed: Buffer;
  public publicKey: Buffer;
  public privateKey: Buffer;

  /**
   * Default account derivation path
   * @var {string}
   */
  public static readonly DEFAULT_ACCOUNT_PATH_SYMBOL = `m/44'/4343'/0'/0'/0'`;

  //Private key representation used by tweetnacl. This is a 64 byte representation being a concatenation of a 32 byte private key and 32 byte public key.
  public privateKey64: Buffer;

  constructor(purpose: IKeyPurpose, seed: string, personaId: number, connectionId?: number) {
    this.purpose = purpose;
    this.personaId = personaId;
    this.connectionId = connectionId;
    const key = this.generateKey(seed);
    this.secretSeed = key.secretSeed;
    this.publicKey = key.publickey;
    this.privateKey = key.privatekey;
    this.privateKey64 = key.privatekey64;
  }

  private generateKey(
    seed: string,
  ): { publickey: Buffer; privatekey: Buffer; privatekey64: Buffer; secretSeed: Buffer } {
    let derivePath;

    if (this.connectionId)
      derivePath = SecurityService.derivePath(
        `m/0'/${this.purpose.id}'/${this.personaId}'/${this.connectionId}'`,
        seed,
      );
    else derivePath = SecurityService.derivePath(`m/0'/${this.purpose.id}'/${this.personaId}'`, seed);

    const secretSeed = Buffer.from(derivePath.key);

    switch (this.purpose.type) {
      case KeyTypes.NEM2Key:
        return this.generateNEM2Key(seed);
      case KeyTypes.Ed25519VerificationKey2018:
      default:
        return this.generateEd25519Key(secretSeed);
    }
  }

  private generateEd25519Key(
    secretSeed: Buffer,
  ): { publickey: Buffer; privatekey: Buffer; privatekey64: Buffer; secretSeed: Buffer } {
    const secretSeedUint8 = new Uint8Array(secretSeed);
    const naclKeys = nacl.sign.keyPair.fromSeed(secretSeedUint8);

    const privateKey64 = Buffer.from(naclKeys.secretKey);
    const privateKey = Buffer.from(naclKeys.secretKey.slice(0, 32));
    let publicKey = Buffer.from(naclKeys.publicKey);

    return {
      publickey: publicKey,
      privatekey: privateKey,
      privatekey64: privateKey64,
      secretSeed: secretSeed,
    };
  }

  private generateNEM2Key(
    words: string,
  ): { publickey: Buffer; privatekey: Buffer; privatekey64: Buffer; secretSeed: Buffer } {
    const mnemonic = new MnemonicPassPhrase(words);
    const bip32Seed = mnemonic.toSeed();
    const xkey = ExtendedKey.createFromSeed(bip32Seed.toString('hex'));
    const wallet = new Wallet(xkey.derivePath("m/44'/4343'/0'/0'/0'"));

    //Networktype does not matter for public key generation
    //Take note: for address generation, the networkType is important, so don't use this account for anything else than extracting the public and private keys.
    const masterAccount = wallet.getAccount();

    const privateKey = Buffer.from(masterAccount.privateKey, 'hex');
    const publicKey = Buffer.from(masterAccount.publicKey, 'hex');

    //If length is 33 remove the zero byte from the public key
    let publicKeyRed = publicKey;
    if (publicKeyRed.length === 33) publicKeyRed = publicKeyRed.slice(1, 33);
    const concatInput = [privateKey, publicKeyRed];
    const privateKey64 = Buffer.concat(concatInput, 64);

    return {
      publickey: publicKey,
      privatekey: privateKey,
      privatekey64: privateKey64,
      secretSeed: bip32Seed,
    };
  }
}
