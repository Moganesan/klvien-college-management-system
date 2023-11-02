import Styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import BackgroundElement from "../Assets/backgroundElement.svg";
import BackgroundImg from "../Assets/background.svg";
import logo from "../Assets/logo.svg";
import logoBlack from "../Assets/logo.black.svg";
import Google from "../Assets/google.svg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AthenticateUser, GoogleAuth } from "../Store/reducers/userReducer";
import { ToastPortal } from "../Components/ToastPortal";

import axios from "axios";
axios.defaults.withCredentials = true;

const Container = Styled.div`
   width: 100vw;
   height: 100vh;
   position: relative;
   overflow-x: hidden;
   background-size: cover;
   background-position: center;
   @media only screen and (max-width: 768px) {
     h1{
       display: none;
     }
   }
`;

const Background = Styled.div`
   width: 100vw;
   height: 100vh;
   position: relative;
   overflow-x: hidden;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-position: center;
   background-size: cover;
`;

const Content = Styled.div`
   display: flex;
`;

const Brand = Styled.div`
   flex: 5;
   align-self: flex-end;
   padding: 50px;
   padding-right: 0;
   @media only screen and (max-width: 768px) {
      display: none;
    }
   h2{
     color: white;
   }
`;

const LoginForm = Styled.div`
   flex:4;

   height: 100vh;
   background-color: #fff;
   border-radius: 50px 0 0 50px;
   display: flex;
   justify-content: center;
   @media only screen and (max-width: 768px) {
      border-radius: 0;
    }
   div{
   display: flex;
   flex-direction: column;
   align-items: stretch;
   width: 300px;
   justify-content: center; 
   text-align: center;
  
   *{
     color: black;
   }
   input{
     outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 40px;
     padding: 0 10px;
     margin-bottom: 20px;
   }
   input:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   p{
     font-weight: bold;
     span{
       cursor: pointer;
       color: #4AA8FF;
     }
   }
   }
   
`;

const LogoBlack = Styled.div`
   img{
    display: none;
    @media only screen and (max-width: 768px) {
     display: block;
     margin-bottom: 30px;
    }
   }
`;

const PrimaryButton = Styled(motion.button)`
    padding: 15px 30px;
    width: 100%;
    background-color: #171717;
    outline: none;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: bold;
    align-self: center;
    cursor: pointer;
    span{
      color: white;
    }
`;

const SecondaryButton = Styled(motion.button)`
    padding: 10px 30px;
    background-color: #fff;
    border: 1px solid #171717;
    outline: none;
    color: black;
    border-radius: 10px;
    font-weight: bold;
    align-self: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    span{
      margin-left: 10px;
      font-weight: bold;
    }
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.AlertMessage);
  const toastRef = useRef();

  useEffect(() => {
    if (alert.status == true)
      toastRef.current.addMessage({ mode: alert.mode, message: alert.message });
  }, [alert]);

  return (
    <Container style={{ backgroundImage: `url(${BackgroundImg})` }}>
      <Background style={{ backgroundImage: `url(${BackgroundElement})` }}>
        <Content>
          <Brand>
            <img style={{ width: 250 }} src={logo} />
            <h2>Next Generation Education System</h2>
          </Brand>
          <LoginForm>
            <div>
              <LogoBlack>
                <img
                  style={{ width: 150, alignSelf: "center" }}
                  src={logoBlack}
                />
              </LogoBlack>
              <h1>STAFF LOGIN</h1>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <PrimaryButton
                onClick={async () => {
                  // addToast();
                  await dispatch(AthenticateUser(email, password));
                }}
                whileTap={{ scale: 0.9 }}
              >
                <span>Login</span>
              </PrimaryButton>
              <p>
                New User?&nbsp;
                <Link to="/signup">
                  <span>Signup</span>
                </Link>
              </p>
              {/* <SecondaryButton
                onClick={() => dispatch(GoogleAuth())}
                whileTap={{ scale: 0.9 }}
              >
                <img style={{ width: 20 }} src={Google} />
                <span>login with google</span>
              </SecondaryButton> */}
            </div>
          </LoginForm>
        </Content>
      </Background>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Container>
  );
};

export default Login;
