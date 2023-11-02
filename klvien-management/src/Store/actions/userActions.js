import { userActionTypes } from "../constants/actionTypes";

const SET_USER = (payload) => ({
  type: userActionTypes.AUTHENTICATE_USER,
  payload: payload,
});

const UnauthorizeUser = () => ({
  type: userActionTypes.UNAUTHORIZE_USER,
});

export { SET_USER, UnauthorizeUser };
