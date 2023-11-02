import Styled from "styled-components";
import {
  Dashboard,
  Close,
  Home,
  Attendance,
  Assignment,
  Exams,
  Holidays,
  Classes,
  Billing,
  Feedback,
  Settings,
  Users,
  Subjects,
} from "../Assets/icons";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { CloseMenu, OpenFeedbackModal } from "../Store/actions/uiActions";

const Menu = Styled.ul`
   list-style: none;
   padding: 0;
   margin: 0;

   margin-top: 0px;
   padding: 8px;
   
   li{
    display: flex;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
      background: #353535;
    }
  
    margin-top: 5px;
    padding: 8px;

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
`;

const Container = Styled.aside`
   *{
     color: white;
   }
   width: 90px;
   height: 100%;
   background: #171717;
   position: fixed;
   display: flex;
   flex-direction: column;
   align-items: center;
   z-index: 1;
   margin: 0;
   padding: 0;
   overflow: auto;
   @media only screen and (min-width: 1025px){
      display: none;
   }
`;

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const menu = useSelector((state) => state.Menu);
  const dispatch = useDispatch();

  const ActiveBackground = "white";
  const ActiveText = "black";

  return (
    <>
      {menu === "OPEN_MENU" ? (
        <Container>
          <motion.div
            onClick={() => dispatch(CloseMenu())}
            whileHover={{ rotate: -50 }}
            whileTap={{ scale: 0.9 }}
            style={{ marginTop: 30, cursor: "pointer" }}
          >
            <Close />
          </motion.div>
          <Menu>
            <Link to="/">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={path == "/" ? { background: ActiveBackground } : null}
              >
                <Dashboard color={path == "/" ? ActiveText : "white"} />
              </MenuItem>
            </Link>
            <Link to="/students">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/students")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Users
                  color={path.includes("/students") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <Link to="/attendance">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/attendance")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Attendance
                  color={path.includes("/attendance") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <Link to="/assignment">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/assignment")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Assignment
                  color={path.includes("/assignment") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <Link to="/subjects">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/subjects")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Subjects
                  color={path.includes("/subjects") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <Link to="/exams">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/exams")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Exams color={path.includes("/exams") ? ActiveText : "white"} />
              </MenuItem>
            </Link>
            <Link to="/holidays">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/holidays")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Holidays
                  color={path.includes("/holidays") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <Link to="/classes">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/classes")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Classes
                  color={path.includes("/classes") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <Link to="/billings">
              <MenuItem
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={
                  path.includes("/billings")
                    ? { background: ActiveBackground }
                    : null
                }
              >
                <Billing
                  color={path.includes("/billings") ? ActiveText : "white"}
                />
              </MenuItem>
            </Link>
            <MenuItem
              onClick={() => dispatch(OpenFeedbackModal())}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Feedback color={"white"} />
            </MenuItem>
          </Menu>
          {/* <SettingsBtn
            whileHover={{ rotate: -50, x: -20 }}
            whileTap={{ scale: 0.9 }}
            style={{ cursor: "pointer", marginTop: 0 }}
          >
            <Settings />
          </SettingsBtn> */}
        </Container>
      ) : null}
    </>
  );
};

export default Sidebar;
