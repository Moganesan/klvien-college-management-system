import { useEffect, useRef } from "react";
import Styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Profile from "./Components/Profile";
import Home from "./Screens/Home";
import Attendance from "./Screens/Attendance";
import Assignment from "./Screens/Assignment";
import Exams from "./Screens/Exams";
import Holidays from "./Screens/Holidays";
import Classes from "./Screens/Classes";
import Billings from "./Screens/Billings";
import MobileMenu from "./Components/MobileMenu";
import Notifications from "./Components/Notifications";
import ProfileModal from "./Components/ProfileModal";
import FeedbackModal from "./Components/FeedbackModal";
import UploadModal from "./Components/UploadModal";
import ConnectGoogleModal from "./Components/ConnectGoogle";
import { useSelector, useDispatch } from "react-redux";
import { VerifyUser, AthenticateUser } from "./Store/reducers/userReducer";
import Error401 from "./Screens/Error401";

const Container = Styled.div`
   margin-left: 200px;
   background: white;
   border-top-left-radius: 50px;
   border-bottom-left-radius: 50px;
   height: 100vh ;
   position: fixed;
   width: calc(100vw - 200px);
   overflowX: scroll;
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (max-width: 1024px) {
      margin-left: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      width: 100vw;
    }
`;

const App = () => {
  const auth = useSelector((state) => state.SetUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(VerifyUser());
    return () => null;
  }, [auth.auth]);

  if (auth.auth === true) {
    return (
      <Router>
        <MobileMenu />
        <Notifications />
        <ProfileModal />
        <FeedbackModal />
        <UploadModal />
        <Sidebar />
        <ConnectGoogleModal />
        <Container>
          <Switch>
            <Route path="/attendance">
              <Header />
              <Profile />
              <Attendance />
            </Route>
            <Route path="/assignment">
              <Header />
              <Profile />
              <Assignment />
            </Route>
            <Route path="/exams">
              <Header />
              <Profile />
              <Exams />
            </Route>
            <Route path="/holidays">
              <Header />
              <Profile />
              <Holidays />
            </Route>
            <Route path="/classes">
              <Header />
              <Profile />
              <Classes />
            </Route>
            <Route path="/billings">
              <Header />
              <Profile />
              <Billings />
            </Route>
            <Route path="/">
              <Header />
              <Profile />
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
  return <Error401 />;
};

export default App;
