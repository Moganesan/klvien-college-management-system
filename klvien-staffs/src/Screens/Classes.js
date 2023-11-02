import { useEffect, useState } from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getExams,
  get_students,
  getAssignment,
  get_subjects,
  getHolidays,
  getClasses,
} from "../Store/reducers/serverReducer";
import { ButtonPrimary } from "../Components/Button";
import { GET_PROFILE } from "../Store/constants/api";
import Pagination from "../Components/Pagination";
import { ClearServer, GetSubjects } from "../Store/actions/serverActions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  StudentVectorImage,
  Schoolboy,
  TaskVectorImage,
  ExamVectorImage,
  OnlineClass,
  TamilPongalVectorImage,
  EnglishStatueofLiberty,
  Mathemetics,
  Science,
  SocialScience,
  History,
  Biology,
  Chemistery,
  Accountancy,
  Physics,
  Zoology,
  Statistics,
  ComputerScience,
  SpaceScience,
  EnglishStatueofLibertyVectorImage,
  MathemeticsVectorImage,
  ScienceVectorImage,
  SocialScienceVectorImage,
  HistoryVectorImage,
  BiologyVectorImage,
  AccountancyVectorImage,
  StatisticsVectorImage,
  ComputerScienceVectorImage,
  SpaceScienceVectorImage,
} from "../Assets/vectorimages/source";
import Breadcrumbs from "../Components/breadcrumbs";
import AddNewAssignment from "../Components/AddNewAssignment";
import StudentDetails from "./StudentDetails";
import StudentAttendanceDetails from "./AttendanceDetails";
import StudentAssignmentDetails from "./StudentAssignmentDetails";
import StudentExamDetails from "./StudentExamDetails";
import AddNewExam from "../Components/AddNewExam";
import AddNewHoliday from "../Components/AddNewHoliday";
import AddNewClass from "../Components/AddNewClass";
import { Error, Success, Warning } from "../Components/StatusCard";
import StudentsClassDetails from "./StudentsClassDetails";

const Header = Styled.div`
   select{
     border: none;
     outline: none;
     padding: 10px;
     @media only screen and (max-width: 425px){
       padding: 5px;
       margin-right: 0;
     }
     border-radius: 5px;
     font-weight: bold;
     color: white;
     background-color: #0D7377;
     margin-right: 10px;
   }
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

const Table = Styled.table`
   border-collapse: collapse;
   margin: 25px 0;
   font-size: 0.9em;
   width: 100%;
   border-radius: 20px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-top-right-radius: 30px;
   overflow: hidden;
   @media only screen and (max-width: 768px){
     width: 600px;
   }
   @media only screen and (max-width: 425px){
     width: 200px;
   }

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

const StudentsContainer = Styled.div`
   
`;

const SubjectContainer = Styled.div`
   display: grid;
   grid-gap: 25px;
   grid-template-columns: repeat(4, minmax(0,1fr));
   background: white;
   margin-top: 20px;
   margin-bottom: 20px;
`;

const Subject = Styled.div`
   display: flex;
   flex-direction: column;
   color: black;
   img{
     width: 140px;
     height: 140px;
   }
   width: 185px;
   height: 205px;
   background-color: rgba(77, 213, 153, 0.4);
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 20px;
   align-items: center;
   border: 1px solid rgba(77, 213, 153, 0.4);
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

const Classes = () => {
  const { path, url } = useRouteMatch();

  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(ClearServer());
  }, []);
  const departments = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );
  const semesters = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  const subjects = useSelector((state) => state.Server["subjects"]);

  const classes = useSelector((state) => state.Server["classes"]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  // Get current data
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentData = classes.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(ClearServer());
    dispatch(get_subjects(departments[0]._id, semesters[0]._id));
    dispatch(getClasses(departments[0]._id, semesters[0]._id));
  }, []);

  return (
    <Container>
      <Content>
        <Switch>
          <Route exact path={path}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Breadcrumbs pages={["Classes"]} />
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
            {classes.length ? (
              <>
                <StudentsContainer>
                  <Table>
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Chapter</th>
                        <th>Date</th>
                        <th>Timing</th>
                        <th>Created by</th>
                        <th>Status</th>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((data) => {
                        return (
                          <tr>
                            <td>{data.subject}</td>
                            <td>{data.chapter}</td>
                            <td>{data.date}</td>
                            <td>
                              {data.startingTime} to {data.endingTime}
                            </td>
                            <td>{data.staffName}</td>
                            <td>
                              {data.status == "STARTED" ? (
                                <Success text={data.status} />
                              ) : data.status == "NOT YET STARTED" ? (
                                <Error text={data.status} />
                              ) : (
                                <Warning text={data.status} />
                              )}
                            </td>
                            <td>
                              <Link
                                to={{
                                  pathname: `${url}/${data.ClsId}`,
                                  state: {
                                    DepId: data.DepId,
                                    SemId: data.SemId,
                                  },
                                }}
                              >
                                <ButtonPrimary
                                  whileHover={true}
                                  text={"View"}
                                />
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <Pagination
                    dataPerPage={dataPerPage}
                    totalData={classes.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </StudentsContainer>
              </>
            ) : (
              <StudentsContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Chapter</th>
                      <th>Date</th>
                      <th>Timing</th>
                      <th>Created by</th>
                      <th>Status</th>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                      <td>Loading...</td>
                    </tr>
                  </tbody>
                </Table>
              </StudentsContainer>
            )}
            {subjects.length ? (
              <AddNewClass DepData={departments} SemData={semesters} />
            ) : null}
          </Route>
          <Route exact path={`${path}/:clsId`}>
            {classes.length ? <StudentsClassDetails /> : null}
          </Route>
        </Switch>
      </Content>
    </Container>
  );
};

export default Classes;
