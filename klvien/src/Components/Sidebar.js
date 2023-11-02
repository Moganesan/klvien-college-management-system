import Styled from "styled-components";
import {
  Logo,
  Home,
  Attendance,
  Assignment,
  Exams,
  Holidays,
  Classes,
  Billing,
  Feedback,
  Settings,
} from "../Assets/icons";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  OpenFeedbackModal,
  OpenProfileModal,
} from "../Store/actions/uiActions";

const Menu = Styled.ul`
   list-style: none;
   padding: 0;
   margin: 0;

   margin-top: 20px;
   padding: 20px;
   
   li{
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
      background: #353535;
    }
  
    margin-top: 5px;
    padding: 10px;

    span{
      margin-left: 10px;
      font-weight: 500;
      font-size: 15px;
    }
   }
`;

const MenuItem = Styled(motion.li)`
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
      background: #353535;
    }
  
    margin-top: 5px;
    padding: 10px;

    span{
      margin-left: 10px;
      font-weight: 500;
      font-size: 15px;
    }
`;

const SettingsBtn = Styled(motion.div)`
   cursor: pointer;
   margin-top: 30px;
`;

const Container = Styled.aside`
   *{
     color: white;
   }
   width: 200px;
   height: 100%;
   background: #171717;
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 0;
   padding: 0;
   overflow: auto;

   
   /* Extra small devices (phones, 600px and down) */
   @media only screen and (max-width: 600px) {

    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (max-width: 1024px) {
      display: none;
    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (max-width: 1024px) {
      
    }

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {

    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
      
    }


`;

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const Dispatch = useDispatch();
  const ActiveBackground = "white";
  const ActiveText = "black";

  return (
    <Container>
      <div style={{ marginTop: 40 }}>
        <Logo />
      </div>
      <Menu>
        <Link to="/">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={path == "/" ? { background: ActiveBackground } : null}
          >
            <Home color={path == "/" ? ActiveText : "white"} />
            <span style={path == "/" ? { color: ActiveText } : null}>Home</span>
          </MenuItem>
        </Link>
        <Link to="/attendance">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={
              path == "/attendance" ? { background: ActiveBackground } : null
            }
          >
            <Attendance color={path == "/attendance" ? ActiveText : "white"} />
            <span style={path == "/attendance" ? { color: ActiveText } : null}>
              Attendance
            </span>
          </MenuItem>
        </Link>
        <Link to="/assignment">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={
              path == "/assignment" ? { background: ActiveBackground } : null
            }
          >
            <Assignment color={path == "/assignment" ? ActiveText : "white"} />
            <span style={path == "/assignment" ? { color: ActiveText } : null}>
              Assignment
            </span>
          </MenuItem>
        </Link>
        <Link to="/exams">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={path == "/exams" ? { background: ActiveBackground } : null}
          >
            <Exams color={path == "/exams" ? ActiveText : "white"} />
            <span style={path == "/exams" ? { color: ActiveText } : null}>
              Exams
            </span>
          </MenuItem>
        </Link>
        <Link to="/holidays">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={
              path == "/holidays" ? { background: ActiveBackground } : null
            }
          >
            <Holidays color={path == "/holidays" ? ActiveText : "white"} />
            <span style={path == "/holidays" ? { color: ActiveText } : null}>
              Holidays
            </span>
          </MenuItem>
        </Link>
        <Link to="/classes">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={path == "/classes" ? { background: ActiveBackground } : null}
          >
            <Classes color={path == "/classes" ? ActiveText : "white"} />
            <span style={path == "/classes" ? { color: ActiveText } : null}>
              Classes
            </span>
          </MenuItem>
        </Link>
        <Link to="/billings">
          <MenuItem
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={
              path == "/billings" ? { background: ActiveBackground } : null
            }
          >
            <Billing color={path == "/billings" ? ActiveText : "white"} />
            <span style={path == "/billings" ? { color: ActiveText } : null}>
              Billing
            </span>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={() => Dispatch(OpenFeedbackModal())}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Feedback color={"white"} />
          <span>Feedback</span>
        </MenuItem>
      </Menu>
      <span style={{ fontWeight: "bold", color: "#7F7C82", fontSize: 14 }}>
        &#169;Lionsoftindia
      </span>
      <SettingsBtn
        onClick={() => Dispatch(OpenProfileModal())}
        whileHover={{ rotate: -50, x: -20 }}
        whileTap={{ scale: 0.9 }}
        style={{ cursor: "pointer", marginTop: 30 }}
      >
        <Settings />
      </SettingsBtn>
    </Container>
  );
};

export default Sidebar;
