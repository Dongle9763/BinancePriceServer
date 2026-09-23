import WebSocket from 'ws'

export const connectBinanceTrade = (symbol: string) => {
    const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`
    );

    let lastPrice: string | undefined;

    ws.on(`open`, () => {
        console.log(`${symbol} Binance WebSocket connected`);
    });

    ws.on(`message`, (data) => {
        const message = JSON.parse(data.toString());

        lastPrice = message.p;
    });

    setInterval(() => {
        if(lastPrice !== undefined){
            console.log(`${symbol.toUpperCase()} : ${lastPrice}`)
        }
    }, 1000);

    ws.on(`error`, (error) => {
        console.error(`${symbol} WebSocket Error:`, error);
    });

    ws.on(`close`, () => {
        console.log(`${symbol} WebSocket Close`);
    });
};