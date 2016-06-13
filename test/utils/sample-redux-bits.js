/*
  This sample app is a simple list of strings, held under an 'items' key.
  {
    items: ['abc', 'def', 'ghi']
  }
  Items can be added or removed.
*/

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      state.items = [...state.items, action.item]
      return state;

    case 'REMOVE_ITEM':
      const itemIndex = state.items.indexOf(action.item);
      state.items = [
        ...state.items.slice(0, itemIndex),
        ...state.items.slice(itemIndex + 1)
      ];
      return state;

    default:
      return state;
  }
}

export const addItem = item => ({
  type: ADD_ITEM,
  item,
});

export const removeItem = item => ({
  type: REMOVE_ITEM,
  item,
});
