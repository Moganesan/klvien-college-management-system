import axios from "axios";
import { API } from "../constants/api";
import { ServerActionTypes } from "../constants/actionTypes";
import {
  GetAttendance,
  GetAssignment,
  GetExams,
  GetHolidays,
  GetClasses,
  ClearServer,
  GetBillings,
} from "../actions/serverActions";
import {
  SetLoadingFalse,
  SetLoadinTrue,
  SetErrorMessage,
  SetInfoMessage,
  SetSuccessMessage,
  SetRocketLoadingTrue,
  SetRocketLoadingFalse,
} from "../actions/uiActions";

const database = {
  attendance: [],
  assignments: [],
  exams: [],
  holidays: [],
  classes: [],
  billings: [],
};

const get_attendance = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (StudId && InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/attendance`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
      },
    })
      .then((res) => {
        dispatch(SetLoadingFalse());
        dispatch(GetAttendance(res.data.data));
      })
      .catch((err) => {
        dispatch(SetLoadingFalse());

        dispatch(SetErrorMessage(err));
      });
  }
};

const getAssignment = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (StudId && InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/assignments`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
      },
    })
      .then((res) => {
        dispatch(GetAssignment(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => {
        dispatch(SetLoadingFalse());
        if (err.response.status === 404) {
          dispatch(ClearServer());
          dispatch(
            SetInfoMessage({ code: "404", message: "No assignments found!" })
          );
        }
      });
  }
};

const getExams = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (StudId && InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/exams`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
      },
    })
      .then((res) => {
        dispatch(GetExams(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => {
        dispatch(SetLoadingFalse());
        if (err.response.status === 404) {
          dispatch(ClearServer());
          dispatch(SetInfoMessage({ code: "404", message: "No exams found!" }));
        }
      });
  }
};

const getHolidays = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/holidays`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
      },
    })
      .then((res) => {
        dispatch(GetHolidays(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => {
        dispatch(SetLoadingFalse());
        if (err.response.status === 404) {
          dispatch(ClearServer());
          dispatch(
            SetInfoMessage({ code: "404", message: "No holidays found!" })
          );
        }
      });
  }
};

const getClasses = (date) => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  const ClsDate = date;
  if (StudId && InId && SemId && DepId && ClsDate) {
    await axios({
      method: "POST",
      url: `${API}/student/classes`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
        ClsDate: ClsDate,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          dispatch(ClearServer());
          dispatch(
            SetInfoMessage({ code: "404", message: "No classes found!" })
          );
          return dispatch(SetLoadingFalse());
        }
        dispatch(GetClasses(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => {
        dispatch(SetErrorMessage(err));
      });
  }
};

const addAttendance =
  (SubId, ClsId, meetingURL) => async (dispatch, getstate) => {
    dispatch(SetLoadinTrue());
    const StudId = getstate().SetUser.user.logindetails.StudId;
    const InId = getstate().SetUser.user.logindetails.InId;
    const SemId = getstate().SetUser.user.logindetails.SemId;
    const DepId = getstate().SetUser.user.logindetails.DepId;

    if (StudId && InId && SemId && DepId) {
      await axios({
        method: "POST",
        url: `${API}/student/attendance/add`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          InId: InId,
          DepId: DepId,
          SemId: SemId,
          StudId: StudId,
          SubId: SubId,
          ClsId: ClsId,
        },
      })
        .then(async (res) => {
          dispatch(SetLoadingFalse());
          await dispatch(
            SetSuccessMessage({ code: 200, message: "Attendance Recorded" })
          );
          setTimeout(() => {
            window.open(meetingURL.toString().trim(), "_blank").focus();
          }, 500);
        })
        .catch((err) => {
          dispatch(SetLoadingFalse());
          dispatch(SetErrorMessage(err));
        });
    }
  };

const getBillings = () => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  if (StudId && InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/student/billings`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          dispatch(ClearServer());
          dispatch(
            SetInfoMessage({ code: "404", message: "No Payments found!" })
          );
          return dispatch(SetLoadingFalse());
        }
        dispatch(GetBillings(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => {
        dispatch(SetErrorMessage(err));
      });
  }
};

const addFeedback = (message) => async (dispatch, getstate) => {
  dispatch(SetRocketLoadingTrue());
  const StudId = getstate().SetUser.user.logindetails.StudId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const SemId = getstate().SetUser.user.logindetails.SemId;
  const DepId = getstate().SetUser.user.logindetails.DepId;
  const Name = getstate().SetUser.user.student.fname;
  const Email = getstate().SetUser.user.student.email;
  const Message = message;

  if (StudId && InId && SemId && DepId && Name && Email && Message) {
    await axios({
      method: "POST",
      url: `${API}/student/feedback/add`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StudId: StudId,
        Name: Name,
        Email: Email,
        Message: Message,
      },
    })
      .then(async (res) => {
        dispatch(SetRocketLoadingFalse());
        await dispatch(
          SetSuccessMessage({
            code: 200,
            message: "Thank you for your support!",
          })
        );
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  } else {
    dispatch(SetRocketLoadingFalse());
    dispatch(SetInfoMessage({ code: 200, message: "no message found!" }));
  }
};

const serverReducer = (state = database, { type, payload }) => {
  switch (type) {
    case ServerActionTypes.GET_ATTENDANCE:
      return {
        ...state,
        attendance: payload,
      };
    case ServerActionTypes.GET_ASSIGNMENT:
      return {
        ...state,
        assignments: payload,
      };
    case ServerActionTypes.GET_EXAMS:
      return {
        ...state,
        exams: payload,
      };
    case ServerActionTypes.GET_HOLIDAYS:
      return {
        ...state,
        holidays: payload,
      };
    case ServerActionTypes.GET_CLASSES:
      return {
        ...state,
        classes: payload,
      };
    case ServerActionTypes.GET_BILLINGS:
      return {
        ...state,
        billings: payload,
      };
    case ServerActionTypes.CLEAR_SERVER:
      return {
        attendance: [],
        assignments: [],
        exams: [],
        holidays: [],
        classes: [],
        billings: [],
      };
    default:
      return {
        ...state,
      };
  }
};

export {
  get_attendance,
  getAssignment,
  getExams,
  getHolidays,
  getClasses,
  getBillings,
  addAttendance,
  addFeedback,
  serverReducer,
};
