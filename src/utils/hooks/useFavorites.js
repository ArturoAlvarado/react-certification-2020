import { useReducer } from 'react';
import { storage } from '../storage';

const useFavorites = () => {
  function reducer(state, action) {
    let favs = new Set(state);
    switch (action.type) {
      case 'add':
        favs.add(`${action.payload}`);
        break;
      case 'remove':
        favs.delete(`${action.payload}`);
        break;
      case 'init':
        console.log(action.payload);
        favs = new Set(action.payload);
        break;
      default:
        console.error('invalid action type');
        break;
    }
    if (favs.size) {
      storage.set('FAVS', [...favs]);
    } else {
      storage.remove('FAVS');
    }
    return favs;
  }
  const initialState = new Set();
  return useReducer(reducer, initialState);
};

export default useFavorites;
