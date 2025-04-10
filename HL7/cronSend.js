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

/**
 * This script uses `node-cron` to automatically send HL7 messages to Mirth every minute.
 * 
 * It does the following:
 * - Uses the `generateHL7` function to create a randomized HL7 message
 * - Opens a TCP connection to Mirth Connect (on port 6661)
 * - Sends the message using MLLP framing (start/end characters)
 * 
 * This mimics a live feed of patient data coming in on a schedule.
 */
