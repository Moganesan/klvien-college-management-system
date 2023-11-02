import { useEffect, useLayoutEffect, useState } from "react";
import Styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../Components/breadcrumbs";
import { ButtonPrimary, ButtonScondary } from "../Components/Button";
import { Camera, Pencil } from "../Assets/icons";
import AttendanceBar from "../Components/AttendanceChart";
import AttendancePie from "../Components/AttendancePie";
import { motion } from "framer-motion";
import { Success, Warning, Error } from "../Components/StatusCard";
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
import {
  AddAttendance,
  get_students,
  UpdateClass,
  UpdateStudent,
} from "../Store/reducers/serverReducer";
import Pagination from "../Components/Pagination";
import AssignmentsPie from "../Components/AssignmentsPie";
import AssignmentsChart from "../Components/AssignmentsChart";

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

const Container = Styled.div`   
   border-radius: 30px;
   padding: 20px 0px;
   margin-top: 20px;
`;

const StudentsContainer = Styled.div`
   display: grid;
   grid-template-columns: repeat(3,minmax(0,1fr));
   @media only screen and (max-width: 700px){
    grid-template-columns: repeat(2, minmax(0,1fr));
   }

   @media only screen and (max-width: 450px){
    grid-template-columns: repeat(1, minmax(0,1fr));
   }
   grid-gap: 5px;
`;

const StudentContainer = Styled.div`
   height: 70px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   display: flex;
   border-radius: 5px;
   align-items: center;
   padding: 10px;
`;

const StudentProfile = Styled.div`
   width: 50px;
   height: 50px;
   overflow: hidden;
   border-radius: 25px;
   img{
       width: 100%;
       height: 100%;
   }
`;

const StudentDetails = Styled.div`
   margin-left: 10px;
   display: flex;
   flex-direction: column;
   h4{
       margin: 0;
   }
   span{
       color: #6D8299;
       font-size: 12px;
       margin: 0;
   }
`;

const EditClass = Styled.div`
   display: flex;
   flex-direction: column;
   padding: 20px 0;
   margin-top: 20px;
   align-items: center;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 8px;
`;

const Form = Styled.div`
   display: flex;   
   flex-direction: column;
   justify-content: space-evenly;
   padding: 0;
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

const StudentsClassDetails = () => {
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.Server["subjects"]);

  const { clsId } = useParams();

  const classData = useSelector((state) =>
    state.Server["classes"].find((cls) => {
      if (cls.ClsId === clsId) return cls;
    })
  );

  const [inputs, setInput] = useState([]);

  useEffect(() => {
    setInput([
      {
        title: "Meeting URL",
        id: "meetingUrl",
        type: "text",
        value: classData.meeting.join_url,
      },
      {
        title: "Chapter",
        id: "chapter",
        type: "text",
        value: classData.chapter,
      },
      {
        title: "Date",
        id: "date",
        type: "date",
        value: classData.datetoLocaleDateString,
      },
      {
        title: "Starting Time",
        id: "startingTime",
        type: "time",
        value: classData.startingTime24,
      },
      {
        title: "Ending Time",
        id: "endingTime",
        type: "time",
        value: classData.endingTime24,
      },
    ]);
  }, []);

  const location = useLocation();

  const { DepId, SemId } = location.state;

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  // Get current data
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  // const currentData = students.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [edit, setEdit] = useState(false);

  const UpdateClassDetails = () => {
    dispatch(UpdateClass(DepId, SemId, clsId, inputs));
    setEdit(false);
    inputs.map((obj) => {
      // console.log(document.getElementById(obj.id).value);
      document.getElementById(obj.id).setAttribute("disabled", "");
    });
  };

  const Attendance = (StudId, Status) => {
    const data = {
      DepId: DepId,
      SemId: SemId,
      StudId: StudId,
      SubId: classData.SubId,
      ClsId: classData.ClsId,
      Status: Status,
    };
    dispatch(AddAttendance(data));
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
        <Breadcrumbs pages={["students", "ClassDetails", classData.subject]} />
        <Header></Header>
      </div>
      <Container>
        <StudentsContainer>
          {classData.studentsData.map((data) => {
            const status = data.attendanceLog.find(
              (data) => data.ClsId.trim() == clsId.trim()
            ).status;
            return (
              <StudentContainer>
                <StudentProfile>
                  <img src={GET_PROFILE + data.profile} />
                </StudentProfile>
                <StudentDetails>
                  <h4>{data.firstName + " " + data.lastName}</h4>
                  <span>{data.addmisNo}</span>
                </StudentDetails>
                {status === "ABSENT" ? (
                  <Error
                    onClick={() => Attendance(data.StudId, "PRECENT")}
                    whileTap={true}
                    text={status}
                  />
                ) : status === "PRECENT" ? (
                  <Success
                    onClick={() => Attendance(data.StudId, "ABSENT")}
                    whileTap={true}
                    text={status}
                  />
                ) : (
                  <Error whileTap={true} text={status} />
                )}
              </StudentContainer>
            );
          })}
        </StudentsContainer>

        <EditClass>
          <Form>
            <FormGrid>
              {inputs.map((data) => {
                return (
                  <div
                    key={data.id}
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
                        placeholder={data.value}
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
                        {data.id == "subject" ? (
                          <select
                            id={data.id}
                            type={data.type}
                            value={[
                              data.value._id.trim(),
                              data.value.name.trim(),
                            ]}
                            placeholder={data.value}
                            disabled
                            onChange={(e) => {
                              const values = e.target.value.split(",");
                              setInput(
                                inputs.map((item) =>
                                  item.id === data.id
                                    ? {
                                        ...item,
                                        value: {
                                          name: values[1],
                                          _id: values[0],
                                        },
                                      }
                                    : item
                                )
                              );
                            }}
                          >
                            {subjects.map((v) =>
                              data.value._id.trim() == v._id.trim() ? (
                                <option
                                  value={[v._id.trim(), v.subName.trim()]}
                                >
                                  {v.subName}
                                </option>
                              ) : null
                            )}
                            {subjects.map((v) =>
                              data.value._id.trim() != v._id.trim() ? (
                                <option
                                  value={[v._id.trim(), v.subName.trim()]}
                                >
                                  {v.subName}
                                </option>
                              ) : null
                            )}
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
                    ) : data.type == "time" ? (
                      <>
                        <input
                          id={data.id}
                          type={data.type}
                          value={data.value}
                          disabled
                          onChange={(e) => {
                            console.log(e.target.value);
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
            <div>
              <ButtonPrimary
                OnClick={edit ? () => UpdateClassDetails() : () => enableEdit()}
                styled={{ marginTop: 20 }}
                text={edit ? "Save" : "Edit"}
              />
              {edit === false ? (
                <ButtonScondary
                  OnClick={() =>
                    window
                      .open(
                        classData.meeting.join_url.toString().trim(),
                        "_blank"
                      )
                      .focus()
                  }
                  styled={{ marginTop: 20, marginLeft: 20 }}
                  text={"Join"}
                />
              ) : null}
            </div>
          </Form>
        </EditClass>
      </Container>
    </>
  );
};

export default StudentsClassDetails;
