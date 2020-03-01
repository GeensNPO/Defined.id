import { QRCodeService } from '../../services/QRCodeService';

describe('QRCodeService', () => {

    const did = 'did:defined:15e9h1AJe12tZRVptjhcCopwbHBSaD5TQ2';

    test('generate QR readable code', async () => {
        const code = await QRCodeService.generateQRCodeAsync(did);
        expect(code).toBeTruthy();
    });
});
