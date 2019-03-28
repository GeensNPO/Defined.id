import {KeyPurposes} from "../../enums/KeyPurposes";

export interface IKeyPurpose {
    id: number;
    purpose: KeyPurposes;
    type: string;
}
