import { createCipheriv, createDecipheriv } from 'node:crypto';
import { randomBytes, encrypt, decrypt } from 'eth-sig-util';
import { Buffer } from 'node:buffer';

function encrypt_document(publicKey, document_data) {
    // document_data must be a Buffer, TypedArray, or DataView
    const algorithm = 'aes-256-cbc';
    const symmetric_key = randomBytes(32);
    const encrypted_key = encrypt({
        publicKey: publicKey,
        data: symmetric_key,
        version: 'x25519-xsalsa20-poly1305',
      });
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, symmetric_key, iv);

    let encrypted = cipher.update(document_data);
	let buffer = cipher.final();
	encrypted = Buffer.concat([encrypted, buffer], encrypted.length + buffer.length);

    return {
        encrypted_key: encrypted_key,
        encrypted_document: encrypted,
        iv: iv
    };
}

function decrypt_document(privateKey, encrypted_key, encrypted_document, iv) {
    // Returns a decrypted Buffer of the original document_data
    const algorithm = 'aes-256-cbc';
    const symmetric_key = decrypt({
        privateKey: privateKey,
        encryptedData: encrypted_key
      });
    const decipher = createDecipheriv(algorithm, symmetric_key, iv);
    let decrypted = decipher.update(encrypted_document);
	let buffer = decipher.final();
    return Buffer.concat([decrypted, buffer], decrypted.length + buffer.length);
}
