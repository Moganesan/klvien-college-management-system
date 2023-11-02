import React, { useEffect, useRef } from "react";
import App from "./App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { VerifyUser } from "./Store/reducers/userReducer";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { ToastProvider } from "react-toast-notifications";
import Loading from "./Components/loading";
import RocketLoading from "./Components/RocketLoading";
import firebase from "./Store/config/db";
import { ToastPortal } from "./Components/ToastPortal";

const Roote = () => {
  const LoadingState = useSelector((state) => state.Loading);
  const RocketLoadingState = useSelector((state) => state.RocketLoading);
  const auth = useSelector((state) => state.SetUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const alert = useSelector((state) => state.AlertMessage);

  const toastRef = useRef();

  useEffect(() => {
    if (alert.status == true)
      toastRef.current.addMessage({ mode: alert.mode, message: alert.message });
  }, [alert]);

  return (
    <ToastProvider>
      <React.StrictMode>
        <ToastPortal ref={toastRef} autoClose={true} />
        {LoadingState ? <Loading /> : null}
        {RocketLoadingState ? <RocketLoading /> : null}
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </React.StrictMode>
    </ToastProvider>
  );
};

export default Roote;
