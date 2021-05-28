import { v4 as uuidv4 } from 'uuid';
import { IDid, DidValidator, SecurityService } from '..';

export class Did implements IDid {
  public method: string;
  public nemPublicKey: string;
  public salt: string;

  constructor(method: string, nemPublicKey: string, salt?: string) {
    this.method = method;
    this.nemPublicKey = nemPublicKey;
    if (!salt) this.salt = uuidv4();
    else this.salt = salt;
  }

  format(): string {
    const errors: string[] = DidValidator.validateDidModel(this);

    if (errors.length > 0) throw new Error(errors.join());
    return `did:${this.method}:${this.generateIdentifier()}`;
  }

  private generateIdentifier(): string {
    //Make sure the public key is lowercase before using it
    const pk = this.nemPublicKey.toLowerCase();
    return SecurityService.base58CheckEncode(
      SecurityService.ripemd160Hash(SecurityService.sha256StringHash(`${this.salt}${pk}`)),
    );
  }
}
