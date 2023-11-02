import { combineReducers } from "redux";
import {
  MenuReducer,
  NotificationReducer,
  ProfileModalReducer,
  FeedbackModalReducer,
  UploadModalReducer,
  ConnectGoogleModalReducer,
  LoadingReducer,
  RocketLoadingReducer,
  AlertMessageReducer,
} from "./uiReducer";
import {
  AthenticateUser,
  setUser,
  VerifyUser,
  Logout,
  GoogleAuth,
  ConnectGoogle,
  SignUp,
} from "../reducers/userReducer";
import {
  get_attendance,
  getAssignment,
  getExams,
  serverReducer,
  getHolidays,
  getClasses,
  addAttendance,
  getBillings,
  addFeedback,
} from "../reducers/serverReducer";

const reducers = combineReducers({
  Menu: MenuReducer,
  NotificationModal: NotificationReducer,
  ProfileModal: ProfileModalReducer,
  FeedbackModal: FeedbackModalReducer,
  UploadModal: UploadModalReducer,
  SignUp: SignUp,
  Authentication: AthenticateUser,
  GoogleAuth: GoogleAuth,
  GoogleConnectModal: ConnectGoogleModalReducer,
  ConnectGoogle: ConnectGoogle,
  SetUser: setUser,
  Loading: LoadingReducer,
  RocketLoading: RocketLoadingReducer,
  Verify: VerifyUser,
  Logout: Logout,
  AlertMessage: AlertMessageReducer,
  GetAttendance: get_attendance,
  GetAssignments: getAssignment,
  GetExams: getExams,
  GetHolidays: getHolidays,
  GetBillings: getBillings,
  GetClasses: getClasses,
  AddAttendance: addAttendance,
  AddFeedBack: addFeedback,
  Server: serverReducer,
});

export default reducers;
