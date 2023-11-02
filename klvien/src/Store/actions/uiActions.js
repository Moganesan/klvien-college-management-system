import { UIActionTypes } from "../constants/actionTypes";

const OpenMenu = () => ({ type: UIActionTypes.OPEN_MENU });
const CloseMenu = () => ({ type: UIActionTypes.CLOSE_MENU });

const OpenNotification = () => ({
  type: UIActionTypes.OPEN_NOTIFICATION,
});

const CloseNotification = () => ({
  type: UIActionTypes.CLOSE_NOTIFICATION,
});

const OpenProfileModal = () => ({
  type: UIActionTypes.OPEN_PROFILEMODAL,
});
const CloseProfileModal = () => ({
  type: UIActionTypes.CLOSE_PROFILEMODAL,
});

const OpenFeedbackModal = () => ({
  type: UIActionTypes.OPEN_FEEDBACKMODAL,
});
const CloseFeedbackModal = () => ({
  type: UIActionTypes.CLOSE_FEEDBACKMODAL,
});

const OpenUploadModal = (payload, target) => ({
  type: UIActionTypes.OPEN_UPLOAD_MODAL,
  payload: payload,
  target: target,
});

const CloseUploadModal = () => ({
  type: UIActionTypes.CLOSE_UPLOAD_MODAL,
});

const OpenGoogleConnectModal = () => ({
  type: UIActionTypes.OPEN_GOOGLE_MODAL,
});

const CloseGoogleConnectModal = () => ({
  type: UIActionTypes.CLOSE_GOOGLE_MODAL,
});

const SetLoadinTrue = () => ({
  type: UIActionTypes.SET_LOADING_TRUE,
});

const SetLoadingFalse = () => ({
  type: UIActionTypes.SET_LOADING_FALSE,
});

const SetRocketLoadingTrue = () => ({
  type: UIActionTypes.SET_ROCKET_LOADING_TRUE,
});

const SetRocketLoadingFalse = () => ({
  type: UIActionTypes.SET_ROCKET_LOADING_FALSE,
});

const SetErrorMessage = (payload) => ({
  type: UIActionTypes.SET_ERROR_MESSAGE,
  payload: payload,
});

const SetWarningMessage = (payload) => ({
  type: UIActionTypes.SET_WARNING_MESSAGE,
  payload: payload,
});

const SetInfoMessage = (payload) => ({
  type: UIActionTypes.SET_INFO_MESSAGE,
  payload: payload,
});

const SetSuccessMessage = (payload) => ({
  type: UIActionTypes.SET_SUCCESS_MESSAGE,
  payload: payload,
});

export {
  OpenMenu,
  CloseMenu,
  OpenNotification,
  CloseNotification,
  OpenProfileModal,
  CloseProfileModal,
  OpenFeedbackModal,
  CloseFeedbackModal,
  OpenUploadModal,
  CloseUploadModal,
  OpenGoogleConnectModal,
  CloseGoogleConnectModal,
  SetLoadinTrue,
  SetLoadingFalse,
  SetRocketLoadingTrue,
  SetRocketLoadingFalse,
  SetErrorMessage,
  SetWarningMessage,
  SetInfoMessage,
  SetSuccessMessage,
};
