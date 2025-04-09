const { faker } = require('@faker-js/faker');


function generateHL7() {
  const id = faker.datatype.uuid();
  const lastName = faker.name.lastName();
  const firstName = faker.name.firstName();
  const dob = faker.date.past(50).toISOString().split('T')[0].replace(/-/g, '');
  const gender = faker.name.gender().startsWith('M') ? 'M' : 'F';

  const message = 
    '\x0b' +
    `MSH|^~\\&|SendingApp|SendingFac|ReceivingApp|ReceivingFac|${new Date().toISOString()}||ADT^A01|${id}|P|2.3\r` +
    `PID|1||${id}||${lastName}^${firstName}||${dob}|${gender}|||\r` +
    '\x1c\r' + '\x0d';

  return message;
}

module.exports = generateHL7;
