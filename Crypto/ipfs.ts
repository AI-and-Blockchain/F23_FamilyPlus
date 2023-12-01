import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID, digest } from 'multiformats/basics';
import { Buffer } from 'buffer/';

// Connect to IPFS
const helia = await createHelia();
const helia_fs = unixfs(helia);

function bufferToCID(ipfsHash: Buffer) : CID {
    const ipfs_digest = digest.create(0x12, ipfsHash);
    return CID.createV1(0x55, ipfs_digest);
}

// Upload File
async function uploadFile(fileContent: Buffer) : Promise<Buffer> {
    const result: CID = await helia_fs.addBytes(fileContent);
    console.log('Result CID: ' + result.toString());
    return Buffer.from(result.toV1().bytes);
}

// Download File
async function downloadFile(ipfsHash: Buffer) : Promise<Buffer> {
    const ipfs_digest = digest.create(0x12, ipfsHash);
    const cid = CID.createV1(0x55, ipfs_digest);
    console.log('Downloaded CID: ' + cid.toString());
    //const cid = new CID(1, 0x55, digest.create(0x55, ipfsHash), encodeCID(1, 0x55, ipfsHash));

    var size : number = 0;
    var chunks : Array<Uint8Array> = [];

    for await (const chunk of helia_fs.cat(cid)) {
        chunks.push(chunk);
        size += chunk.length;
    }

    return Buffer.concat(chunks, size);
}

export{uploadFile, downloadFile, bufferToCID}

