import {GenerateDidDocumentHandler} from "../../../handlers";
import {GenerateDidDocumentRequest} from "../../..";
import {IDidDocument} from "../../..";

describe('GenerateDidDocumentHandler', () => {

    const generateDidDocumentHandler: GenerateDidDocumentHandler = new GenerateDidDocumentHandler();

    describe('with valid', () => {

        const request: GenerateDidDocumentRequest = {
            did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
            salt: '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141',
            pubKey: [
                {
                    id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                    owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                    type: "Ed25519VerificationKey2018",
                    publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                }
            ],
            services: [
                {
                    did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                    serviceName: "openid",
                    type: "OpenIdConnectVersion1.0Service",
                    serviceEndpoint: "https://openid.example.com/"
                }
            ]
        };

        const response = generateDidDocumentHandler.handle(request);
        const didDocument: IDidDocument = response.didDocument;

        test('request', () => {
            expect(response.errors).toBeUndefined();
            expect(response.validationErrors).toBeUndefined();

            expect(didDocument).toBeTruthy();
            expect(didDocument.context).toEqual(['https://w3id.org/did/v1', 'https://w3id.org/security/v1']);
            expect(didDocument.id).toBe('did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2');
            expect(didDocument.salt).toBe('0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141');
            expect(didDocument.publicKey).toEqual([
                {
                    id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                    owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                    type: "Ed25519VerificationKey2018",
                    publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                }
            ]);
            expect(didDocument.service).toEqual([
                {
                    did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                    serviceName: "openid",
                    type: "OpenIdConnectVersion1.0Service",
                    serviceEndpoint: "https://openid.example.com/"
                }
            ]);
            expect(didDocument.created).toBeTruthy();
        });

    });

    describe('with invalid request when' , () => {

        describe('did', () => {

            test('is missing', () => {

                const request: GenerateDidDocumentRequest = {
                    did: '',
                    salt: '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141',
                    pubKey: [
                        {
                            id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                            owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                            type: "Ed25519VerificationKey2018",
                            publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                        }
                    ],
                    services: [
                        {
                            did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                            serviceName: "openid",
                            type: "OpenIdConnectVersion1.0Service",
                            serviceEndpoint: "https://openid.example.com/"
                        }
                    ]
                };

                const response = generateDidDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Did is required']);

            });

            test('is invalid', () => {

                const request: GenerateDidDocumentRequest = {
                    did: 'sadsadsadsada sa',
                    salt: '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141',
                    pubKey: [
                        {
                            id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                            owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                            type: "Ed25519VerificationKey2018",
                            publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                        }
                    ],
                    services: [
                        {
                            did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                            serviceName: "openid",
                            type: "OpenIdConnectVersion1.0Service",
                            serviceEndpoint: "https://openid.example.com/"
                        }
                    ]
                };

                const response = generateDidDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Did is invalid']);

            });

        });

        describe('salt', () => {

            test('is missing', () => {

                const request: GenerateDidDocumentRequest = {
                    did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                    salt: '',
                    pubKey: [
                        {
                            id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                            owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                            type: "Ed25519VerificationKey2018",
                            publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                        }
                    ],
                    services: [
                        {
                            did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                            serviceName: "openid",
                            type: "OpenIdConnectVersion1.0Service",
                            serviceEndpoint: "https://openid.example.com/"
                        }
                    ]
                };

                const response = generateDidDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Salt is required']);

            });

            test('is invalid', () => {

                const request: GenerateDidDocumentRequest = {
                    did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                    salt: 'sad',
                    pubKey: [
                        {
                            id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                            owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                            type: "Ed25519VerificationKey2018",
                            publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                        }
                    ],
                    services: [
                        {
                            did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                            serviceName: "openid",
                            type: "OpenIdConnectVersion1.0Service",
                            serviceEndpoint: "https://openid.example.com/"
                        }
                    ]
                };

                const response = generateDidDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Salt is invalid']);

            });

        });

        describe('pubKey', () => {

            test('is missing', () => {

                const request: GenerateDidDocumentRequest = {
                    did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                    salt: '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141',
                    pubKey: [],
                    services: [
                        {
                            did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                            serviceName: "openid",
                            type: "OpenIdConnectVersion1.0Service",
                            serviceEndpoint: "https://openid.example.com/"
                        }
                    ]
                };

                const response = generateDidDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['PubKey is required']);

            });

        });

        describe('services', () => {

            test('is missing', () => {

                const request: GenerateDidDocumentRequest = {
                    did: 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2',
                    salt: '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141',
                    pubKey: [
                        {
                            id: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP#authentication-key-1",
                            owner: "did:defined:166evUDhpSSq23xP26oeQ4uNZNZce1KFFP",
                            type: "Ed25519VerificationKey2018",
                            publicKeyHex: "0023757068c19dd7b51531ed327c0e000e7f737a3611a7374015618988aa733bb8"

                        }
                    ],
                    services: []
                };

                const response = generateDidDocumentHandler.handle(request);

                expect(response.errors).toBeUndefined();
                expect(response.validationErrors).toBeTruthy();
                expect(response.validationErrors).toEqual(['Services are required']);
            });

        });

    });
});
