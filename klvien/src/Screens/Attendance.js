import { useEffect, useState } from "react";
import Styled from "styled-components";
import AttendanceBar from "../Components/AttendanceChart";
import AttendancePie from "../Components/AttendancePie";
import { useDispatch, useSelector } from "react-redux";
import { get_attendance } from "../Store/reducers/serverReducer";
import { ClearServer } from "../Store/actions/serverActions";

const Container = Styled.div`
   position: relative;
   overflow: scroll;
   width: calc(100vw - 500px);
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (max-width: 1024px) {
     width: 100vw;
    }
`;

const Content = Styled.div` 
   display: flex;
   margin-top: 60px;
   margin-bottom: 100px;
   align-items: center;
   margin-left: 0px;
 
   @media only screen and (max-width: 768px){
   flex-direction: column;
   margin-top: 10px;
  }
`;

const Attendance = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.Server["attendance"]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(async () => {
    await dispatch(ClearServer());
    await dispatch(get_attendance());
  }, []);

  if (!attendance.length) {
    return null;
  }
  if (attendance.length) {
    return (
      <Container>
        <Content>
          <div>
            <AttendanceBar data={attendance[0].subjects} />
          </div>
          <div style={{ marginLeft: 20, marginTop: 20 }}>
            <AttendancePie data={attendance} />
          </div>
        </Content>
      </Container>
    );
  }
};

const data = [
  {
    subjects: "TAM",
    Tamil: 13,
  },
  {
    subjects: "ENG",
    English: 10,
  },
  {
    subjects: "MAT",
    Maths: 10,
  },
  {
    subjects: "SCI",
    Science: 51,
  },
  {
    subjects: "PHY",
    Physics: 127,
  },
  {
    subjects: "CHE",
    Chemistery: 57,
  },
];

export default Attendance;
