import { LOGIN, LOGOUT } from '../actions/actionTypes';

// Helper function to get the user from local storage
const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Helper function to save the user to local storage
const saveUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Helper function to clear the user from local storage
const clearUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

const initialState = {
  user: getUserFromLocalStorage(), // Initialize state from local storage
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const newUser = action.payload;
      saveUserToLocalStorage(newUser); // Save user to local storage
      return { ...state, user: newUser };
    case LOGOUT:
      clearUserFromLocalStorage(); // Clear user from local storage
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
