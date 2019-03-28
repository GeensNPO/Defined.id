import {IProveOwnershipResponse} from "../../contracts/poo/IProveOwnershipResponse";
import {IProveOwnershipRequest} from "../../contracts/poo/IProveOwnershipRequest";

import {ProofOfOwnership, ProofOfOwnershipService, DidValidator, KeyValidator, Key, Purposes} from "../..";
import {BaseHandler} from "../BaseHandler";

export class ProveOwnershipHandler extends BaseHandler<IProveOwnershipRequest, IProveOwnershipResponse> {

    handleCore(req: IProveOwnershipRequest): IProveOwnershipResponse {
        let seed: string = req.seed;
        if (seed) seed = seed.trim();

        let didProver: string = req.didProver;
        if (didProver) didProver = didProver.trim();

        let didVerifier: string = req.didVerifier;
        if (didVerifier) didVerifier = didVerifier.trim();

        const key = new Key(
            // @ts-ignore
            Purposes.find(req.keyId),
            seed,
            req.personaId,
            req.connectionId
        );

        const poo = new ProofOfOwnership(didProver, didVerifier, key.publicKey);
        const errors = ProofOfOwnershipService.proveOwnership(poo, key.privateKey64);
        if (errors.length > 0) throw new Error(errors.join());

        return {
            didProver: poo.didProver,
            didVerifier: poo.didVerifier,
            publicKey: poo.publicKey.toString('hex'),
            // @ts-ignore
            timestamp: poo.timestamp.getTime(),
            // @ts-ignore
            signature: poo.signature
        };
    }

    validateCore(req: IProveOwnershipRequest): string[] {
        const errors: string[] = [];

        if (!req.seed) errors.push('Seed is required');

        if (!req.personaId && req.personaId !== 0) errors.push('Persona id is required');
        else if (!KeyValidator.isNaturalNumber(req.personaId)) errors.push('Persona id is invalid');

        if (req.connectionId && !KeyValidator.isNaturalNumber(req.connectionId)) errors.push('Connection id is invalid');

        if (!req.keyId) errors.push('Key id is required');
        else Purposes.find(req.keyId) === undefined ? errors.push(`Key id is invalid`) : '';

        if (!req.didProver) errors.push('DidProver is required');
        else if (!DidValidator.isDidStringValid(req.didProver)) errors.push('DidProver is invalid');

        if (!req.didVerifier) errors.push('DidVerifier is required');
        else if (!DidValidator.isDidStringValid(req.didVerifier)) errors.push('DidVerifier is invalid');

        return errors;
    }

}
