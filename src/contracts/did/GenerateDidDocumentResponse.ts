import {BaseResponse, IDidDocument} from "../..";

export interface GenerateDidDocumentResponse extends BaseResponse {
    didDocument: IDidDocument;
}
