import {KeyTypes} from "../enums/KeyTypes";
import {IKeyPurpose} from "..";
import {KeyPurposes} from "../enums/KeyPurposes";

export class Purposes {

    private static keyPurposes: IKeyPurpose[] = [
        {
            id: 0,
            purpose: KeyPurposes.signing,
            type: KeyTypes.Ed25519VerificationKey2018
        },
        {
            id: 1,
            purpose: KeyPurposes.authentication,
            type: KeyTypes.Ed25519VerificationKey2018
        },
        {
            id: 2,
            purpose: KeyPurposes.granting,
            type: KeyTypes.Ed25519VerificationKey2018
        },
        {
            id: 100,
            purpose: KeyPurposes.nemRegistrationKey,
            type: KeyTypes.NEM2Key
        }
    ];

    public static find(id: number): IKeyPurpose | undefined {
        return this.keyPurposes.find((keyPurpose: IKeyPurpose) => keyPurpose.id === id);
    }
}
