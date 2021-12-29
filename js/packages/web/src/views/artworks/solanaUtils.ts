/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

//import os from 'os'
//import fs from 'mz/fs'
//import path from 'path'
import yaml from 'yaml';
import { Keypair, Connection } from '@solana/web3.js';

export async function newAccountWithLamports(
  connection: Connection,
  lamports = 1000000,
): Promise<Keypair> {
  const keypair = Keypair.generate();
  const signature = await connection.requestAirdrop(
    keypair.publicKey,
    lamports,
  );
  await connection.confirmTransaction(signature);
  return keypair;
}

/**
 * @private
 */
function getConfig() {
  // Path to Solana CLI config file
  //const CONFIG_FILE_PATH = path.resolve(
  //  os.homedir(),
  //  '.config',
  //  'solana',
  //  'cli',
  //  'config.yml',
  //)
  //const configYml = await fs.readFile(CONFIG_FILE_PATH, { encoding: 'utf8' })
  const configYml =
    '---\n' +
    'json_rpc_url: "https://api.devnet.solana.com"\n' +
    'websocket_url: ""\n' +
    'keypair_path: ../../id.json\n' +
    'address_labels:\n' +
    '"11111111111111111111111111111111": System Program\n' +
    'commitment: confirmed;';

  return yaml.parse(configYml);
}

/**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
export function getRpcUrl(): string {
  try {
    const config = getConfig();
    if (!config.json_rpc_url) throw new Error('Missing RPC URL');
    return config.json_rpc_url;
  } catch (err) {
    console.warn(
      'Failed to read RPC url from CLI config file, falling back to localhost',
    );
    return 'http://localhost:8899';
  }
}

/**
 * Load and parse the Solana CLI config file to determine which payer to use
 */
export function getPayer(): Keypair {
  try {
    return createKeypairFromFile('../../id.json');
    //const config = await getConfig()
    //if (!config.keypair_path) throw new Error('Missing keypair path')
    //return createKeypairFromFile(config.keypair_path)
  } catch (err) {
    console.warn(
      'Failed to create keypair from CLI config file, falling back to new random keypair',
    );
    return Keypair.generate();
  }
}

/**
 * Create a Keypair from a secret key stored in file as bytes' array
 * UPDATE: We switched to using env variables stored in .env.local.
 * The first, NEXT_PUBLIC_ID_JSON is the string from the id.json file.
 * The second, NEXT_PUBLIC_KEYPAIR_JSON is the string from the keypair file
 * Chainlink_Solana_Demo-Keypair.json.
 */
export function createKeypairFromFile(filePath: string): Keypair {
  let secretKeyString: string;
  //console.log('FilePath: ' + filePath);
  if (filePath.endsWith('id.json')) {
    // ugly, but it's a test environment
    secretKeyString = process.env.NEXT_PUBLIC_ID_JSON as string;
    // Testing
    //REACT_APP_STORE_OWNER_ADDRESS_ADDRESS=HptNLWvtVEucXHZUtcTSUDLGhuMWi16jyKf6cUY4gWPY
    //const env_value = process.env.NEXT_PUBLIC_ID_JSON;
    console.log('NEXT_PUBLIC_ID_JSON: ' + secretKeyString);
    // End Testing
    //'[213,7,227,142,54,77,93,145,189,47,96,251,249,57,228,11,113,223,51,223,128,70,51,255,6,152,69,40,215,28,145,169,255,26,102,134,11,255,193,194,90,193,123,101,123,109,147,48,141,151,70,191,136,251,235,15,140,10,188,136,85,208,127,226]';
  } else {
    // chainlink-solana-demo.keypair.json
    // Also ugly, but it's still a test environment
    secretKeyString = process.env.NEXT_PUBLIC_KEYPAIR_JSON as string;
    console.log('NEXT_PUBLIC_KEYPAIR_JSON: ' + secretKeyString);
    //'[237,111,142,184,100,203,42,104,154,129,104,85,208,191,250,27,100,215,130,210,172,94,176,242,67,217,153,124,127,58,181,161,155,105,221,191,105,21,147,165,204,66,191,227,15,146,171,183,100,64,180,71,83,141,89,118,127,1,236,75,68,215,110,146]';
  }
  //const secretKeyString = await fs.readFile(filePath, { encoding: 'utf8' })
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}
