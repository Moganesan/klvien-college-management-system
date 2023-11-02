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
import { CreateStudent } from "../Store/reducers/serverReducer";

const Title = Styled.span`
   font-weight: bold;
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
   align-items: center;
   @media only screen and (max-width: 450px){
    margin-top: 30PX;
   }
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

const NewStudent = ({ DepData, SemData }) => {
  const [inputs, setInput] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setInput([
      {
        title: "First Name",
        id: "firstName",
        type: "text",
        value: "",
      },
      {
        title: "Last Name",
        id: "lastName",
        type: "text",
        value: "",
      },
      {
        title: "Email",
        id: "email",
        type: "text",
        value: "",
      },
      {
        title: "Gender",
        id: "gender",
        type: "select",
        value: GENDER[0],
      },
      {
        title: "Blood Group",
        id: "bloodGroup",
        type: "select",
        value: BLOOD_GROUP[0],
      },
      {
        title: "Religion",
        id: "religion",
        type: "select",
        value: RELIGION[0],
      },
      {
        title: "Title",
        id: "title",
        type: "select",
        value: TITLE[0],
      },
      {
        title: "Country",
        id: "country",
        type: "select",
        value: COUNTRY[0],
      },
      {
        title: "State",
        id: "state",
        type: "select",
        value: STATE[0].india[22],
      },
      {
        title: "District",
        id: "district",
        type: "select",
        value: DISTRICT[0].tamilnadu[0],
      },
      {
        title: "Mobile",
        id: "contMob",
        type: "number",
        value: "",
      },

      {
        title: "Age",
        id: "age",
        type: "number",
        value: "",
      },
      {
        title: "Qualification",
        id: "qualification",
        type: "text",
        value: "",
      },
      {
        title: "DOB",
        id: "dob",
        type: "date",
        value: new Date().toLocaleDateString("sv"),
      },

      {
        title: "Pincode",
        id: "pincode",
        type: "number",
        value: "",
      },
      {
        title: "Father Name",
        id: "fathName",
        type: "text",
        value: "",
      },
      {
        title: "Father Occupation",
        id: "fathOccu",
        type: "text",
        value: "",
      },
      {
        title: "Father Mobile",
        id: "fathMob",
        type: "number",
        value: "",
      },
      {
        title: "Mother Name",
        id: "mothName",
        type: "text",
        value: "",
      },
      {
        title: "Mother Occupation",
        id: "mothOccu",
        type: "text",
        value: "",
      },
      {
        title: "Mother Mobile",
        id: "mothMob",
        type: "number",
        value: "",
      },
      {
        title: "Community",
        id: "community",
        type: "text",
        value: "",
      },
      {
        title: "Contact Address 1",
        id: "contactAddress1",
        type: "text",
        value: "",
      },
      {
        title: "Contact Address 2",
        id: "contactAddress2",
        type: "text",
        value: "",
      },
      {
        title: "Contact Address 3",
        id: "contactAddress3",
        type: "text",
        value: "",
      },
      {
        title: "Addmission No",
        id: "addmisNo",
        type: "text",
        value: "",
      },

      {
        title: "School",
        id: "school",
        type: "text",
        value: "",
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

  const InId = useSelector((state) => state.SetUser.user.logindetails.InId);

  const create = () => {
    const formData = new FormData();
    formData.append("profile", profile);
    formData.append("InId", InId);
    formData.append("data", JSON.stringify(inputs));
    profile != undefined
      ? inputs.every((input) => input.value)
        ? dispatch(CreateStudent(formData))
        : dispatch(
            SetInfoMessage({
              code: 200,
              message: `Enter a valid information to create student.`,
            })
          )
      : dispatch(
          SetWarningMessage({
            code: 400,
            message: "Please upload profile picture before create a student.",
          })
        );
  };

  return (
    <>
      <Title>Add New Student</Title>
      <StudentDetailsContainer>
        <StudentProfileContainer>
          <StudentProfile>
            {profile ? <img src={window.URL.createObjectURL(profile)} /> : null}
          </StudentProfile>

          <CameraIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <input
              accept="image/png, image/jpeg"
              id="file"
              type="file"
              onChange={(e) => {
                if (e.target.files.length) {
                  setProfile(e.target.files[0]);
                }
              }}
            />
            <label for="file">
              <Camera />
            </label>
          </CameraIcon>
        </StudentProfileContainer>

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
                      {data.id == "gender" ? (
                        <select
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
                        >
                          {GENDER.map((v) =>
                            data.value.toLowerCase() === v.toLowerCase() ? (
                              <option>{v.toLowerCase()}</option>
                            ) : null
                          )}
                          {GENDER.map((v) =>
                            data.value.toLowerCase() != v.toLowerCase() ? (
                              <option>{v.toLowerCase()}</option>
                            ) : null
                          )}
                        </select>
                      ) : data.id == "bloodGroup" ? (
                        <select
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
                        >
                          {BLOOD_GROUP.map((v) =>
                            data.value.toLowerCase() === v.toLowerCase() ? (
                              <option>{v}</option>
                            ) : null
                          )}
                          {BLOOD_GROUP.map((v) =>
                            data.value.toLowerCase() != v.toLowerCase() ? (
                              <option>{v}</option>
                            ) : null
                          )}
                        </select>
                      ) : data.id == "country" ? (
                        <select
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
                      ) : data.id == "religion" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value._id}
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
                          {RELIGION.map((v) =>
                            data.value.toLowerCase() === v.toLowerCase() ? (
                              <option>{v}</option>
                            ) : null
                          )}
                          {RELIGION.map((v) =>
                            data.value.toLowerCase() != v.toLowerCase() ? (
                              <option>{v}</option>
                            ) : null
                          )}
                        </select>
                      ) : data.id == "title" ? (
                        <select
                          id={data.id}
                          type={data.type}
                          value={data.value._id}
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
                          {TITLE.map((v) =>
                            data.value.toLowerCase() === v.toLowerCase() ? (
                              <option>{v}</option>
                            ) : null
                          )}
                          {TITLE.map((v) =>
                            data.value.toLowerCase() != v.toLowerCase() ? (
                              <option>{v}</option>
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

export default NewStudent;
