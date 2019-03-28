import {BaseRequest} from "../..";

export interface IVerifyOwnershipRequest extends BaseRequest {
  didProver: string;
  didVerifier: string;
  publicKey: string;
  timestamp: number;
  signature: string;
}
