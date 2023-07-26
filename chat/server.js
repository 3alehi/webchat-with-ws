const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    console.log("Received message:", parsedMessage);
    // ارسال پیام به همه کلاینت‌ها به جز خود کلاینت فرستنده
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log("WebSocket connection closed.");
  });

  ws.on('error', (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log('WebSocket server listening on port 8080.');
