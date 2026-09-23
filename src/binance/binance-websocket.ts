import WebSocket from 'ws'
import type { BinanceTradeMessage } from '../types/binance-trade-message.js';
import { getPrice, setPrice } from '../price/price-store.js';

export const connectBinanceTrade = (symbol: string) => {
    const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
    );

    ws.on(`open`, () => {
        console.log(`${symbol} Binance WebSocket connected`);
    });

    ws.on(`message`, (data) => {
        const message: BinanceTradeMessage = JSON.parse(data.toString());

        setPrice(message.s, message.p);
    });

    setInterval(() => {
        const price = getPrice(symbol);

        if (price !== undefined) {
            console.log(`${symbol.toUpperCase()} : ${price}`)
        }
    }, 10000);

    ws.on(`error`, (error) => {
        console.error(`${symbol} WebSocket Error:`, error);
    });

    ws.on(`close`, () => {
        console.log(`${symbol} WebSocket Close`);
    });
};