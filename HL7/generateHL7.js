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

/**
 * This module generates a randomized HL7 ADT^A01 message using fake patient data.
 * 
 * It uses the `@faker-js/faker` library to create:
 * - A UUID for patient ID
 * - Random first and last name
 * - A random date of birth (formatted as YYYYMMDD)
 * - A gender (M or F)
 * 
 * Then it builds the message in standard HL7 format, wrapped in MLLP
 * start and end characters, and returns the full message string. 
 * I can also use this to build out other HL7 message types like ORI or MDM.
 */