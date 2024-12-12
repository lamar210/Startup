const WebSocket = require('ws');
const uuid = require('uuid');

const wss = new WebSocket.Server({ port: 4000 });

let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: uuid.v4(), alive: true, ws: ws };
  connections.push(connection);

  ws.on('message', (message) => {
    console.log('Received message:', message);

    const data = JSON.parse(message);

    if (data.type === 'moodUpdated') {
      console.log('Mood update received!');

      const notification = "Others have shared their moods and is now reflected in the charts! Go check it out.";
      connections.forEach((client) => {
        if (client.id !== connection.id && client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(notification);
        }
      });
    } else {
    }
  });

  ws.on('close', () => {
    connections = connections.filter((client) => client.id !== connection.id);
  });

  ws.on('pong', () => {
    connection.alive = true;
  });
});

setInterval(() => {
  connections.forEach((client) => {
    if (!client.alive) {
      client.ws.terminate();
    } else {
      client.alive = false;
      client.ws.ping();
    }
  });
}, 10000);

console.log('WebSocket server is running on ws://localhost:4000');