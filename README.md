Redux Server Persist
====================

Two modules in one: Packaged as two minified bundles (when the time comes).
Make a demo with https://hyperdev.com/?

// TODO:
- Some kind of throttling (specify which actions do/don't send to the server?)
  We can make it so it only pushes if a slice of the state that needs to be
  persisted has been modified, but that may not be good enough.
- Deal with browsers with no localStorage

API

`persistState` (client, store enhancer)
- include/exclude webpack style for deciding which parts of the state need to be persisted.
- URL/port of the back-end.
- in localStorage, we may store several different storeKeys; one store under each key.
  {
    'redux-server-persist-store-abc': <stringified JSON>,
    'redux-server-persist-store-def': <other store's JSON>
  }


`hydrateFromServer` (client, action creator)
- Makes a request to replace the local state with that of the server.
- requires a storeId if none is currently set.




`listenForReduxRequests` (server, Express middleware)
- The only server component needed.
- Accepts DB config info (look into this!). Stores and retrieves store by
  the given storeId.
