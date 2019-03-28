import {IHashRegisterRequest} from "../../contracts/hash/IHashRegisterRequest";
import {IHashRegisterResponse} from "../../contracts/hash/IHashRegisterResponse";
import {BaseHandler} from "../BaseHandler";

export class HashRegisterHandler extends BaseHandler<IHashRegisterRequest, IHashRegisterResponse> {

    handleCore(request: IHashRegisterRequest): IHashRegisterResponse {
        let documentHash: string = request.documentHash;
        let nemCatapultBlockchain: string = request.nemCatapultBlockchain;
        let nodeUri: string = request.nodeUri;

        if (documentHash) documentHash = documentHash.trim();
        if (nemCatapultBlockchain) nemCatapultBlockchain = nemCatapultBlockchain.trim();
        if (nodeUri) nodeUri = nodeUri.trim();
        return {
            documentHash: documentHash,
            nemCatapultBlockchain: nemCatapultBlockchain,
            nodeUri: nodeUri
        };
    }

    validateCore(request: IHashRegisterRequest): string[] {
        const errors: string[] = [];

        if (!request.documentHash) errors.push("documentHash is required");
        if (!request.nemCatapultBlockchain) errors.push("nemCatapultBlockchain is required");
        if (!request.nodeUri) errors.push("nodeUri is required");

        return errors;
    }

}
