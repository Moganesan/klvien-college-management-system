import { useEffect } from "react";
import Styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { get_attendance } from "../Store/reducers/serverReducer";
import { ClearServer } from "../Store/actions/serverActions";
import Attendance from "../Components/AttendancePie";

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
   margin-top: 80px;
   margin-bottom: 100px;
   align-items: center;
   @media only screen and (max-width: 768px){
   flex-direction: column;
   margin-top: 10px;
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
  const attendance = useSelector((state) => state.Server["attendance"]);
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
          <Attendance data={attendance} />
          <Announcement>
            <p>“I'm living a dream I never want to wake up from.”</p>
          </Announcement>
        </Content>
      </Container>
    );
  }
};

export default Home;
