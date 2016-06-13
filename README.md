Redux Server Persist
====================

Two modules in one: Packaged as two minified bundles (when the time comes).
Make a demo with https://hyperdev.com/?

// TODO:
- Some kind of throttling (specify which actions do/don't send to the server?)
  We can make it so it only pushes if a slice of the state that needs to be
  persisted has been modified, but that may not be good enough.


API

`persistState` (client, store enhancer)
- include/exclude webpack style for deciding which parts of the state need to be persisted.
- URL/port of the back-end.
- localStorage key (have some obscure default).
  It will use this key to check to see what's in LocalStorage.
  This way, it'll know right away if the server fetch is required.
  The data will be serialized like:
    {
      store: {},
      storeKey: 'abcd1234' (user-specified unique ID)
    }


`hydrateFromServer` (client, action creator)
- Makes a request to replace the local state with that of the server.
- requires a storeId if none is currently set.




`listenForReduxRequests` (server, Express middleware)
- The only server component needed.
- Accepts DB config info (look into this!). Stores and retrieves store by
  the given storeId.
