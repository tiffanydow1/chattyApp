// server.js

const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

numberOfUsers = () => {
  let onlineUser = {
    type: 'onlineUsers',
    users: wss.clients.size
  };
  let userData = JSON.stringify(onlineUser);
  wss.clients.forEach(function each(client) {
  if (client.readyState === SocketServer.OPEN) {
    client.send(userData);
    }
  });
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  numberOfUsers();

  ws.on('message', function(event) {
    let msg = JSON.parse(event);
    console.log('User ' + msg.username + " " + 'says ' + msg.content);
    msg.id = uuid();
console.log("weuhf", msg.type);
    switch(msg.type) {
      case "postNotification":
        msg.type = "incomingNotification";
        break;
      case "postMessage":
        msg.type = "incomingMessage";
        break;
      default:
    }

    let messageString = JSON.stringify(msg);
    let numberOfUsers = wss.clients.size;
    console.log(messageString);
    wss.clients.forEach(function each(client) {
      if(client.readyState === SocketServer.OPEN) {
        client.send(messageString);
      }
    });


    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
  });
});