const nacl = require('tweetnacl');


export class SeedService {
    public static generateSeed(): string {
        let seedBytes = nacl.randomBytes(64);
        return  Buffer.from(seedBytes).toString('hex')
    }
}
