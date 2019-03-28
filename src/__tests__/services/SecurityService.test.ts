import {SecurityService} from "../..";

describe('SecurityService', () => {

    const sha256Regex = /[A-Fa-f0-9]{64}/;

    describe('with valid', () => {
        describe ('sha256', () => {
            const hash = SecurityService.sha256Hash(new Uint8Array([18, 15, 20]));
            test('regex', () => {
                expect(hash).toMatch(sha256Regex);
            });

            test('value', () => {
                expect(hash).toBe("6f3d5c9570a0a4a2442a84f9d1d13a1ce7a4c71acd6f21da57b28064a912f9cb");

            });
        })
    });
});
