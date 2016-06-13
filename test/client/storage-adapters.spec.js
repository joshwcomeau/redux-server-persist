/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';

import { localStorageAdapter } from '../../src/client/storage-adapters';


describe('storageAdapters', () => {
  describe('localStorage', () => {
    const deviceStorage = localStorageAdapter();

    it('sets an item asynchronously', () => (
      expect(deviceStorage.setItem('hi', 5)).to.eventually.equal(5)
    ));

    it('retrieves an item asynchronously', () => (
      expect(deviceStorage.getItem('hi')).to.eventually.equal(5)
    ));

    it('abstracts away the serializing/deserializing', done => {
      const randomObject = { hi: 5 };

      deviceStorage.setItem('random', randomObject)
        .then(() => deviceStorage.getItem('random'))
        .then(getValue => {
          // We know it's been serialized because the reference isn't the same
          // while the value is.
          expect(getValue).to.not.equal(randomObject);
          expect(getValue).to.deep.equal(randomObject);

          done();
        });
    });

    it('returns `null` when trying to get an undefined value', () => (
      expect(deviceStorage.getItem(undefined)).to.eventually.equal(null)
    ));

    it('returns `undefined` when trying to get a nonexistent value', () => (
      expect(deviceStorage.getItem('yahoo')).to.eventually.equal(null)
    ));
  });
});
