import Styled from "styled-components";
import SearchIcon from "../Assets/search.svg";
import NotificationIcon from "../Assets/notification.svg";
import Menu from "../Assets/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  OpenNotification,
  OpenMenu,
  OpenProfileModal,
} from "../Store/actions/uiActions";
import { GET_PROFILE } from "../Store/constants/api";
import { motion } from "framer-motion";

const MenuBtn = Styled(motion.img)`
   display: none;
   cursor: pointer;
`;

const Search = Styled.div`
   display: flex;
   border-radius: 10px;
   align-items: center;
   padding: 0 10px;
   background-color: #EFEFEF;
   height: 40px;
   width: 300px;
`;

const Notification = Styled(motion.div)`
   cursor: pointer;
`;

const SearchBox = Styled.input`
   background: transparent;
   outline: none;
   border: none;
   margin-left: 10px;
   font-weight: bold;
   color: #BCBCBC;
`;

const Profile = Styled(motion.div)` 
   width: 50px;
   height: 50px;
   overflow: hidden;
   border-radius: 50%;
   display: none;
   img{
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
`;

const Container = Styled.div`
   height: 70px;
   box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.07);
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0 50px;
   @media only screen and (max-width: 1024px) {
     ${MenuBtn}{display: block}
     ${Profile}{display: block}
   }
   @media only screen and (max-width: 768px){
     h2{
       display: none;
     }
   }
   @media only screen and (max-width: 425px){
      padding: 0 10px;
      ${Search}{
        display: none;
      }
   }
`;

const Header = () => {
  const name = useSelector((state) => state.SetUser.user.student.firstName);
  const profile = useSelector((state) => state.SetUser.user.student.profile);
  const dispatch = useDispatch();
  return (
    <Container>
      <MenuBtn
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(OpenMenu())}
        src={Menu}
      />

      <h2>Good Evening {name}!</h2>
      <Search>
        <img style={{ width: 20, height: 20 }} src={SearchIcon} />
        <SearchBox
          placeholder={"Search"}
          maxLength={40}
          style={{ width: "100%" }}
        />
      </Search>
      <Notification
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(OpenNotification())}
      >
        <img src={NotificationIcon} />
      </Notification>
      <Profile
        onClick={() => dispatch(OpenProfileModal())}
        whileTap={{ scale: 0.9 }}
      >
        <img src={GET_PROFILE + profile} />
      </Profile>
    </Container>
  );
};

export default Header;
