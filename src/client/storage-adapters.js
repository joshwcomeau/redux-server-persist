import { isLocalStorageAvailable } from '../utils/feature-detect'

export function localStorageAdapter(
  serialize = JSON.stringify,
  deserialize = JSON.parse
) {
  // if (!isLocalStorageAvailable()) {
  //   return;
  // }

  const storeKeyPrefix = 'redux-server-persist-stores';

  return {
    setItem(key, value) {
      // While localStorage is synchronous, let's assume async storage methods
      // so that we can treat them all equally.
      return new Promise((resolve, reject) => {
        try {
          const fullStoreKey = `${storeKeyPrefix}-${key}`;
          localStorage.setItem(fullStoreKey, serialize(value));
          resolve(value);
        } catch (e) {
          reject(e);
        }
      });
    },
    getItem(key) {
      return new Promise((resolve, reject) => {
        try {
          const fullStoreKey = `${storeKeyPrefix}-${key}`;
          const value = localStorage.getItem(fullStoreKey);
          resolve(value ? deserialize(value) : value);
        } catch (e) {
          reject(e);
        }
      });
    },
  };
}
