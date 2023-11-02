import { ServerActionTypes } from "../constants/actionTypes";

const GetStudents = (payload) => ({
  type: ServerActionTypes.GET_STUDENTS,
  payload: payload,
});

const getLatestLogins = (payload) => ({
  type: ServerActionTypes.GET_LATEST_LOGINS,
  payload: payload,
});

const GetSubjects = (payload) => ({
  type: ServerActionTypes.GET_SUBJECTS,
  payload: payload,
});

const GetAttendance = (payload) => ({
  type: ServerActionTypes.GET_ATTENDANCE,
  payload: payload,
});

const GetAssignment = (payload) => ({
  type: ServerActionTypes.GET_ASSIGNMENT,
  payload: payload,
});

const GetExams = (payload) => ({
  type: ServerActionTypes.GET_EXAMS,
  payload: payload,
});

const GetHolidays = (payload) => ({
  type: ServerActionTypes.GET_HOLIDAYS,
  payload: payload,
});

const GetClasses = (payload) => ({
  type: ServerActionTypes.GET_CLASSES,
  payload: payload,
});

const GetBillings = (payload) => ({
  type: ServerActionTypes.GET_BILLINGS,
  payload: payload,
});

const ClearServer = () => ({
  type: ServerActionTypes.CLEAR_SERVER,
});

export {
  GetStudents,
  GetSubjects,
  GetAttendance,
  getLatestLogins,
  GetAssignment,
  GetExams,
  GetHolidays,
  GetClasses,
  GetBillings,
  ClearServer,
};
