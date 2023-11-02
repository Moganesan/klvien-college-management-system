import axios from "axios";
import firebase from "../config/db";
import { userActionTypes } from "../constants/actionTypes";
import { SET_USER, UnauthorizeUser } from "../actions/userActions";
import { API } from "../constants/api";
import { GetLatestLogins } from "../reducers/serverReducer";
import {
  SetLoadinTrue,
  SetLoadingFalse,
  SetErrorMessage,
  SetSuccessMessage,
  CloseGoogleConnectModal,
  SetRocketLoadingTrue,
  SetRocketLoadingFalse,
} from "../actions/uiActions";
const initialstate = {
  auth: false,
  user: {},
};

const AthenticateUser = (email, password) => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.getIdToken().then((idToken) => {
        axios({
          method: "POST",
          url: `${API}/staff/login`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          data: {
            email: email,
            password: password,
          },
        })
          .then(async (res) => {
            console.log(res.data);
            if (res.data.status === 403) {
              dispatch(SET_USER(res.data.data));
              dispatch(SetLoadingFalse());
              return firebase.auth().signOut();
            }
            dispatch(await SET_USER(res.data.data));
            dispatch(SetLoadingFalse());
            firebase.auth().signOut();
            return window.location.replace("/");
          })
          .catch((err) => {
            dispatch(SetLoadingFalse());
            return dispatch(SetErrorMessage(err));
          });
      });
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      return dispatch(SetErrorMessage(err));
    });
};

const ConnectGoogle = (email, password) => async (dispatch, getstate) => {
  dispatch(SetRocketLoadingTrue());
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      user
        .linkWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          dispatch(SetRocketLoadingFalse());
          dispatch(CloseGoogleConnectModal());
          dispatch(SetSuccessMessage(res));
          return firebase.auth().signOut();
        })
        .catch((err) => {
          dispatch(SetRocketLoadingFalse());
          return dispatch(SetErrorMessage(err));
        });
    })
    .catch((err) => {
      dispatch(SetRocketLoadingFalse());
      return dispatch(SetErrorMessage(err));
    });
};

const GoogleAuth = () => async (dispatch, getstate) => {
  await firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(({ user }) => {
      axios({
        method: "POST",
        url: `${API}/student/googleLogin`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          email: user.email,
        },
      })
        .then(async (res) => {
          dispatch(await SET_USER(res.data.data));
          dispatch(SetLoadingFalse());
          return window.location.replace("/");
        })
        .then(() => firebase.auth().signOut())
        .catch((err) => {
          dispatch(SetLoadingFalse());
          if (err.response.status === 403) {
            return dispatch(
              SetErrorMessage({ code: 403, message: "account not linked!" })
            );
          }
          if (err.response.status === 404) {
            return dispatch(
              SetErrorMessage({
                code: 403,
                message: "student not found please contact your faculty",
              })
            );
          }
          firebase.auth().signOut();
          return dispatch(SetErrorMessage(err));
        });
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      return dispatch(SetErrorMessage(err));
    });
};

const setUser = (state = initialstate, action) => {
  switch (action.type) {
    case userActionTypes.AUTHENTICATE_USER:
      return {
        ...state,
        auth: true,
        user: action.payload,
      };

    case userActionTypes.UNAUTHORIZE_USER:
      return {
        ...state,
        auth: false,
        user: {},
      };
    default:
      return state;
  }
};

const VerifyUser = () => async (dispatch, getstate) => {
  await axios
    .get(`${API}/staff/verify`)
    .then((res) => {
      if (res.data.status === 401) {
        console.log(res.data);
      }
      dispatch(SET_USER(res.data.data));
      dispatch(GetLatestLogins());
    })
    .catch((err) => {
      return dispatch(UnauthorizeUser());
    });
};

const Logout = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  await axios
    .get(`${API}/student/signout`)
    .then((res) => {
      if (res.data.status === 401) {
        console.log(res.data);
      }
      dispatch(UnauthorizeUser());
      window.history.replaceState("/login");
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => {
      SetErrorMessage(err);
      return dispatch(SetLoadingFalse());
    });
};

export {
  AthenticateUser,
  ConnectGoogle,
  GoogleAuth,
  setUser,
  VerifyUser,
  Logout,
};
