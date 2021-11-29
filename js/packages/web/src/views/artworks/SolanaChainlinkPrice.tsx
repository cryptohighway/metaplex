import { useEffect, useState } from 'react';
import { getSOLPriceViaChainLink } from './solanaPrice';
/*    
import {
    establishConnection,
    checkProgram,
    establishPayer,
    reportPrice,
    getPrice
  } from './solanaPrice';
*/

//
// Get the price of SOLANA using Chainlink.  
// This function is expected to be called just once.
//
export function getSolanaChainlinkPrice(): string {
    const [solPrice, setSolPrice] = useState<any>(null);

    useEffect(() => {
        const fetchSolanaPrice = async () => {
            // get the price from Chainlink
            const solPrice = await getSOLPriceViaChainLink();
            setSolPrice(solPrice);
        }

        fetchSolanaPrice();

    }, []);

    return solPrice;

}