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
import Pagination from "../Components/Pagination";

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
   align-items: center;
   @media only screen and (max-width: 768px){
     flex-direction: column;
     div{
       margin-bottom: 20px;
     }
   }
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

const StudentAttendanceDetails = () => {
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

  const attendance = useSelector((state) =>
    state.Server["attendance"].find((stud) => {
      if (stud.StudId === studId) return stud;
    })
  );

  const DepData = useSelector(
    (state) => state.SetUser.user.logindetails.DepData
  );

  const SemData = useSelector(
    (state) => state.SetUser.user.logindetails.SemData
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs pages={["students", "Attendance", attendance.firstName]} />
        <Header></Header>
      </div>
      <AttendanceDetailsContainer>
        <AttendanceContainer>
          <div>
            <AttendancePie data={attendance.attendance[0]} />
          </div>
          <div>
            <AttendanceBar data={attendance.attendance[0].subjects} />
          </div>
        </AttendanceContainer>

        <AttendanceLog>
          <Table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Class</th>
                <th>Teacher</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.attendance[0].attendanceLog.map((log) => {
                return (
                  <tr>
                    <td>{log.subName}</td>
                    <td>{log.date}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                        }}
                      >
                        <span>
                          {log.start} to {log.end}
                        </span>
                        <span>{log.duration}</span>
                      </div>
                    </td>
                    <td>{log.staffName}</td>
                    <td>
                      {log.status === "ABSENT" ? (
                        <Error whileTap={true} text={log.status} />
                      ) : log.status === "PRECENT" ? (
                        <Success whileTap={true} text={log.status} />
                      ) : (
                        <Error whileTap={true} text={log.status} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination
            dataPerPage={dataPerPage}
            totalData={attendance.attendance[0].attendanceLog.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </AttendanceLog>
      </AttendanceDetailsContainer>
    </>
  );
};

export default StudentAttendanceDetails;
