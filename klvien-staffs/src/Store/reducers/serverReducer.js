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
  GetSubjects,
  GetStudents,
  getLatestLogins,
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
  students: [],
  subjects: [],
  attendance: [],
  assignments: [],
  exams: [],
  holidays: [],
  classes: [],
  billings: [],
  latestLogins: [],
};

const GetStudentsList = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/students`,
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
      return dispatch(GetStudents(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const GetAssignmentsList = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/assignments`,
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
      return dispatch(GetAssignment(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const GetExamsList = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/exams`,
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
      return dispatch(GetExams(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const GetClassList = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/classes`,
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
      return dispatch(GetClasses(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const get_students = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/students`,
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
      return dispatch(GetStudents(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const get_subjects = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/subjects`,
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
      return dispatch(GetSubjects(res.data.data));
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const get_attendance = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  if (InId && SemId && DepId) {
    await axios({
      method: "POST",
      url: `${API}/staff/students/attendance`,
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
        console.log(res.data);
        dispatch(GetAttendance(res.data.data));
        return dispatch(SetLoadingFalse());
      })
      .catch((err) => dispatch(SetErrorMessage(err)));
  }
};

const getAssignment = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/assignments`,
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
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(
          SetInfoMessage({ code: "404", message: "No assignments found!" })
        );
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetAssignment(res.data.data));
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const getExams = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/exams`,
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
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(SetInfoMessage({ code: "404", message: "No exams found!" }));
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetExams(res.data.data));
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => dispatch(SetErrorMessage(err)));
};

const CreateExam =
  (InId, DepId, SemId, StaffId, Data) => async (dispatch, getstate) => {
    dispatch(SetRocketLoadingTrue());

    await axios({
      method: "POST",
      url: `${API}/staff/students/exams/create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StaffId: StaffId,
        Data: Data,
      },
    })
      .then((res) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetSuccessMessage(res.data));
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  };

const CreateSubject =
  (InId, DepId, SemId, StaffId, Data) => async (dispatch, getstate) => {
    dispatch(SetRocketLoadingTrue());

    await axios({
      method: "POST",
      url: `${API}/staff/subjects/create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StaffId: StaffId,
        Data: Data,
      },
    })
      .then((res) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(ClearServer());
        dispatch(get_subjects(DepId, SemId));
        dispatch(SetSuccessMessage(res.data));
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  };

const getHolidays = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  await axios({
    method: "POST",
    url: `${API}/staff/students/holidays`,
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
      console.log(res.data);
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(
          SetInfoMessage({ code: "404", message: "No holidays found!" })
        );
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetHolidays(res.data.data));
    })
    .catch((err) => {
      dispatch(SetErrorMessage(err));
    });
};

const CreateHoliday =
  (InId, DepId, SemId, StaffId, Data) => async (dispatch, getstate) => {
    dispatch(SetRocketLoadingTrue());
    await axios({
      method: "POST",
      url: `${API}/staff/students/holidays/create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StaffId: StaffId,
        Data: Data,
      },
    })
      .then((res) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetSuccessMessage(res.data));
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  };

const getClasses = (DepId, SemId) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/classes`,
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
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(SetInfoMessage({ code: "404", message: "No classes found!" }));
        return dispatch(SetLoadingFalse());
      }
      dispatch(GetClasses(res.data.data));
      return dispatch(SetLoadingFalse());
    })
    .catch((err) => {
      dispatch(SetErrorMessage(err));
    });
};

const CreateClass = (DepId, SemId, Data) => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;
  const StaffId = getstate().SetUser.user.logindetails.StafId;

  dispatch(SetRocketLoadingTrue());
  await axios({
    method: "POST",
    url: `${API}/staff/students/classes/create`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: DepId,
      SemId: SemId,
      StaffId: StaffId,
      Data: Data,
    },
  })
    .then((res) => {
      dispatch(SetRocketLoadingFalse());
      dispatch(SetSuccessMessage(res.data));
    })
    .catch((err) => {
      dispatch(SetRocketLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const UpdateClass =
  (DepId, SemId, ClsId, Data) => async (dispatch, getstate) => {
    const InId = getstate().SetUser.user.logindetails.InId;

    dispatch(SetRocketLoadingTrue());

    await axios({
      method: "POST",
      url: `${API}/staff/students/classes/update`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        ClsId: ClsId,
        Data: Data,
      },
    })
      .then(async (res) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(ClearServer());
        dispatch(getClasses(DepId, SemId));
        await dispatch(
          SetSuccessMessage({
            code: 200,
            message: "Class Details Updated!",
          })
        );
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  };

const UpdateStudent =
  (InId, DepId, SemId, StudId, Data) => async (dispatch, getstate) => {
    dispatch(SetRocketLoadingTrue());
    const Student = getstate().Server["students"].map((stud) =>
      stud.StudId === StudId ? stud : null
    );

    if (StudId && Data.length && Student.length) {
      await axios({
        method: "POST",
        url: `${API}/staff/student/update`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          InId: InId,
          DepId: DepId,
          SemId: SemId,
          StudId: StudId,
          Data: Data,
        },
      })
        .then(async (res) => {
          dispatch(SetRocketLoadingFalse());
          dispatch(ClearServer());
          dispatch(get_students(Student[0].DepId, Student[0].SemId));
          await dispatch(
            SetSuccessMessage({
              code: 200,
              message: "Student Details Updated!",
            })
          );
        })
        .catch((err) => {
          dispatch(SetRocketLoadingFalse());
          dispatch(SetErrorMessage(err));
        });
    }
  };

const CreateStudent = (formdata) => async (dispatch, getstate) => {
  dispatch(SetRocketLoadingTrue());
  await axios({
    method: "POST",
    url: `${API}/staff/student/create`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: formdata,
  })
    .then((res) => {
      dispatch(SetRocketLoadingFalse());
      dispatch(SetSuccessMessage(res.data));
    })
    .catch((err) => {
      dispatch(SetRocketLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const CreateAssignment =
  (InId, DepId, SemId, StaffId, Data) => async (dispatch, getstate) => {
    dispatch(SetRocketLoadingTrue());
    await axios({
      method: "POST",
      url: `${API}/staff/students/assignment/create`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        DepId: DepId,
        SemId: SemId,
        StaffId: StaffId,
        Data: Data,
      },
    })
      .then((res) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetSuccessMessage(res.data));
      })
      .catch((err) => {
        dispatch(SetRocketLoadingFalse());
        dispatch(SetErrorMessage(err));
      });
  };

const AddAttendance = (data) => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/classes/addattendance`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: data.DepId,
      SemId: data.SemId,
      StudId: data.StudId,
      SubId: data.SubId,
      ClsId: data.ClsId,
      Status: data.Status,
    },
  })
    .then((res) => {
      dispatch(SetLoadingFalse());
      dispatch(
        SetSuccessMessage({ code: 200, message: "Attendance Recorded" })
      );
      dispatch(ClearServer());
      dispatch(getClasses(data.DepId, data.SemId));
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const UpdateAssignmentStatus = (data) => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/assignments/updatestatus`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: data.DepId,
      SemId: data.SemId,
      StudId: data.StudId,
      AssgId: data.AssgId,
      Status: data.Status,
    },
  })
    .then((res) => {
      dispatch(SetLoadingFalse());
      dispatch(
        SetSuccessMessage({ code: 200, message: "Assignment Status Updated!" })
      );
      dispatch(ClearServer());
      dispatch(getExams(data.DepId, data.SemId));
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
};

const UpdateExamStatus = (data) => async (dispatch, getstate) => {
  dispatch(SetLoadinTrue());
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/exams/updatestatus`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
      DepId: data.DepId,
      SemId: data.SemId,
      StudId: data.StudId,
      ExamId: data.ExamId,
      Status: data.Status,
    },
  })
    .then((res) => {
      dispatch(SetLoadingFalse());
      dispatch(
        SetSuccessMessage({ code: 200, message: "Exams Status Updated!" })
      );
      dispatch(ClearServer());
      dispatch(getExams(data.DepId, data.SemId));
    })
    .catch((err) => {
      dispatch(SetLoadingFalse());
      dispatch(SetErrorMessage(err));
    });
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

const GetLatestLogins = () => async (dispatch, getstate) => {
  const InId = getstate().SetUser.user.logindetails.InId;

  await axios({
    method: "POST",
    url: `${API}/staff/students/recentlogins`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: {
      InId: InId,
    },
  })
    .then((res) => {
      if (res.data.status === 404) {
        dispatch(ClearServer());
        dispatch(
          SetInfoMessage({ code: "404", message: "No Payments found!" })
        );
      }
      dispatch(getLatestLogins(res.data.data));
    })
    .catch((err) => {
      dispatch(SetErrorMessage(err));
    });
};

const addFeedback = (message) => async (dispatch, getstate) => {
  dispatch(SetRocketLoadingTrue());
  const StaffId = getstate().SetUser.user.logindetails.StafId;
  const InId = getstate().SetUser.user.logindetails.InId;
  const Name = getstate().SetUser.user.staff.fname;
  const Email = getstate().SetUser.user.staff.email;
  const Message = message;

  if (StaffId && InId && Name && Email && Message) {
    await axios({
      method: "POST",
      url: `${API}/staff/feedback/add`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        InId: InId,
        StaffId: StaffId,
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
    case ServerActionTypes.GET_STUDENTS:
      return {
        ...state,
        students: payload,
      };
    case ServerActionTypes.GET_SUBJECTS:
      return {
        ...state,
        subjects: payload,
      };
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
    case ServerActionTypes.GET_LATEST_LOGINS:
      return {
        ...state,
        latestLogins: payload,
      };
    case ServerActionTypes.CLEAR_SERVER:
      return {
        ...state,
        students: [],
        subjects: [],
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
  GetStudentsList,
  GetAssignmentsList,
  GetExamsList,
  GetClassList,
  get_students,
  CreateStudent,
  UpdateStudent,
  get_subjects,
  get_attendance,
  getAssignment,
  CreateAssignment,
  getExams,
  CreateExam,
  CreateHoliday,
  getHolidays,
  UpdateExamStatus,
  GetLatestLogins,
  getClasses,
  CreateClass,
  CreateSubject,
  UpdateAssignmentStatus,
  UpdateClass,
  getBillings,
  AddAttendance,
  addFeedback,
  serverReducer,
};
