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
