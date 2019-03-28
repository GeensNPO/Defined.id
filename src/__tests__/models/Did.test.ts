import {Did} from "../..";

describe('IDid', () => {

    const saltRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    const didRegex = /^did:[a-z]+:[1-9A-HJ-NP-Za-km-z]+$/;

    describe('valid', () => {

        const method = 'defined';
        const nemPublicKey = 'd98c8b7478e0255127e24b7c0752b78b5d4a90f1454fa9d8cd262abf665b2b1b';
        const did: Did = new Did(method, nemPublicKey);

        const salt = '689cd655-a07a-4e30-96b9-3320e865b21e';
        const didWithSalt: Did = new Did(method, nemPublicKey, salt);
        const didWithSaltResult = 'did:defined:1KnEMPiaBe2JSMtbrMyH5a2U32GQVJJHGQ';
        const didWithSaltUpperCase: Did = new Did(method, nemPublicKey.toUpperCase(), salt);

        test('creation', () => {
            expect(did).toBeTruthy();
            expect(did.method).toBe('defined');
            expect(did.nemPublicKey).toBe('d98c8b7478e0255127e24b7c0752b78b5d4a90f1454fa9d8cd262abf665b2b1b');
            expect(did.salt).toMatch(saltRegex);
        });

        test('format', () => {
            expect(did.format()).toMatch(didRegex);
            expect(didWithSalt.format()).toBe(didWithSaltResult);
            expect(didWithSaltUpperCase.format()).toBe(didWithSaltResult);
        });
    });

    describe('with invalid', () => {

        describe('method', () => {

            const method = 'define.d';
            const nemPublicKey = 'D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B';
            const did: Did = new Did(method, nemPublicKey);
            test('creation', () => {
                expect(did).toBeTruthy();
                expect(did.method).toBe('define.d');
                expect(did.nemPublicKey).toBe('D98C8B7478E0255127E24B7C0752B78B5D4A90F1454FA9D8CD262ABF665B2B1B');
                expect(did.salt).toMatch(saltRegex);
            });

            test('format', () => {
                expect(() => {did.format();}).toThrow();
            });
        });

        describe('nemPublicKey', () => {

            const method = 'defined';
            const nemPublicKey = 'nem public key';
            const did: Did = new Did(method, nemPublicKey);

            test('creation', () => {
                expect(did).toBeTruthy();
                expect(did.method).toBe('defined');
                expect(did.nemPublicKey).toBe('nem public key');
                expect(did.salt).toMatch(saltRegex);
            });

            test('format', () => {
              expect(() => {did.format();}).toThrow();
            });
        });

    });

});
