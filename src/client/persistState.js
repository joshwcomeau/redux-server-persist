import compose from '../utils/compose';

export default function persistState(config) {
  let storeKey = { config };

  return next => (reducer, initialState, enhancer) => {
    // The idea here is, we can pass in an optional storeKey in the config,
    // but otherwise, we don't do any fancy storage stuff right away.
    //
    // Once we receive a storeKey, we can persist the state locally,
    // and then update it on every store update.
    if (config.storeKey) {
      const locallyStoredState = getStoreFromKey(config.storeKey);
    }

    const store = next(reducer, locallyStoredState, enhancer);

    // Subscribe to every store change, write it in localStorage
    store.subscribe(() => {
      if (storeKey) {
        // TODO: Allow for partial slices of the state to be saved.

        updateStoreByKey(storeKey, store.getState());
      }
    })

    return {
      ...store,
      dispatch({ type, key }) {
        // We want to listen for a very specific action: HYDRATE_FROM_SERVER.
        // This action tells us that we want to sync with the server, and it
        // gives us the user-specified storeKey.
        if (type === 'HYDRATE_FROM_SERVER') {
          storeKey = key;
        }

        // TODO: Pull from server
      }
    }
  }
}

function getFullStoreKey(storeKey) {
  return `redux-server-persist-stores-${storeKey}`;
}

function updateStoreByKey(storeKey, state) {
  const fullStoreKey = getFullStoreKey(storeKey);

  localStorage.setItem(fullStoreKey, JSON.stringify(state))
}

const getStoreFromKey = compose(
  JSON.parse,
  localStorage.getItem,
  getFullStoreKey
);

function getStoreFromKey(storeKey) {
  // TODO: Other adapters (IndexedDB?)

  try {
    return JSON.parse(localStorage.getItem(getFullStoreKey(storeKey)));
  } catch (e) {
    console.error("Trouble getting store!", key)
  }
}
