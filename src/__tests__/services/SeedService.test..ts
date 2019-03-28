import {SeedService} from "../..";

const seedRegex = /[A-Fa-f0-9]{128}/;

describe('SeedService', () => {
    describe('with valid', () => {
        let seed = SeedService.generateSeed();
        test('seed',  () => {
            expect(seed).toMatch(seedRegex);

        });
    })
});
