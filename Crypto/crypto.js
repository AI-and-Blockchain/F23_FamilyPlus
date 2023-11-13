const cryptography = require('node:crypto');
const sigUtil = require('eth-sig-util')

function encrypt_document(publicKey, document_data) {
    // document_data must be a Buffer, TypedArray, or DataView
    const algorithm = 'aes-256-cbc';
    const symmetric_key = randomBytes(32);
    encrypted_key = sigUtil.encrypt({
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

function decrypt_document(privateKey, encrypted_key, encrypted_document, iv) {
    // Returns a decrypted Buffer of the original document_data
    const algorithm = 'aes-256-cbc';
    const symmetric_key = sigUtil.decrypt({
        privateKey: encrypted_key,
        encryptedData: ciphertext
      });
    const decipher = createDecipheriv(algorithm, symmetric_key, iv);
    let decrypted = decipher.update(encrypted_document);
    decrypted += decipher.final();
    return decrypted;
}
