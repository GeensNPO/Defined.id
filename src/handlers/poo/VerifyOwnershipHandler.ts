import {IVerifyOwnershipResponse} from "../../contracts/poo/IVerifyOwnershipResponse";
import {IVerifyOwnershipRequest} from "../../contracts/poo/IVerifyOwnershipRequest";
import {ProofOfOwnership, ProofOfOwnershipService, DidValidator} from "../..";
import {BaseHandler} from "../BaseHandler";


export class VerifyOwnershipHandler extends BaseHandler<IVerifyOwnershipRequest, IVerifyOwnershipResponse> {

    handleCore(req: IVerifyOwnershipRequest): IVerifyOwnershipResponse {
        let didProver: string = req.didProver;
        if (didProver) didProver = didProver.trim();

        let didVerifier: string = req.didVerifier;
        if (didVerifier) didVerifier = didVerifier.trim();

        let publicKey: string = req.publicKey;
        if (publicKey) publicKey = publicKey.trim();
        const publicKeyBytes = Buffer.from(publicKey, "hex");

        const timestamp: number = req.timestamp;
        const timestampDate: Date = new Date(timestamp);

        let signature: string = req.signature;
        if (signature) signature = signature.trim();

        const poo: ProofOfOwnership = new ProofOfOwnership(didProver, didVerifier, publicKeyBytes, timestampDate, signature);
        const errors = ProofOfOwnershipService.verify(poo);
        return {
            errors: errors
        };
    }

    validateCore(req: IVerifyOwnershipRequest): string[] {
        const errors: string[] = [];

        if (!req.didProver) errors.push('DidProver is required');
        else if (!DidValidator.isDidStringValid(req.didProver)) errors.push('DidProver is invalid');

        if (!req.didVerifier) errors.push('DidVerifier is required');
        else if (!DidValidator.isDidStringValid(req.didVerifier)) errors.push('DidVerifier is invalid');

        return errors;
    }

}
