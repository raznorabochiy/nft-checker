import fs from "fs/promises";
import {Contract, JsonRpcProvider} from "ethers";

const RPC_URL = "https://scroll.drpc.org";
const NFT_CONTRACT_ADDRESS = "0x74670A3998d9d6622E32D0847fF5977c37E0eC91";
const DELAY = 100;
const ADDRESSES_FILE_NAME = 'addresses.txt';
const ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function name() view returns (string)',
];

async function loadFromFile(fileName: string) {
    const file = await fs.readFile(fileName, { encoding: "utf-8"});

    return file.split("\n").map(item=> item.trim()).filter(Boolean);
}

async function delay(ms: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

const provider = new JsonRpcProvider(RPC_URL);
const addresses = await loadFromFile(ADDRESSES_FILE_NAME);
const contract  = new Contract(NFT_CONTRACT_ADDRESS, ABI, provider);

for (const address of addresses) {
    const balance = await contract.balanceOf(address);
    console.log(`${address}: ${balance}`);
    await delay(DELAY);
}
