const app = require('../src/app');
const request = require('supertest');
const { expect } = require('chai');
const { setupDatabase } = require('./fixtures/db');

const BASE_URI = '/api/v1';

describe('word meanings', () => {
  before(async () => {
    await setupDatabase();
  });

  it('should retrieve meaning', async () => {
    const response = await request(app)
        .get(`${BASE_URI}/mean/banana`)
        .send()
        .expect(200);

    expect(response.body.data.houaiss[0].head).to.be.equal('banana');
    expect(response.body.data.aurelio[0].head).to.be.equal('banana');
  });

  it('should return 404 for missing word', async () => {
    const response = await request(app)
        .get(`${BASE_URI}/mean/foobar`)
        .send()
        .expect(404);

    expect(response.body.message).to.be.equal('Requested word "foobar" not found');
  });
});
