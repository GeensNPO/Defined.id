import {DidValidator, IDid} from "../..";

describe('IDid validator', () => {

    describe('with valid', () => {

        test('method', () => {
            expect(DidValidator.isMethodValid('defined')).toBe(true);
            expect(DidValidator.isMethodValid('valid')).toBe(true);
        });

        test('nemPublicKey', () => {
            expect(DidValidator.isNemPublicKeyValid('D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B')).toBe(true);
            expect(DidValidator.isNemPublicKeyValid('D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1BFD')).toBe(true);
        });

        test('salt', () => {
            expect(DidValidator.isSaltValid('0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141')).toBe(true);
            expect(DidValidator.isSaltValid('730b2d43-8dc7-453c-94f1-5b351ef16e0d')).toBe(true);
        });

        test('did', () => {
            const method = 'defined';
            const salt = '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141';
            const nemPublicKey = 'D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B';

            const did: IDid = {
                nemPublicKey: nemPublicKey,
                method: method,
                salt: salt
            };

            const errors = DidValidator.validateDidModel(did);

            expect(errors.length).toBe(0);
            expect(errors).toEqual([]);
        });

        test('formattedDid', () => {
            expect(DidValidator.isDidStringValid('did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2')).toBe(true);
            expect(DidValidator.isDidStringValid('did:nem:15e9h1AJe12123VptjhcCopwbHBSaD5TQ2')).toBe(true);
        });
    });

    describe('with invalid', () => {

        test('method', () => {
            expect(DidValidator.isMethodValid('defined-id')).toBe(false);
            expect(DidValidator.isMethodValid('defined id')).toBe(false);
            expect(DidValidator.isMethodValid('defined-id')).toBe(false);
        });

        test('nemPublicKey', () => {
            expect(DidValidator.isNemPublicKeyValid('D98C8B7478E0255127E24B7C075B78B5D4A90F1454FA9D8CD262ABF665B2B1B')).toBe(false);
            expect(DidValidator.isNemPublicKeyValid('D98C8B7478E0255127E24B7C0752D4A90F1454FA9D8CABF665B2B1B')).toBe(false);
            expect(DidValidator.isNemPublicKeyValid('D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B4')).toBe(false);
        });

        test('formattedDid', () => {
            expect(DidValidator.isDidStringValid('did:defined-id:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2')).toBe(false);
            expect(DidValidator.isDidStringValid('did:15e9h1AJe12123VptjhcCopwbHBSaD5TQ2')).toBe(false);
            expect(DidValidator.isDidStringValid('did:defined:15e9h')).toBe(false);
        });

        test('salt', () => {
            expect(DidValidator.isSaltValid('100e11be-4369-45e6-b99a.5397028db73d')).toBe(false);
            expect(DidValidator.isSaltValid('100e11be-4369-fs56-b99a 5397028db73d')).toBe(false);
            expect(DidValidator.isSaltValid('100e11be-4369-fs56-b99a-5397028db73dd')).toBe(false);
            expect(DidValidator.isSaltValid('100e11bea4369afs56ab99ag5397028db3dd')).toBe(false);
        });

        describe('did', () => {

            describe('when method', () => {

                test('is invalid', () => {
                    const method = 'defined-id';
                    const salt = '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141';
                    const nemPublicKey = 'D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B';

                    const did: IDid = {
                        nemPublicKey: nemPublicKey,
                        method: method,
                        salt: salt
                    };

                    const errors = DidValidator.validateDidModel(did);
                    expect(errors.length).toBe(1);
                    expect(errors).toEqual(['Method is invalid']);
                });

                test('is missing', () => {
                    const method = '';
                    const nemPublicKey = 'D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B';
                    const salt = '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141';

                    const did: IDid = {
                        nemPublicKey: nemPublicKey,
                        method: method,
                        salt: salt
                    };

                    const errors = DidValidator.validateDidModel(did);
                    expect(errors.length).toBe(1);
                    expect(errors).toEqual(['Method is required']);
                });

            });

            describe('when nemPublicKey', () => {

                test('is invalid', () => {
                    const method = 'defined';
                    const nemPublicKey = 'D98C8B7478E025527E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B';
                    const salt = '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141';

                    const did: IDid = {
                        nemPublicKey: nemPublicKey,
                        method: method,
                        salt: salt
                    };

                    const errors = DidValidator.validateDidModel(did);
                    expect(errors.length).toBe(1);
                    expect(errors).toEqual(['Nem public key is invalid']);
                });

                test('is missing', () => {
                    const method = 'defined';
                    const nemPublicKey = '';
                    const salt = '0f2cb0bd-771e-40b8-9dba-6e6aaf7d0141';

                    const did: IDid = {
                        nemPublicKey: nemPublicKey,
                        method: method,
                        salt: salt
                    };

                    const errors = DidValidator.validateDidModel(did);
                    expect(errors.length).toBe(1);
                    expect(errors).toEqual(['Nem public key is required']);
                });

            });

            describe('when salt', () => {

                test('is invalid', () => {
                    const method = 'defined';
                    const nemPublicKey = 'D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1BFD';
                    const salt = '100e11be-4369-45e6-b99a.5397028db73d';

                    const did: IDid = {
                        nemPublicKey: nemPublicKey,
                        method: method,
                        salt: salt
                    };

                    const errors = DidValidator.validateDidModel(did);
                    expect(errors.length).toBe(1);
                    expect(errors).toEqual(['Salt is invalid']);
                });

                test('is missing', () => {
                    const method = 'defined';
                    const salt = '';
                    const nemPublicKey = 'D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1BFD';

                    const did: IDid = {
                        nemPublicKey: nemPublicKey,
                        method: method,
                        salt: salt
                    };

                    const errors = DidValidator.validateDidModel(did);
                    expect(errors.length).toBe(1);
                    expect(errors).toEqual(['Salt is required']);
                });

            });

        });

    });
});
