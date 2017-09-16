import storage from 'services/storage';

const storageKey = 'USER';
const initialState = { username: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'setUser':
      storage.setItem(storageKey, action.payload);
      return action.payload;
    case 'logout':
      storage.removeItem(storageKey);
      return {};
    default:
      return state;
  }
};
