import {GenerateVerifiableClaimDocumentHandler} from "../../../handlers";
import {GenerateDidDocumentRequest, GenerateVerifiableClaimDocumentRequest} from "../../..";
import {IDidDocument} from "../../..";
import {IVerifiableClaimDocument} from "../../../models/interfaces/IVerifiableClaimDocument";

describe('GenerateVerifiableClaimDocumentHandler', () => {

    const generateVerifiableClaimsDocumentHandler: GenerateVerifiableClaimDocumentHandler = new GenerateVerifiableClaimDocumentHandler();

    describe('with valid request when', () => {

        describe('all optional parameters', () => {

            test('are given', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);
                const verifiableClaimDocument: IVerifiableClaimDocument = response.verifiableClaimDocument;

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeUndefined();

                expect(verifiableClaimDocument).toBeTruthy();
                expect(verifiableClaimDocument.context).toEqual(["http://www.example.com", "https://w3id.org/security/v2", "https://www.w3.org/2018/credentials/v1"]);
                expect(verifiableClaimDocument.id).toBe("http://defined.id/vc/1");
                expect(verifiableClaimDocument.type).toEqual(["customType", "VerifiableCredential"]);
                expect(verifiableClaimDocument.issuer).toBe("Defined id");
                expect(verifiableClaimDocument.issuanceDate).toBe("2018-10-10");
                expect(verifiableClaimDocument.expirationDate).toBe("2020-10-10");
                expect(verifiableClaimDocument.claim).toEqual(
                    {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    }
                );

            });
        });

        describe('context', () => {

            test('is missing', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);
                const verifiableClaimDocument: IVerifiableClaimDocument = response.verifiableClaimDocument;

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeUndefined();

                expect(verifiableClaimDocument).toBeTruthy();
                expect(verifiableClaimDocument.context).toEqual(["https://www.w3.org/2018/credentials/v1", "https://w3id.org/security/v2"]);
                expect(verifiableClaimDocument.id).toBe("http://defined.id/vc/1");
                expect(verifiableClaimDocument.type).toEqual(["customType", "VerifiableCredential"]);
                expect(verifiableClaimDocument.issuer).toBe("Defined id");
                expect(verifiableClaimDocument.issuanceDate).toBe("2018-10-10");
                expect(verifiableClaimDocument.expirationDate).toBe("2020-10-10");
                expect(verifiableClaimDocument.claim).toEqual(
                    {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    }
                );

            });

        });

    });

    describe('type', () => {

        test('is missing', () => {

            const request: GenerateVerifiableClaimDocumentRequest = {
                context: ["http://www.example.com"],
                id: "http://defined.id/vc/1",
                issuer: "Defined id",
                claim: {
                    id: 'http://defined.id/vc/1',
                    firstName: "Defined",
                    lastName: "id"
                },
                issuanceDate: "2018-10-10",
                expirationDate: "2020-10-10"

            };

            const response = generateVerifiableClaimsDocumentHandler.handle(request);
            const verifiableClaimDocument: IVerifiableClaimDocument = response.verifiableClaimDocument;

            expect(response.errors).toBeUndefined();
            expect(response.validationErrors).toBeUndefined();

            expect(verifiableClaimDocument).toBeTruthy();
            expect(verifiableClaimDocument.context).toEqual(["http://www.example.com", "https://w3id.org/security/v2", "https://www.w3.org/2018/credentials/v1"]);
            expect(verifiableClaimDocument.id).toBe("http://defined.id/vc/1");
            expect(verifiableClaimDocument.type).toEqual(["VerifiableCredential"]);
            expect(verifiableClaimDocument.issuer).toBe("Defined id");
            expect(verifiableClaimDocument.issuanceDate).toBe("2018-10-10");
            expect(verifiableClaimDocument.expirationDate).toBe("2020-10-10");
            expect(verifiableClaimDocument.claim).toEqual(
                {
                    id: 'http://defined.id/vc/1',
                    firstName: "Defined",
                    lastName: "id"
                }
            );

        });

    });

    describe('with invalid request when', () => {

        describe('id', () => {

            test('is missing', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Id is required']);

            });

            test('is invalid', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "invalid",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Id is invalid']);

            });

        });

        describe('issuer', () => {

            test('is missing', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Issuer is required']);

            });

        });

        describe('issuanceDate', () => {

            test('is missing', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Issuance date is required']);

            });

            test('is in the future', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2020-10-10",
                    expirationDate: "2020-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Issuance date can not be in the future']);

            });

        });

        describe('expirationDate', () => {

            test('is missing', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: ""

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Expiration date is required']);

            });

            test('is in the past', () => {

                const request: GenerateVerifiableClaimDocumentRequest = {
                    context: ["http://www.example.com"],
                    type: ["customType"],
                    id: "http://defined.id/vc/1",
                    issuer: "Defined id",
                    claim: {
                        id: 'http://defined.id/vc/1',
                        firstName: "Defined",
                        lastName: "id"
                    },
                    issuanceDate: "2018-10-10",
                    expirationDate: "2018-10-10"

                };

                const response = generateVerifiableClaimsDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Expiration date can not be in the future']);

            });

        });

        describe('claim', () => {

            describe('id', () => {

                test('is missing', () => {

                    const request: GenerateVerifiableClaimDocumentRequest = {
                        context: ["http://www.example.com"],
                        type: ["customType"],
                        id: "http://defined.id/vc/1",
                        issuer: "Defined id",
                        claim: {
                            id: '',
                            firstName: "Defined",
                            lastName: "id"
                        },
                        issuanceDate: "2018-10-10",
                        expirationDate: "2020-10-10"

                    };

                    const response = generateVerifiableClaimsDocumentHandler.handle(request);

                    expect(response.errors).toBeUndefined();
                    expect(response.validationErrors).toBeTruthy();
                    expect(response.validationErrors).toEqual(['Claim: Id is required']);

                });

                test('is invalid', () => {

                    const request: GenerateVerifiableClaimDocumentRequest = {
                        context: ["http://www.example.com"],
                        type: ["customType"],
                        id: "http://defined.id/vc/1",
                        issuer: "Defined id",
                        claim: {
                            id: 'invalid',
                            firstName: "Defined",
                            lastName: "id"
                        },
                        issuanceDate: "2018-10-10",
                        expirationDate: "2020-10-10"

                    };

                    const response = generateVerifiableClaimsDocumentHandler.handle(request);

                    expect(response.errors).toBeUndefined();
                    expect(response.validationErrors).toBeTruthy();
                    expect(response.validationErrors).toEqual(['Claim: Id is invalid']);

                });

            });

            describe('properties', () => {

                test('are missing', () => {

                    const request: GenerateVerifiableClaimDocumentRequest = {
                        context: ["http://www.example.com"],
                        type: ["customType"],
                        id: "http://defined.id/vc/1",
                        issuer: "Defined id",
                        claim: {
                            id: 'http://defined.id/vc/1'
                        },
                        issuanceDate: "2018-10-10",
                        expirationDate: "2020-10-10"

                    };

                    const response = generateVerifiableClaimsDocumentHandler.handle(request);

                    expect(response.errors).toBeUndefined();
                    expect(response.validationErrors).toBeTruthy();
                    expect(response.validationErrors).toEqual(['Claim: At least 1 property is required']);

                });

            });

        });

    });

});
