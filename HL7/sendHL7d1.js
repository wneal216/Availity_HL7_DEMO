const net = require('net');

const HL7_MSG =
  '\x0b' + // MLLP start block
  'MSH|^~\\&|SendingApp|SendingFac|ReceivingApp|ReceivingFac|20250406||ADT^A01|MSG00001|P|2.3\r' +
  'PID|1||123456||Doe^John||19800101|M|||\r' +
  '\x1c\r' + // MLLP end block
  '\x0d';    // Carriage return

const client = new net.Socket();

client.connect(6661, '127.0.0.1', function () {
  console.log('Connected to Mirth. Sending HL7...');
  client.write(HL7_MSG);
  client.end();
});

client.on('error', function(err) {
  console.error('Connection error:', err.message);
});
