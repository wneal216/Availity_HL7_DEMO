const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

describe('FHIR Patient Posts', () => {
  it('should return patients with expected structure', async () => {
    const res = await axios.get('http://localhost:3001/Patient');
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an('array');
    if (res.data.length) {
      const patient = res.data[res.data.length - 1];
      expect(patient).to.have.property('resourceType', 'Patient');
      expect(patient).to.have.property('gender');
      expect(patient).to.have.property('birthDate');
    }
  });
});

/**
 * This script is a Mocha + Chai test to verify FHIR Patient data.
 * 
 * It makes a GET request to the local FHIR mock API (`localhost:3001/Patient`)
 * and checks:
 * - The response status is 200 (OK)
 * - The data returned is an array
 * - The last patient object includes expected FHIR fields like:
 *   - resourceType: "Patient"
 *   - gender
 *   - birthDate
 * 
 * This ensures that the Mirth ➝ FHIR transformation is producing valid output.
 */
