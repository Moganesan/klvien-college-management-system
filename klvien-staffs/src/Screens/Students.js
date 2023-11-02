import React, { useEffect, useState, useLayoutEffect } from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { get_attendance, get_students } from "../Store/reducers/serverReducer";
import { ClearServer } from "../Store/actions/serverActions";
import Breadcrumbs from "../Components/breadcrumbs";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import StudentDetails from "./StudentDetails";
import { ButtonPrimary } from "../Components/Button";
import { GET_PROFILE } from "../Store/constants/api";
import Pagination from "../Components/Pagination";
import AddNewStudent from "../Components/AddNewStudent";

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

const Students = () => {
  const { path, url } = useRouteMatch();
  const departments = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );
  const semesters = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  const dispatch = useDispatch();

  const students = useSelector((state) => state.Server["students"]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  // Get current data
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentData = students.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(ClearServer());
    dispatch(get_students(departments[0]._id, semesters[0]._id));
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Switch>
            <Route exact path={path}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Breadcrumbs pages={["Students"]} />
                <Header>
                  <select
                    id="DepFilt"
                    onChange={async (e) => {
                      dispatch(ClearServer());
                      dispatch(
                        get_students(
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
                        get_students(
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
              {students.length ? (
                <StudentsContainer>
                  <Table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Department</th>
                        <th>Mobile</th>
                        <th>Semester</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((data) => {
                        return (
                          <tr>
                            <td>
                              <ProfileContainer>
                                <Profile>
                                  <img src={GET_PROFILE + data.profile} />
                                </Profile>
                                <span>{data.firstName}</span>
                              </ProfileContainer>
                            </td>
                            <td>{data.depName}</td>
                            <td>{data.contMob}</td>
                            <td>{data.semName}</td>
                            <td>
                              {/* <Link to={`${url}/${data.StudId}`}>
                                <ButtonPrimary text={"View"} />
                              </Link> */}
                              <Link
                                to={{
                                  pathname: `${url}/${data.StudId}`,
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
                    totalData={students.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </StudentsContainer>
              ) : (
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
                      <tr>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                        <td>Loading...</td>
                      </tr>
                    </tbody>
                  </Table>
                </StudentsContainer>
              )}
              <AddNewStudent DepData={departments} SemData={semesters} />
            </Route>
            <Route exact path={`${path}/:studId`}>
              {students.length ? <StudentDetails /> : null}
            </Route>
          </Switch>
        </Content>
      </Container>
    </>
  );
};

export default Students;
