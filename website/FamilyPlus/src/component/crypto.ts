import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';
import sigUtil from 'eth-sig-util';

interface EncryptedData {
    encrypted_key: string;
    encrypted_document: string;
    iv: Buffer;
}

function encrypt_document(publicKey: string, document_data: Buffer | TypedArray | DataView): EncryptedData {
    // document_data must be a Buffer, TypedArray, or DataView
    const algorithm = 'aes-256-cbc';
    const symmetric_key = randomBytes(32);
    const encrypted_key = sigUtil.encrypt({
        publicKey: publicKey,
        data: symmetric_key,
        version: 'x25519-xsalsa20-poly1305',
    });
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, symmetric_key, iv);

    let encrypted = cipher.update(document_data);
    encrypted += cipher.final();

    return {
        encrypted_key: encrypted_key,
        encrypted_document: encrypted,
        iv: iv
    };
}

function decrypt_document(privateKey: string, encrypted_key: string, encrypted_document: string, iv: Buffer): Buffer {
    // Returns a decrypted Buffer of the original document_data
    const algorithm = 'aes-256-cbc';
    const symmetric_key = sigUtil.decrypt({
        privateKey: privateKey,
        encryptedData: encrypted_key
    });
    const decipher = createDecipheriv(algorithm, symmetric_key, iv);
    let decrypted = decipher.update(encrypted_document, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return Buffer.from(decrypted, 'utf-8');
}

export { encrypt_document, decrypt_document };
