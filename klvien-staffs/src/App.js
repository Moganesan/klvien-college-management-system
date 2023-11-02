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
import SidebarRight from "./Components/SidebarRight";
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
import firebase from "firebase";
import { ToastPortal } from "./Components/ToastPortal";
import Students from "./Screens/Students";
import Subjects from "./Screens/Subjects";
import UpdateStudentDetails from "./Components/UpdateStudentDetailsModal";

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

const routes = [
  {
    path: "/students",

    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Students />
      </>
    ),
  },
  {
    path: "/attendance",

    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Attendance />
      </>
    ),
  },
  {
    path: "/assignment",
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Assignment />
      </>
    ),
  },
  {
    path: "/subjects",
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Subjects />
      </>
    ),
  },
  {
    path: "/exams",
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Exams />
      </>
    ),
  },
  {
    path: "/holidays",
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Holidays />
      </>
    ),
  },
  {
    path: "/classes",
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Classes />
      </>
    ),
  },
  {
    path: "/billings",
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Billings />
      </>
    ),
  },
  {
    path: "/",
    exact: true,
    main: () => (
      <>
        <Header />
        <SidebarRight />
        <Home />
      </>
    ),
  },
];

const App = () => {
  const auth = useSelector((state) => state.SetUser);
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.AlertMessage);

  const toastRef = useRef();

  useEffect(() => {
    if (alert.status == true)
      toastRef.current.addMessage({ mode: alert.mode, message: alert.message });
  }, [alert]);

  useEffect(() => {
    const message = firebase.messaging();
    message
      .requestPermission()
      .then(() => message.getToken())
      .then((token) => console.log(token))
      .catch((err) => console.log(err));
  }, []);

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
        <UpdateStudentDetails />
        <ConnectGoogleModal />
        <ToastPortal ref={toastRef} autoClose={true} />
        <Container>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </Container>
      </Router>
    );
  }
  return <Error401 />;
};

export default App;
