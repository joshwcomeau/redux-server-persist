/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';

import createEnhancedStore from '../utils/create-enhanced-store';
import persistState from '../../src/client/persist-state';


let store;

describe('persistState', () => {
  describe('invisibility to the redux app', () => {
    it('creates a regular Redux store', () => {
      store = createEnhancedStore();

      expect(store).to.include.keys(['getState', 'dispatch']);
    });
  });
});
