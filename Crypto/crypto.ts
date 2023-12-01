// var Buffer = require('buffer/').Buffer; // Required for browser compatibility
// import * as Buffer from 'buffer/';
import { Buffer } from 'buffer/';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';


const SYMMETRIC_ALGORITHM_NAME: string = 'AES-CBC';
const SYMMETRIC_KEY_LENGTH: number = 256;
const SYMMETRIC_ALGORITHM: AesKeyGenParams = {name: SYMMETRIC_ALGORITHM_NAME, length: SYMMETRIC_KEY_LENGTH};
const ASYMMETRIC_ALGORITHM: string = 'x25519-xsalsa20-poly1305';
const IV_LENGTH: number = 16;

export type AsymmetricEncryptedData = {
    nonce: Buffer;
    ephemeralPublicKey: Buffer;
    ciphertext: Buffer;
};

export type EncryptedData = {
    encrypted_key: AsymmetricEncryptedData;
    encrypted_document: Buffer;
};

export type EncryptedKeyAndCID = {
    encrypted_key: AsymmetricEncryptedData;
    cid: Buffer;
}

function randomBytes(amount: number): Buffer {
    let data = Buffer.alloc(amount);
    window.crypto.getRandomValues(data);
    return data;
}

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
        version: ASYMMETRIC_ALGORITHM,
        nonce: naclUtil.encodeBase64(encryptedData.nonce),
        ephemPublicKey: naclUtil.encodeBase64(encryptedData.ephemeralPublicKey),
        ciphertext: naclUtil.encodeBase64(encryptedData.ciphertext),
      };
    return '0x' + Buffer.from(JSON.stringify(data)).toString('hex');
}

function encode_asymmetric_encrypted_data(encryptedData: AsymmetricEncryptedData, IPFS_hash: Buffer): Buffer {
    const IPFS_hash_length: number = 36;
    if ( IPFS_hash_length !== IPFS_hash.length) {
        throw new Error(`Expected IPFS_hash to be ${IPFS_hash_length} bytes long, but was ${IPFS_hash.length} bytes long`);
    }

    return Buffer.concat([IPFS_hash, encryptedData.nonce, encryptedData.ephemeralPublicKey, encryptedData.ciphertext], IPFS_hash.length + encryptedData.nonce.length + encryptedData.ephemeralPublicKey.length + encryptedData.ciphertext.length);
}

function decode_asymmetric_encrypted_data(encodedData: Buffer): EncryptedKeyAndCID {
    const IPFS_hash_length: number = 36;
    const CID: Buffer = encodedData.subarray(0, IPFS_hash_length);
    const encrypted_key: AsymmetricEncryptedData = {
        nonce: encodedData.subarray(IPFS_hash_length, IPFS_hash_length + nacl.box.nonceLength),
        ephemeralPublicKey: encodedData.subarray(IPFS_hash_length + nacl.box.nonceLength, IPFS_hash_length + nacl.box.nonceLength+nacl.box.publicKeyLength),
        ciphertext: encodedData.subarray(IPFS_hash_length + nacl.box.nonceLength+nacl.box.publicKeyLength)
    }
    return {
        encrypted_key: encrypted_key,
        cid: CID
    };
}

async function encrypt_document(publicKey: Buffer, document_data: Buffer): Promise<EncryptedData> {
    const symmetric_key: CryptoKey = await window.crypto.subtle.generateKey(SYMMETRIC_ALGORITHM, true, ["encrypt"]);
    const symmetric_key_data: Buffer = await window.crypto.subtle.exportKey("raw", symmetric_key).then(Buffer.from);
    const encrypted_key: AsymmetricEncryptedData = asymmetric_encrypt(publicKey, symmetric_key_data);
    const iv: Buffer = randomBytes(IV_LENGTH);

    let encrypted: Buffer = await window.crypto.subtle.encrypt({name: SYMMETRIC_ALGORITHM_NAME, iv:iv}, symmetric_key, document_data).then(Buffer.from);
	encrypted = Buffer.concat([iv, encrypted], IV_LENGTH + encrypted.length);

    return {
        encrypted_key: encrypted_key,
        encrypted_document: encrypted
    };
}

async function decrypt_document(address: string, encryptedData: EncryptedData): Promise<Buffer> {
    // Returns a decrypted Buffer of the original document_data
    const symmetric_key_data: Buffer = await asymmetric_decrypt(address, encryptedData.encrypted_key);
    const symmetric_key: CryptoKey = await window.crypto.subtle.importKey("raw", symmetric_key_data, SYMMETRIC_ALGORITHM, false, ["decrypt"]);
    const iv: Buffer = encryptedData.encrypted_document.subarray(0, IV_LENGTH);
    let encrypted_document = encryptedData.encrypted_document.subarray(IV_LENGTH);
    const decrypted: Buffer = await window.crypto.subtle.decrypt({name: SYMMETRIC_ALGORITHM_NAME, iv:iv}, symmetric_key, encrypted_document).then(Buffer.from);
    return decrypted
}

export { encrypt_document, decrypt_document, encode_asymmetric_encrypted_data, decode_asymmetric_encrypted_data};