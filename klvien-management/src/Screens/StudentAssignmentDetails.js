import { useEffect, useLayoutEffect, useState } from "react";
import Styled from "styled-components";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../Components/breadcrumbs";
import { ButtonPrimary } from "../Components/Button";
import { Camera, Pencil } from "../Assets/icons";
import AttendanceBar from "../Components/AttendanceChart";
import AttendancePie from "../Components/AttendancePie";
import { motion } from "framer-motion";
import { Success, Warning, Error } from "../Components/StatusCard";
import axios from "axios";
import { API, GET_ASSIGNMENT, GET_PROFILE } from "../Store/constants/api";
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
  get_students,
  UpdateAssignmentStatus,
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

const AttendanceDetailsContainer = Styled.div`
    margin-top: 20px;
`;

const AttendanceContainer = Styled.div`
   display: flex;
   @media only screen and (max-width: 768px){
     flex-direction: column;
     div{
       margin-bottom: 20px;
     }
   }
   align-items: center;
   justify-content: space-between;
`;

const CameraIcon = Styled(motion.div)`
   position: absolute;
   display: none;
   input[type=file] {
    display: none;
  }
`;

const AttendanceLog = Styled.div` 
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
   select{
    outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
   }
`;

const StudentAssignmentDetails = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const { DepId, SemId } = location.state;

  const { studId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(5);

  // Get current data
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  // const currentData = students.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const assignments = useSelector((state) =>
    state.Server["assignments"].find((stud) => {
      if (stud.StudId === studId) return stud;
    })
  );

  const DepData = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );

  const SemData = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  const UpdateStatus = (AssgId, Status) => {
    const data = {
      DepId: DepId,
      SemId: SemId,
      StudId: assignments.StudId,
      AssgId: AssgId,
      Status: Status,
    };

    dispatch(UpdateAssignmentStatus(data));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs
          pages={["students", "Assignment", assignments.firstName]}
        />
        <Header></Header>
      </div>
      <AttendanceDetailsContainer>
        <AttendanceContainer>
          <div>
            <AssignmentsPie data={assignments.assignmentsData} />
          </div>
          <div>
            <AssignmentsChart data={assignments.assignmentsData.subjects} />
          </div>
        </AttendanceContainer>
        <Table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Project</th>
              <th>Date</th>
              <td>Due Date</td>
              <th>Teacher</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assignments.assignmentsData.assignments.map((data) => {
              return (
                <tr>
                  <td>{data.subject}</td>
                  <td>{data.project}</td>
                  <td>{data.date}</td>
                  <td>{data.dueDate}</td>
                  <td>{data.staffName}</td>
                  <td>
                    {data.status === "PENDING" ? (
                      <Error text={data.status} />
                    ) : data.status === "CHECKING" ? (
                      <Warning
                        onClick={() => UpdateStatus(data.AssgId, "COMPLETED")}
                        whileTap={true}
                        text={data.status}
                      />
                    ) : data.status === "COMPLETED" ? (
                      <Success
                        onClick={() => UpdateStatus(data.AssgId, "CHECKING")}
                        whileTap={true}
                        text={data.status}
                      />
                    ) : (
                      <Warning text={data.status} />
                    )}
                  </td>
                  <td>
                    {data.status === "PENDING" ? (
                      <ButtonPrimary text="Notify" />
                    ) : data.status === "CHECKING" ? (
                      <ButtonPrimary
                        OnClick={() => {
                          window.open(GET_ASSIGNMENT + data.file, "_blank");
                        }}
                        text="View"
                      />
                    ) : data.status === "COMPLETED" ? (
                      <ButtonPrimary
                        OnClick={() => {
                          window.open(GET_ASSIGNMENT + data.file, "_blank");
                        }}
                        text="View"
                      />
                    ) : (
                      <ButtonPrimary text="View" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          dataPerPage={dataPerPage}
          totalData={assignments.assignmentsData.assignments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </AttendanceDetailsContainer>
    </>
  );
};

export default StudentAssignmentDetails;
