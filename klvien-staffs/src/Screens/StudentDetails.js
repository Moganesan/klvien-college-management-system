import { useEffect, useLayoutEffect, useState } from "react";
import Styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../Components/breadcrumbs";
import { ButtonPrimary } from "../Components/Button";
import { Camera, Pencil } from "../Assets/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { API, GET_PROFILE } from "../Store/constants/api";
import {
  SetErrorMessage,
  SetLoadingFalse,
  SetLoadinTrue,
  SetSuccessMessage,
} from "../Store/actions/uiActions";
import { ClearServer } from "../Store/actions/serverActions";
import {
  GENDER,
  BLOOD_GROUP,
  COUNTRY,
  STATE,
  DISTRICT,
} from "../Store/constants/datatypes";
import { get_students, UpdateStudent } from "../Store/reducers/serverReducer";

const Header = Styled.div`
   select{
     border: none;
     outline: none;
     padding: 10px;
     border-radius: 5px;
     font-weight: bold;
     color: white;
     background-color: #0D7377;
     margin-right: 10px;
   }
`;

const StudentDetailsContainer = Styled.div`
   display: flex;
   @media only screen and (max-width: 450px){
    flex-direction: column;
   }
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   justify-content: space-between;
   align-items: center;
   padding: 0 20px;
   border-radius: 30px;
   margin-top: 20px;
`;

const CameraIcon = Styled(motion.div)`
   position: absolute;
   display: none;
   input[type=file] {
    display: none;
  }
`;

const StudentProfileContainer = Styled.div`
   width: 200px;
   display: flex;
   @media only screen and (max-width: 450px){
    margin-top: 30PX;
   }
   align-items: center;
   justify-content: center;
   overflow: hidden;
   &:hover{
     ${CameraIcon}{
      display: block;
     }
   }
`;

const StudentProfile = Styled.div`
   width: 150px;
   height: 150px;
   border-radius: 10%;
   overflow: hidden;

   img{
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
`;

const Form = Styled.div`
   display: flex;   
   flex-direction: column;
   justify-content: space-evenly;
   padding: 20px 0;
   width: 90%;
   h4{
     margin: 0;
     margin-bottom: 10px;
   }
   input{
     outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
   }
   input:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   textarea{
    outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
     height: 100PX;
     padding: 10px;
     resize: vertical;
   }
   textarea:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  input[type=number] {
    -moz-appearance: textfield;
  }
 
`;

const Label = Styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 0 10px;
`;

const FormGrid = Styled.div`
   display: grid;
   grid-gap: 5px;
   grid-template-columns: repeat(3, minmax(0,1fr));
   @media only screen and (max-width: 600px){
    grid-template-columns: repeat(2, minmax(0,1fr));
   }

   @media only screen and (max-width: 450px){
    grid-template-columns: repeat(1, minmax(0,1fr));
   }
   select{
    outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
   }
`;

const StudentDetails = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { DepId, SemId } = location.state;

  const { studId } = useParams();

  const Student = useSelector((state) =>
    state.Server["students"].find((stud) => {
      if (stud.StudId === studId) return stud;
    })
  );

  const DepData = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );

  const SemData = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  const [edit, setEdit] = useState(false);

  const [fileServer, setFileServer] = useState(false);
  const [fileName, setFileName] = useState("");
  const [serverState, setServerState] = useState(0);

  const Upload = (e) => {
    if (e.target.files.length) {
      setFileServer(true);
      dispatch(SetLoadinTrue());
      const file = e.target.files[0];
      const fileName = e.target.files[0].name;
      setFileName(fileName);
      const formData = new FormData();
      formData.append("name", fileName);
      formData.append("file", file);
      formData.append("StudId", Student.StudId);
      formData.append("InId", Student.InId);
      axios({
        url: `${API}/staff/student/uploadprofile`,
        method: "post",
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setServerState(percentage);
        },
        data: formData,
      })
        .then((res) => {
          dispatch(ClearServer());
          dispatch(get_students(DepId, SemId));
          dispatch(SetLoadingFalse());
          dispatch(
            SetSuccessMessage({
              message: "Profile Updated!",
            })
          );
        })
        .catch((err) => {
          dispatch(SetLoadingFalse());
          console.log(err);
          dispatch(SetErrorMessage(err));
        });
    }
  };

  const [inputs, setInput] = useState([]);

  useLayoutEffect(() => {
    setInput([
      {
        title: "First Name",
        id: "firstName",
        type: "text",
        value: Student.firstName,
      },
      {
        title: "Last Name",
        id: "lastName",
        type: "text",
        value: Student.lastName,
      },
      {
        title: "Gender",
        id: "gender",
        type: "select",
        value: Student.gender,
      },
      {
        title: "Blood Group",
        id: "bloodGroup",
        type: "select",
        value: Student.bloodGroup,
      },
      {
        title: "Mobile",
        id: "contMob",
        type: "number",
        value: Student.contMob,
      },
      {
        title: "Age",
        id: "age",
        type: "number",
        value: Student.age,
      },
      {
        title: "Qualification",
        id: "qualification",
        type: "text",
        value: Student.qualification,
      },
      {
        title: "DOB",
        id: "dob",
        type: "date",
        value: Student.dob,
      },
      {
        title: "Country",
        id: "country",
        type: "select",
        value: Student.country,
      },
      {
        title: "State",
        id: "state",
        type: "select",
        value: Student.state,
      },
      {
        title: "District",
        id: "district",
        type: "select",
        value: Student.district,
      },
      {
        title: "Pincode",
        id: "pincode",
        type: "number",
        value: Student.pincode,
      },
      {
        title: "Father Name",
        id: "fathName",
        type: "text",
        value: Student.fathName,
      },
      {
        title: "Father Occupation",
        id: "fathOccu",
        type: "text",
        value: Student.fathOccu,
      },
      {
        title: "Father Mobile",
        id: "fathMob",
        type: "number",
        value: Student.fathMob,
      },
      {
        title: "Mother Name",
        id: "mothName",
        type: "text",
        value: Student.mothName,
      },
      {
        title: "Mother Occupation",
        id: "mothOccu",
        type: "text",
        value: Student.mothOccu,
      },
      {
        title: "Mother Mobile",
        id: "mothMob",
        type: "number",
        value: Student.mothMob,
      },
      {
        title: "Addmission No",
        id: "addmisNo",
        type: "text",
        value: Student.addmisNo,
      },
      // {
      //   title: "Department",
      //   id: "department",
      //   type: "select",
      //   value: Student[0].DepId,
      // },
      // {
      //   title: "Semester",
      //   id: "semester",
      //   type: "select",
      //   value: Student[0].SemId,
      // },
    ]);
  }, []);

  const updateStudentDetails = () => {
    dispatch(
      UpdateStudent(
        Student.InId.trim(),
        Student.DepId.trim(),
        Student.SemId.trim(),
        Student.StudId.trim(),
        inputs
      )
    );
    setEdit(false);
    inputs.map((obj) => {
      // console.log(document.getElementById(obj.id).value);
      document.getElementById(obj.id).setAttribute("disabled", "");
    });
  };

  const enableEdit = () => {
    setEdit(true);
    inputs.map((obj) =>
      document.getElementById(obj.id).removeAttribute("disabled")
    );
    document.getElementById(inputs[0].id).focus();
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs pages={["students", "studentsDetails"]} />
        <Header></Header>
      </div>

      <StudentDetailsContainer>
        <StudentProfileContainer>
          <StudentProfile>
            {console.log(GET_PROFILE + Student.profile)}
            <img src={GET_PROFILE + Student.profile} />
          </StudentProfile>

          <CameraIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <input
              accept="image/png, image/jpeg"
              id="file"
              type="file"
              onChange={(e) => {
                Upload(e);
              }}
            />
            <label for="file">
              <Camera />
            </label>
          </CameraIcon>
        </StudentProfileContainer>

        <Form>
          {/* <div style={{ display: "flex" }}>
            <h4>Student Details</h4>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ marginLeft: 10, cursor: "pointer" }}
              onClick={() => enableEdit()}
            >
              <Pencil width={20} height={20} />
            </motion.div>
          </div> */}

          <FormGrid>
            {inputs.map((data, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "stretch",
                  }}
                >
                  <label>{data.title}</label>
                  {data.type == "text" ? (
                    <input
                      id={data.id}
                      type={data.type}
                      value={data.value}
                      disabled
                      onChange={(e) => {
                        setInput(
                          inputs.map((item) =>
                            item.id === data.id
                              ? { ...item, value: e.target.value }
                              : item
                          )
                        );
                      }}
                    />
                  ) : data.type == "select" ? (
                    <>
                      {data.id == "gender" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? { ...item, value: e.target.value }
                                  : item
                              )
                            );
                          }}
                        >
                          {GENDER.map((v) => {
                            const curtv = data.value.toUpperCase();
                            if (curtv === v) {
                              return <option>{v.toLowerCase()}</option>;
                            } else {
                              return <option>{v.toLowerCase()}</option>;
                            }
                          })}
                        </select>
                      ) : data.id == "bloodGroup" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? { ...item, value: e.target.value }
                                  : item
                              )
                            );
                          }}
                        >
                          {BLOOD_GROUP.map((v) => {
                            const curtv = data.value.toUpperCase();
                            if (curtv === v) {
                              return <option>{v.toUpperCase()}</option>;
                            } else {
                              return <option>{v.toUpperCase()}</option>;
                            }
                          })}
                        </select>
                      ) : data.id == "country" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? { ...item, value: e.target.value }
                                  : item
                              )
                            );
                          }}
                        >
                          {COUNTRY.map((v) => {
                            const curtv = data.value.toUpperCase();
                            if (curtv === v.toUpperCase()) {
                              return <option>{v}</option>;
                            } else {
                              return <option>{v}</option>;
                            }
                          })}
                        </select>
                      ) : data.id == "state" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? { ...item, value: e.target.value }
                                  : item
                              )
                            );
                          }}
                        >
                          <>
                            {STATE[0][
                              inputs
                                .map((i) =>
                                  i.id == "country"
                                    ? i.value.toLowerCase()
                                    : null
                                )
                                .filter((c) => c != null)
                                .toString()
                            ]
                              ? STATE[0][
                                  inputs
                                    .map((i) =>
                                      i.id == "country"
                                        ? i.value.toLowerCase()
                                        : null
                                    )
                                    .filter((c) => c != null)
                                    .toString()
                                ].map((state) =>
                                  data.value
                                    .split(/\s/)
                                    .join("")
                                    .toLowerCase()
                                    .trim() ===
                                  state
                                    .split(/\s/)
                                    .join("")
                                    .toLowerCase()
                                    .trim() ? (
                                    <option>{state}</option>
                                  ) : null
                                )
                              : null}
                            {STATE[0][
                              inputs
                                .map((i) =>
                                  i.id == "country"
                                    ? i.value.toLowerCase()
                                    : null
                                )
                                .filter((c) => c != null)
                                .toString()
                            ]
                              ? STATE[0][
                                  inputs
                                    .map((i) =>
                                      i.id == "country"
                                        ? i.value.toLowerCase()
                                        : null
                                    )
                                    .filter((c) => c != null)
                                    .toString()
                                ].map((state) =>
                                  data.value
                                    .split(/\s/)
                                    .join("")
                                    .toLowerCase()
                                    .trim() !=
                                  state
                                    .split(/\s/)
                                    .join("")
                                    .toLowerCase()
                                    .trim() ? (
                                    <option>{state}</option>
                                  ) : null
                                )
                              : null}
                          </>
                          ;
                        </select>
                      ) : data.id == "district" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? { ...item, value: e.target.value }
                                  : item
                              )
                            );
                          }}
                        >
                          <>
                            {STATE[0][
                              inputs
                                .map((i) =>
                                  i.id == "country"
                                    ? i.value.toLowerCase()
                                    : null
                                )
                                .filter((c) => c != null)
                                .toString()
                            ]
                              ? STATE[0][
                                  inputs
                                    .map((i) =>
                                      i.id == "country"
                                        ? i.value.toLowerCase()
                                        : null
                                    )
                                    .filter((c) => c != null)
                                    .toString()
                                ].map((state) =>
                                  inputs
                                    .map((i) =>
                                      i.id == "state"
                                        ? i.value
                                            .toLowerCase()
                                            .split(/\s/)
                                            .join("")
                                            .trim()
                                        : null
                                    )
                                    .filter((c) => c != null)
                                    .toString() ===
                                  state
                                    .split(/\s/)
                                    .join("")
                                    .toLowerCase()
                                    .trim() ? (
                                    <>
                                      {DISTRICT[0][
                                        inputs
                                          .map((i) =>
                                            i.id == "state"
                                              ? i.value
                                                  .toLowerCase()
                                                  .toLowerCase()
                                                  .split(/\s/)
                                                  .join("")
                                                  .trim()
                                              : null
                                          )
                                          .filter((c) => c != null)
                                          .toString()
                                      ]
                                        ? DISTRICT[0][
                                            inputs
                                              .map((i) =>
                                                i.id == "state"
                                                  ? i.value
                                                      .toLowerCase()
                                                      .toLowerCase()
                                                      .split(/\s/)
                                                      .join("")
                                                      .trim()
                                                  : null
                                              )
                                              .filter((c) => c != null)
                                              .toString()
                                          ].map((district) =>
                                            district
                                              .split(/\s/)
                                              .join("")
                                              .toLowerCase()
                                              .trim() ===
                                            data.value
                                              .split(/\s/)
                                              .join("")
                                              .toLowerCase()
                                              .trim() ? (
                                              <option>{district}</option>
                                            ) : null
                                          )
                                        : null}
                                    </>
                                  ) : null
                                )
                              : null}
                            {STATE[0][
                              inputs
                                .map((i) =>
                                  i.id == "country"
                                    ? i.value.toLowerCase()
                                    : null
                                )
                                .filter((c) => c != null)
                                .toString()
                            ]
                              ? STATE[0][
                                  inputs
                                    .map((i) =>
                                      i.id == "country"
                                        ? i.value.toLowerCase()
                                        : null
                                    )
                                    .filter((c) => c != null)
                                    .toString()
                                ].map((state) =>
                                  inputs
                                    .map((i) =>
                                      i.id == "state"
                                        ? i.value
                                            .toLowerCase()
                                            .toLowerCase()
                                            .split(/\s/)
                                            .join("")
                                            .trim()
                                        : null
                                    )
                                    .filter((c) => c != null)
                                    .toString() ===
                                  state
                                    .split(/\s/)
                                    .join("")
                                    .toLowerCase()
                                    .trim() ? (
                                    <>
                                      {DISTRICT[0][
                                        inputs
                                          .map((i) =>
                                            i.id == "state"
                                              ? i.value
                                                  .toLowerCase()
                                                  .toLowerCase()
                                                  .split(/\s/)
                                                  .join("")
                                                  .trim()
                                              : null
                                          )
                                          .filter((c) => c != null)
                                          .toString()
                                      ]
                                        ? DISTRICT[0][
                                            inputs
                                              .map((i) =>
                                                i.id == "state"
                                                  ? i.value
                                                      .toLowerCase()
                                                      .toLowerCase()
                                                      .split(/\s/)
                                                      .join("")
                                                      .trim()
                                                  : null
                                              )
                                              .filter((c) => c != null)
                                              .toString()
                                          ].map((district) =>
                                            district
                                              .split(/\s/)
                                              .join("")
                                              .toLowerCase()
                                              .trim() !==
                                            data.value
                                              .split(/\s/)
                                              .join("")
                                              .toLowerCase()
                                              .trim() ? (
                                              <option>{district}</option>
                                            ) : null
                                          )
                                        : null}
                                    </>
                                  ) : null
                                )
                              : null}
                          </>
                          ;
                        </select>
                      ) : data.id == "department" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value.name}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? {
                                      ...item,
                                      _id: e.target.value,
                                    }
                                  : item
                              )
                            );
                          }}
                        >
                          {DepData.map((v) => {
                            if (data.value._id == v._id) {
                              return (
                                <option value={v._id.trim()}>{v.name}</option>
                              );
                            } else {
                              return (
                                <option value={v._id.trim()}>{v.name}</option>
                              );
                            }
                          })}
                        </select>
                      ) : data.id == "semester" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value._id}
                          disabled
                          onChange={(e) => {
                            setInput(
                              inputs.map((item) =>
                                item.id === data.id
                                  ? {
                                      ...item,
                                      value: e.target.value,
                                    }
                                  : item
                              )
                            );
                          }}
                        >
                          {SemData.map((v) => {
                            if (data.value._id === v._id) {
                              return (
                                <option value={v._id.trim()}>{v.name}</option>
                              );
                            } else {
                              return (
                                <option value={v._id.trim()}>{v.name}</option>
                              );
                            }
                          })}
                        </select>
                      ) : null}
                    </>
                  ) : data.type == "date" ? (
                    <>
                      <input
                        id={data.id}
                        type={data.type}
                        value={data.value}
                        disabled
                        onChange={(e) => {
                          setInput(
                            inputs.map((item) =>
                              item.id === data.id
                                ? { ...item, value: e.target.value }
                                : item
                            )
                          );
                        }}
                      />
                    </>
                  ) : data.type == "number" ? (
                    <>
                      <input
                        id={data.id}
                        type={data.type}
                        value={data.value}
                        disabled
                        onChange={(e) => {
                          setInput(
                            inputs.map((item) =>
                              item.id === data.id
                                ? { ...item, value: e.target.value }
                                : item
                            )
                          );
                        }}
                      />
                    </>
                  ) : null}
                </div>
              );
            })}
          </FormGrid>
          <ButtonPrimary
            styled={{ marginTop: 20 }}
            OnClick={edit ? () => updateStudentDetails() : () => enableEdit()}
            text={edit ? "Save" : "Edit"}
          />
        </Form>
      </StudentDetailsContainer>
    </>
  );
};

export default StudentDetails;
