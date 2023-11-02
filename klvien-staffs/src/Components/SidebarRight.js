import Styled from "styled-components";
import { ButtonPrimary, ButtonScondary } from "./Button";
import { LogoutIcon } from "../Assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { OpenProfileModal } from "../Store/actions/uiActions";
import { motion } from "framer-motion";
import { Logout } from "../Store/reducers/userReducer";
import { GET_PROFILE } from "../Store/constants/api";

const Container = Styled.div`
   position: fixed;
   width: 300px;
   height: calc(100vh - 70px);
   background: white;
   left: calc(100vw - 300px);
   box-shadow: -2px 10px 10px rgba(0, 0, 0, 0.07);
   display: flex;
   flex-direction: column;
   @media only screen and (max-width: 1024px) {
      display: none;
   }
   h2{
     margin-left: 20px;
   }
`;
const User = Styled.div`
  height: 60px;
  background-color: #EEEEEE;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;  
  span{
    font-size: 13px;
    coloe: #6D8299;
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

const Sidebar = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.Server.latestLogins);
  return (
    <Container>
      <h2>Recent Logins</h2>

      {students
        ? students.map((student) => (
            <User>
              <Profile>
                <img src={GET_PROFILE + student.profile} />
              </Profile>
              <h4>{student.firstName}</h4>
              <span>{student.lastLogin}</span>
            </User>
          ))
        : null}
    </Container>
  );
};

export default Sidebar;
