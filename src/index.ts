import WebSocket from "ws"

const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

ws.on("open", ()=>{
    console.log("Binance WebSocket connected");
});

ws.on("message", (data)=>{
    const message = JSON.parse(data.toString());

    console.log(message.p);
});

ws.on("error", (error)=>{
    console.error("WebSocket Error:", error);
});

ws.on("close", () =>{
    console.log("WebSocket Close");
});