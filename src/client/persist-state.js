import { localStorageAdapter } from './storage-adapters';

export default function persistState(config) {
  let storeKey = { config };

  // TODO: Other options!
  const deviceStorage = localStorageAdapter();

  return next => (reducer, initialState, enhancer) => {
    // If we've been given a storeKey in the config, let's see if we have any
    // local state. If we haven't been given a key, `persistedState` will be
    // null.
    deviceStorage.getItem(storeKey).then(persistedState => {
      const store = next(reducer, persistedState, enhancer);

      // Subscribe to every store change, write it in localStorage
      store.subscribe(() => {
        if (storeKey) {
          // TODO: Allow for partial slices of the state to be saved.

          deviceStorage.setItem(storeKey, store.getState());
        }
      });

      return {
        ...store,
        dispatch({ type, key }) {
          // eslint-disable-next-line default-case
          switch (type) {
            case 'INIT': {
              if (config.storeKey) {
                const locallyStoredState = getStoreFromKey(config.storeKey);
              }
              break;
            }
            case 'HYDRATE_FROM_SERVER': {
              // We want to listen for a very specific action: HYDRATE_FROM_SERVER.
              // This action tells us that we want to sync with the server, and it
              // gives us the user-specified storeKey.

              storeKey = key;
              break;
            }
          }

          // TODO: Pull from server
        },
      };
    });
  };
}
