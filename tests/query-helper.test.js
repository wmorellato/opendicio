const sinon = require('sinon');
const manager = require('../src/dict/query-helper');
const { expect } = require('chai');
const { bananaEntry } = require('./fixtures/db');
const { stub } = require('sinon');

describe('word meanings', () => {
  const sandbox = sinon.createSandbox();

  before(() => {
    manager.providers.forEach((p) => {
      stub(p.model, 'find').callsFake((q, c) => {
        if (c === 'synonyms -_id') {
          return [
            { synonyms: ['moranguinho', 'morangão'] },
          ];
        }
        return [bananaEntry];
      });
    });
  });

  after(() => {
    manager.providers.forEach((p) => {
      p.model.find.restore();
    });
  });

  beforeEach(() => {
    sandbox.spy(manager);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should initialize dict providers', async () => {
    expect(manager.providers[0].name).to.be.equal('aurelio');
    expect(manager.providers[0].collection).to.be.equal('aurelio-dict');
    expect(manager.providers[1].name).to.be.equal('houaiss');
    expect(manager.providers[1].collection).to.be.equal('houaiss-dict');
  });

  it('should query meaning providers', async () => {
    const results = await manager.findMeaning('banana');

    expect(results.data.aurelio[0]).to.be.equal(bananaEntry);
    expect(results.data.houaiss[0]).to.be.equal(bananaEntry);
  });

  it('should query synonyms providers', async () => {
    const syns = await manager.findSynonyms('morango');
    expect(syns).to.be.eql({
      total: 4,
      dicts: ['aurelio', 'houaiss'],
      data: {
        houaiss: ['moranguinho', 'morangão'],
        aurelio: ['moranguinho', 'morangão'],
      },
    });
  });
});
