import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import * as fs from 'fs';
import { CID } from 'multiformats/cid';

// Connect to IPFS
const helia = await createHelia();
const helia_fs = unixfs(helia);

// Upload File
async function uploadFile(filePath: string) : Promise<Buffer> {
    const fileContent: Buffer = fs.readFileSync(filePath);
    const result: CID = await helia_fs.addBytes(fileContent);
    return Buffer.from(result.toV1().bytes);
}

// Download File
async function downloadFile(ipfsHash: Buffer) : Promise<Buffer> {
    const cid = new CID(ipfsHash);

    var size : number = 0;
    var chunks : Array<Uint8Array> = [];

    for await (const chunk of helia_fs.cat(cid)) {
        chunks.push(chunk);
        size += chunk.length;
    }

    return Buffer.concat(chunks, size);
}