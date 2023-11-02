import React, { useState, useEffect, Profiler } from "react";
import Styled from "styled-components";
import { motion } from "framer-motion";
import { Camera, Pencil } from "../Assets/icons";
import { useSelector } from "react-redux";
import {
  GENDER,
  BLOOD_GROUP,
  COUNTRY,
  TITLE,
  STATE,
  DISTRICT,
  RELIGION,
} from "../Store/constants/datatypes";
import { ButtonPrimary } from "./Button";
import { useDispatch } from "react-redux";
import {
  SetErrorMessage,
  SetInfoMessage,
  SetSuccessMessage,
  SetWarningMessage,
} from "../Store/actions/uiActions";
import { CreateClass } from "../Store/reducers/serverReducer";

const Title = Styled.span`
   font-weight: bold;
`;

const StudentDetailsContainer = Styled.div`
   display: flex;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   justify-content: center;
   align-items: center;
   padding: 20px 20px;
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
   border: 1px solid black;

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

const NewClass = ({ DepData, SemData }) => {
  const [inputs, setInput] = useState([]);
  const dispatch = useDispatch();

  const subjects = useSelector((state) => state.Server["subjects"]);

  useEffect(() => {
    setInput([
      {
        title: "Meeting URL",
        id: "meetingUrl",
        type: "text",
        value: "",
      },
      {
        title: "Chapter",
        id: "chapter",
        type: "text",
        value: "",
      },
      {
        title: "Subject",
        id: "subject",
        type: "select",
        value: {
          name: subjects[0].subName,
          _id: subjects[0]._id,
        },
      },
      {
        title: "Date",
        id: "date",
        type: "date",
        value: new Date().toLocaleDateString("sv"),
      },
      {
        title: "Starting Time",
        id: "startingTime",
        type: "time",
        value: new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace("AM", "")
          .replace("PM", "")
          .trim(),
      },
      {
        title: "Ending Time",
        id: "endingTime",
        type: "time",
        value: new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace("AM", "")
          .replace("PM", "")
          .trim(),
      },
      {
        title: "Department",
        id: "department",
        type: "select",
        value: {
          name: DepData[0].name,
          _id: DepData[0]._id,
        },
      },
      {
        title: "Semester",
        id: "semester",
        type: "select",
        value: {
          name: SemData[0].name,
          _id: SemData[0]._id,
        },
      },
    ]);
  }, []);

  const [profile, setProfile] = useState();

  const StaffId = useSelector(
    (state) => state.SetUser.user.logindetails.StafId
  );

  const create = () => {
    const DepId = inputs.find((input) => input.id == "department")["value"]._id;

    const SemId = inputs.find((input) => input.id == "semester")["value"]._id;

    inputs.every((input) => input.value)
      ? inputs
          .find((input) => input.id == "meetingUrl")
          .value.includes("https://") ||
        inputs
          .find((input) => input.id == "meetingUrl")
          .value.includes("http://")
        ? dispatch(CreateClass(DepId, SemId, inputs))
        : dispatch(
            SetInfoMessage({
              code: 200,
              message: `Invalid Meeting URL`,
            })
          )
      : dispatch(
          SetInfoMessage({
            code: 200,
            message: `Enter a valid information to create assignment.`,
          })
        );
  };

  return (
    <>
      <Title>Add New Class</Title>
      <StudentDetailsContainer>
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
                              <option value={[v._id.trim(), v.subName.trim()]}>
                                {v.subName}
                              </option>
                            ) : null
                          )}
                          {subjects.map((v) =>
                            data.value._id.trim() != v._id.trim() ? (
                              <option value={[v._id.trim(), v.subName.trim()]}>
                                {v.subName}
                              </option>
                            ) : null
                          )}
                        </select>
                      ) : data.id == "department" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={[
                            data.value._id.trim(),
                            data.value.name.trim(),
                          ]}
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
                          {DepData.map((v) =>
                            data.value._id.trim() === v._id.trim() ? (
                              <option value={[v._id.trim(), v.name.trim()]}>
                                {v.name.trim()}
                              </option>
                            ) : null
                          )}
                          {DepData.map((v) =>
                            data.value._id.trim() != v._id.trim() ? (
                              <option value={[v._id.trim(), v.name.trim()]}>
                                {v.name.trim()}
                              </option>
                            ) : null
                          )}
                        </select>
                      ) : data.id == "semester" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={[
                            data.value._id.trim(),
                            data.value.name.trim(),
                          ]}
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
                          {SemData.map((v) =>
                            data.value._id.trim() === v._id.trim() ? (
                              <option value={[v._id.trim(), v.name.trim()]}>
                                {v.name.trim()}
                              </option>
                            ) : null
                          )}
                          {SemData.map((v) =>
                            data.value._id.trim() != v._id.trim() ? (
                              <option value={[v._id.trim(), v.name.trim()]}>
                                {v.name.trim()}
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
                  ) : data.type == "number" ? (
                    <>
                      <input
                        id={data.id}
                        type={data.type}
                        value={data.value}
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
            OnClick={() => create()}
            styled={{ marginTop: 20 }}
            text={"Create"}
          />
        </Form>
      </StudentDetailsContainer>
    </>
  );
};

export default NewClass;
