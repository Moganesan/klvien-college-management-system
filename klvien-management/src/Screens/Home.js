import { useEffect, useState } from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignment,
  GetAssignmentsList,
  getClasses,
  GetClassList,
  getExams,
  GetExamsList,
  GetStudentsList,
  get_attendance,
  get_students,
  get_subjects,
} from "../Store/reducers/serverReducer";
import { ClearServer, GetSubjects } from "../Store/actions/serverActions";
import Attendance from "../Components/AttendancePie";
import {
  StudentVectorImage,
  ExamVectorImage,
  TaskVectorImage,
  OnlineClassVectorImage,
} from "../Assets/vectorimages/source";
import Breadcrumbs from "../Components/breadcrumbs";
import GreenLoading from "../Components/greenLoading";
import { GET_PROFILE } from "../Store/constants/api";

const Container = Styled.div`
   position: relative;
   overflow: scroll;
   width: calc(100vw - 500px);
   height: 100%;
   display: flex;
   flex-direction: column;
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (max-width: 1024px) {
     width: 100vw;
    }
`;

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
     @media only screen and (max-width: 425px){
       padding: 5px;
       margin-right: 0;
     }
   }
`;

const Content = Styled.div` 
   margin-bottom: 100px;
   padding: 20px;
   @media only screen and (max-width: 768px){
   flex-direction: column;
   margin-top: 10px;
  }
  h1{
    margin: 0;
  }
`;

const Announcement = Styled.div`
   width: 350px;
   height: 130px;
   background: linear-gradient(179.44deg, #FF958C 0.49%, #FF81C1 99.51%);
   margin-left: 30px;
   border-radius: 30px;
   display: flex;
   text-align: center;
   align-items: center;
   font-weight: bold; 
   color: white;
   font-size: 15px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   @media only screen and (max-width: 768px){
   margin-top: 30px;
   }
   @media only screen and (max-width: 320px){
     width: 95%;
     margin-left: 0px;
   }
`;

const Dashboard = Styled.div`
   display: grid;
   grid-gap: 25px;
   grid-template-columns: repeat(4, minmax(0,1fr)); 
   align-items: center;
   justify-items: center;
   @media only screen and (max-width: 768px){
    grid-template-columns: repeat(3, minmax(0,1fr)); 
  }
  @media only screen and (max-width: 598px){
    grid-template-columns: repeat(1, minmax(0,1fr)); 
  }

   background: white;
   margin-top: 20px;
   margin-bottom: 20px;
`;

const Info = Styled.div`
   display: flex;
   flex-direction: column;
   width: 185px;
   height: 205px;
   background-color: rgba(77, 213, 153, 0.4);
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 20px;
   border: 1px solid rgba(77, 213, 153, 0.4);
   align-items: center;
   cursor: pointer;
   transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
   &:hover{
    transform: scale(0.9);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
    border: 1px solid black;
   }
   justify-content: space-evenly;
   h3{
     margin: 0;
   }
`;

const Table = Styled.table`
   border-collapse: collapse;
   margin: 25px 0;
   font-size: 0.9em;
   width: 100%;
   border-radius: 20px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-top-right-radius: 30px;
   overflow: hidden;

   thead tr{
     background-color: #171717;
     color: white;
     text-align: left;
     font-weight: bold;
   }
   th{
     padding: 12px 15px;
   }
   td{
     padding: 12px 15px;
   }

   tbody tr{
     border-bottom: 1px solid #EEEEEE;
   }

   tbody tr:hover{
    background-color: #f3f3f3;
    cursor: pointer;
   }

   /* tbody tr:nth-of-type(even){
     background-color: #f3f3f3;
   } */

/*    
   tbody tr:last-of-type{
    border-bottom: 2px solid #171717;
   } */
`;

const ProfileContainer = Styled.div`
   display: flex;
   align-items: center;

   span{
     font-weight: 500;
     margin-left: 10px;
     font-size: 15px;
   }
`;

const Profile = Styled.div`
   width: 50px;
   height: 50px;
   border-radius: 50%;
   overflow: hidden;
   img{
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
`;

const StudentsContainer = Styled.div`
`;

const data = [
  {
    id: "Overall Attendance",
    label: "Precent",
    value: 90,
    color: "hsl(249, 70%, 50%)",
  },
  {
    id: "Absent",
    label: "Absent",
    value: 10,
    color: "hsl(102, 70%, 50%)",
  },
];
const Home = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.Server["students"]);
  const subjects = useSelector((state) => state.Server["subjects"]);
  const assignments = useSelector((state) => state.Server["assignments"]);
  const exams = useSelector((state) => state.Server["exams"]);
  const classes = useSelector((state) => state.Server["classes"]);
  const departments = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );
  const semesters = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  useEffect(async () => {
    dispatch(ClearServer());
    dispatch(get_subjects(departments[0]._id, semesters[0]._id));
    dispatch(GetStudentsList(departments[0]._id, semesters[0]._id));
    dispatch(GetAssignmentsList(departments[0]._id, semesters[0]._id));
    dispatch(GetExamsList(departments[0]._id, semesters[0]._id));
    dispatch(GetClassList(departments[0]._id, semesters[0]._id));
  }, []);

  return (
    <Container>
      <Content>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Breadcrumbs pages={["Dashboard"]} />
          <Header>
            <select
              id="DepFilt"
              onChange={async (e) => {
                dispatch(ClearServer());
                dispatch(
                  get_subjects(
                    e.target.value,
                    document.getElementById("SemFilt").value
                  )
                );
                dispatch(
                  get_students(
                    e.target.value,
                    document.getElementById("SemFilt").value
                  )
                );
                dispatch(
                  getAssignment(
                    e.target.value,
                    document.getElementById("SemFilt").value
                  )
                );
                dispatch(
                  getExams(
                    e.target.value,
                    document.getElementById("SemFilt").value
                  )
                );
                dispatch(
                  getClasses(
                    e.target.value,
                    document.getElementById("SemFilt").value
                  )
                );
              }}
            >
              {departments.map((dep) => {
                return <option value={dep._id}>{dep.name}</option>;
              })}
            </select>
            <select
              id="SemFilt"
              onChange={async (e) => {
                dispatch(ClearServer());
                dispatch(
                  get_subjects(
                    document.getElementById("DepFilt").value,
                    e.target.value
                  )
                );
                dispatch(
                  get_students(
                    document.getElementById("DepFilt").value,
                    e.target.value
                  )
                );
                dispatch(
                  getAssignment(
                    document.getElementById("DepFilt").value,
                    e.target.value
                  )
                );
                dispatch(
                  getExams(
                    document.getElementById("DepFilt").value,
                    e.target.value
                  )
                );
                dispatch(
                  getClasses(
                    document.getElementById("DepFilt").value,
                    e.target.value
                  )
                );
              }}
            >
              {semesters.map((sem) => {
                return <option value={sem._id}>{sem.name}</option>;
              })}
            </select>
          </Header>
        </div>
        <Dashboard>
          {students.length ? (
            <Info>
              <StudentVectorImage width={140} height={140} />
              <h3>{students.length} Students</h3>
            </Info>
          ) : (
            <Info>
              <GreenLoading />
            </Info>
          )}
          {assignments.length ? (
            <Info>
              <TaskVectorImage width={140} height={140} />
              <h3>{assignments.length} Assignments</h3>
            </Info>
          ) : (
            <Info>
              <GreenLoading />
            </Info>
          )}
          {exams.length ? (
            <Info>
              <ExamVectorImage width={140} height={140} />
              <h3>{exams.length} Exams</h3>
            </Info>
          ) : (
            <Info>
              <GreenLoading />
            </Info>
          )}
          {classes.length ? (
            <Info>
              <OnlineClassVectorImage width={140} height={140} />
              <h3>{classes.length} Classes</h3>
            </Info>
          ) : (
            <Info>
              <GreenLoading />
            </Info>
          )}
        </Dashboard>
        <h2>Students ({students.length})</h2>
        {students.length ? (
          <StudentsContainer>
            <Table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Mobile</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {students.map((data) => {
                  return (
                    <tr>
                      <td>
                        <ProfileContainer>
                          <Profile>
                            <img src={GET_PROFILE + data.profile} />
                          </Profile>
                          <span>{data.name}</span>
                        </ProfileContainer>
                      </td>
                      <td>{data.depName}</td>
                      <td>{data.contMob}</td>
                      <td>{data.semName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </StudentsContainer>
        ) : (
          <StudentsContainer>
            <Table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Department</th>
                  <th>Mobile</th>
                  <th>Last login</th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </StudentsContainer>
        )}
      </Content>
    </Container>
  );
};

export default Home;
