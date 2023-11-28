import { randomBytes, createCipheriv, createDecipheriv, Cipher, Decipher } from 'node:crypto';
import { Buffer } from 'node:buffer';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

export type AsymmetricEncryptedData = {
    nonce: Buffer;
    ephemeralPublicKey: Buffer;
    ciphertext: Buffer;
};

export type EncryptedData = {
    encrypted_key: AsymmetricEncryptedData;
    encrypted_document: Buffer;
};

function asymmetric_encrypt(publicKey: Buffer, data: Buffer): AsymmetricEncryptedData {
    const nonce: Buffer = randomBytes(nacl.box.nonceLength);
    const ephemeralKeyPair = nacl.box.keyPair();
    const encryptedMessage = nacl.box(data, nonce, publicKey, ephemeralKeyPair.secretKey)
    return {
        nonce: nonce,
        ephemeralPublicKey: Buffer.from(ephemeralKeyPair.publicKey),
        ciphertext: Buffer.from(encryptedMessage)
    }
}

async function asymmetric_decrypt(address: string, encryptedData: AsymmetricEncryptedData): Promise<Buffer> {
    const decryption = await window.ethereum.request({
        "method": "eth_decrypt",
        "params": [
            metamaskify_encrypted_data(encryptedData),
            address
        ]
      });
    return Buffer.from(decryption);
}

function metamaskify_encrypted_data(encryptedData: AsymmetricEncryptedData): string {
    const data = {
        version: 'x25519-xsalsa20-poly1305',
        nonce: naclUtil.encodeBase64(encryptedData.nonce),
        ephemPublicKey: naclUtil.encodeBase64(encryptedData.ephemeralPublicKey),
        ciphertext: naclUtil.encodeBase64(encryptedData.ciphertext),
      };
    return '0x' + Buffer.from(JSON.stringify(data)).toString('hex');
}

function encode_asymmetric_encrypted_data(encryptedData: AsymmetricEncryptedData): Buffer {
    return Buffer.concat([encryptedData.nonce, encryptedData.ephemeralPublicKey, encryptedData.ciphertext], encryptedData.nonce.length + encryptedData.ephemeralPublicKey.length + encryptedData.ciphertext.length);
}

function decode_asymmetric_encrypted_data(encodedData: Buffer): AsymmetricEncryptedData {
    return {
        nonce: encodedData.subarray(0, nacl.box.nonceLength),
        ephemeralPublicKey: encodedData.subarray(nacl.box.nonceLength, nacl.box.nonceLength+nacl.box.publicKeyLength),
        ciphertext: encodedData.subarray(nacl.box.nonceLength+nacl.box.publicKeyLength)
    };
}

function encrypt_document(publicKey: Buffer, document_data: Buffer): EncryptedData {
    const IV_LENGTH = 16;
    const algorithm: string = 'aes-256-cbc';
    const symmetric_key: Buffer = randomBytes(32);
    const encrypted_key: AsymmetricEncryptedData = asymmetric_encrypt(publicKey, symmetric_key);
    const iv: Buffer = randomBytes(IV_LENGTH);
    let cipher: Cipher = createCipheriv(algorithm, symmetric_key, iv);

    let encrypted: Buffer = cipher.update(document_data);
	const buffer: Buffer = cipher.final();
	encrypted = Buffer.concat([iv, encrypted, buffer], IV_LENGTH + encrypted.length + buffer.length);

    return {
        encrypted_key: encrypted_key,
        encrypted_document: encrypted
    };
}

async function decrypt_document(address: string, encryptedData: EncryptedData): Promise<Buffer> {
    // Returns a decrypted Buffer of the original document_data
    const IV_LENGTH = 16;
    const algorithm: string = 'aes-256-cbc';
    const symmetric_key: Buffer = await asymmetric_decrypt(address, encryptedData.encrypted_key);
    const iv: Buffer = encryptedData.encrypted_document.subarray(0, IV_LENGTH);
    encryptedData.encrypted_document = encryptedData.encrypted_document.subarray(IV_LENGTH);
    let decipher: Decipher = createDecipheriv(algorithm, symmetric_key, iv);
    const decrypted: Buffer = decipher.update(encryptedData.encrypted_document);
	const buffer: Buffer = decipher.final();
    return Buffer.concat([decrypted, buffer], decrypted.length + buffer.length);
}
