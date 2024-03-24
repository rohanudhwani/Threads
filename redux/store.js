import { createStore, combineReducers } from 'redux';

// Define reducers
const ipAddressReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_IP':
      return action.payload;
    default:
      return state;
  }
};


// Combine reducers
const rootReducer = combineReducers({
  ipAddress: ipAddressReducer,
});

// Create Redux store
const store = createStore(rootReducer);

export default store;