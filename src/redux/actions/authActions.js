import { LOGIN, LOGOUT } from '../actions/actionTypes';
import { auth } from '../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { provider } from '../../config/firebaseConfig';

export const login = (user) => ({
  type: LOGIN,
  payload: user
});

export const logout = () => async (dispatch) => {
  await auth.signOut();
  dispatch({ type: LOGOUT });
};

export const signIn = () => async (dispatch) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    dispatch(login({
      userName: user.displayName,
      profilePic: user.photoURL,
      id: user.uid,
    }));
  } catch (err) {
    console.error('Error signing in: ', err);
  }
};
