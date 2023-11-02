import { UIActionTypes } from "../constants/actionTypes";
import { ServerActionTypes } from "../constants/actionTypes";

const MenuReducer = (state = UIActionTypes.CLOSE_MENU, action) => {
  switch (action.type) {
    case UIActionTypes.OPEN_MENU:
      return (state = UIActionTypes.OPEN_MENU);
    case UIActionTypes.CLOSE_MENU:
      return (state = UIActionTypes.CLOSE_MENU);
    default:
      return state;
  }
};

const NotificationReducer = (
  state = UIActionTypes.CLOSE_NOTIFICATION,
  action
) => {
  switch (action.type) {
    case UIActionTypes.OPEN_NOTIFICATION:
      return (state = UIActionTypes.OPEN_NOTIFICATION);
    case UIActionTypes.CLOSE_NOTIFICATION:
      return (state = UIActionTypes.CLOSE_NOTIFICATION);
    default:
      return state;
  }
};

const ProfileModalReducer = (
  state = UIActionTypes.CLOSE_PROFILEMODAL,
  action
) => {
  switch (action.type) {
    case UIActionTypes.OPEN_PROFILEMODAL:
      return (state = UIActionTypes.OPEN_PROFILEMODAL);
    case UIActionTypes.CLOSE_PROFILEMODAL:
      return (state = UIActionTypes.CLOSE_PROFILEMODAL);
    default:
      return state;
  }
};

const FeedbackModalReducer = (
  state = UIActionTypes.CLOSE_FEEDBACKMODAL,
  action
) => {
  switch (action.type) {
    case UIActionTypes.OPEN_FEEDBACKMODAL:
      return (state = UIActionTypes.OPEN_FEEDBACKMODAL);
    case UIActionTypes.CLOSE_FEEDBACKMODAL:
      return (state = UIActionTypes.CLOSE_FEEDBACKMODAL);
    default:
      return state;
  }
};

const UpdateStudentDetailsReducer = (
  state = UIActionTypes.CLOSE_UPDATE_STUDENT_DETAILS_MODAL,
  action
) => {
  switch (action.type) {
    case UIActionTypes.OPEN_UPDATE_STUDENT_DETAILS_MODAL:
      return (state = UIActionTypes.OPEN_UPDATE_STUDENT_DETAILS_MODAL);
    case UIActionTypes.CLOSE_UPDATE_STUDENT_DETAILS_MODAL:
      return (state = UIActionTypes.CLOSE_UPDATE_STUDENT_DETAILS_MODAL);
    default:
      return state;
  }
};

const UploadModalReducer = (
  state = { status: UIActionTypes.CLOSE_UPLOAD_MODAL, target: "", data: [] },
  action
) => {
  switch (action.type) {
    case UIActionTypes.OPEN_UPLOAD_MODAL:
      switch (action.target) {
        case ServerActionTypes.UPLOAD_ASSIGNMENT:
          return {
            status: UIActionTypes.OPEN_UPLOAD_MODAL,
            target: ServerActionTypes.UPLOAD_ASSIGNMENT,
            data: action.payload,
          };
        case ServerActionTypes.UPLOAD_EXAM:
          return {
            status: UIActionTypes.OPEN_UPLOAD_MODAL,
            target: ServerActionTypes.UPLOAD_EXAM,
            data: action.payload,
          };
        default:
          return state;
      }

    case UIActionTypes.CLOSE_UPLOAD_MODAL:
      return { status: UIActionTypes.CLOSE_UPLOAD_MODAL, data: [] };
    default:
      return state;
  }
};

const ConnectGoogleModalReducer = (
  state = UIActionTypes.CLOSE_GOOGLE_MODAL,
  action
) => {
  switch (action.type) {
    case UIActionTypes.OPEN_GOOGLE_MODAL:
      return (state = UIActionTypes.OPEN_GOOGLE_MODAL);
    case UIActionTypes.CLOSE_GOOGLE_MODAL:
      return (state = UIActionTypes.CLOSE_GOOGLE_MODAL);
    default:
      return state;
  }
};

const LoadingReducer = (state = false, action) => {
  switch (action.type) {
    case UIActionTypes.SET_LOADING_TRUE:
      return (state = true);
    case UIActionTypes.SET_LOADING_FALSE:
      return (state = false);
    default:
      return state;
  }
};

const RocketLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case UIActionTypes.SET_ROCKET_LOADING_TRUE:
      return (state = true);
    case UIActionTypes.SET_ROCKET_LOADING_FALSE:
      return (state = false);
    default:
      return state;
  }
};

const GreenLoadingReducer = (state = false, action) => {
  switch (action.type) {
    case UIActionTypes.SET_GREEN_LOADING_TRUE:
      return (state = true);
    case UIActionTypes.SET_GREEN_LOADING_FALSE:
      return (state = false);
    default:
      return state;
  }
};

const AlertMessageReducer = (
  state = { status: false, mode: "", code: "", message: "" },
  { type, payload }
) => {
  switch (type) {
    case UIActionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        status: true,
        mode: "error",
        code: payload.code,
        message: payload.message,
      };
    case UIActionTypes.SET_WARNING_MESSAGE:
      return {
        ...state,
        status: true,
        mode: "warning",
        code: payload.code,
        message: payload.message,
      };

    case UIActionTypes.SET_INFO_MESSAGE:
      return {
        ...state,
        status: true,
        mode: "info",
        code: payload.code,
        message: payload.message,
      };
    case UIActionTypes.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        status: true,
        mode: "success",
        code: payload.code,
        message: payload.message,
      };
    default:
      return state;
  }
};

export {
  MenuReducer,
  NotificationReducer,
  ConnectGoogleModalReducer,
  ProfileModalReducer,
  FeedbackModalReducer,
  LoadingReducer,
  RocketLoadingReducer,
  GreenLoadingReducer,
  AlertMessageReducer,
  UploadModalReducer,
  UpdateStudentDetailsReducer,
};
