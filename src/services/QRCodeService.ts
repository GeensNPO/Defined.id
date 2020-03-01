const QRCode = require('qrcode');

export class QRCodeService {

    public static async generateQRCodeAsync(did: string) {
        return await QRCode.toDataURL(did);
    }

}
