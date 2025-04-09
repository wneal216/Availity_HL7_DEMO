const cron = require('node-cron');
const net = require('net');
const generateHL7 = require('./generateHL7');

function sendHL7(message) {
  const client = new net.Socket();
  client.connect(6661, '127.0.0.1', () => {
    client.write(message);
    client.end();
  });
  client.on('error', (err) => console.error('Connection error:', err.message));
}

cron.schedule('*/1 * * * *', () => {
  console.log('Sending HL7 message...');
  const message = generateHL7();
  sendHL7(message);
});
