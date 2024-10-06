import { Dispatch } from 'redux';
import { _getUsers } from '../utils/_DATA';
import { User } from '../types/user';

// Action Types
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action Creators
const receiveUsers = (users: { [key: string]: User }) => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const loginUser = (user: User) => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

// Async Action Creators
export const handleReceiveUsers = () => {
  return (dispatch: Dispatch) => {
    return _getUsers()
      .then((users: { [key: string]: User }) => {
        dispatch(receiveUsers(users));
      })
      .catch((e) => {
        console.warn('Error in handleReceiveUsers: ', e);
        alert('There was an error receiving the users. Try again.');
      });
  };
};
