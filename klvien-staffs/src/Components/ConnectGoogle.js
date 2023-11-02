import { useDispatch, useSelector } from "react-redux";
import { UIActionTypes } from "../Store/constants/actionTypes";
import Styled from "styled-components";
import Close from "../Assets/close.svg";
import { ConnectGoogle } from "../Store/reducers/userReducer";
import { motion } from "framer-motion";
import { ButtonPrimary } from "../Components/Button";
import { CloseGoogleConnectModal } from "../Store/actions/uiActions";
import KlvienLogo from "../Assets/logo.black.svg";
import GoogleLogo from "../Assets/google.title.svg";
import { useState } from "react";

const Container = Styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 1;
   display: flex;   
   align-items: center;
   justify-content: center;
`;

const Background = Styled.div`
   background: rgb(0, 0, 0,0.3);
   width: 100%;
   height: 100%;
   position: absolute;
`;

const Content = Styled.div`
   width: 300px;
   min-height: 300px;
   background-color: #fff;
   z-index: 2;
   position: absolute;
   border-radius: 30px;
   padding: 20px;   
   h3{
       margin: 0;   
       padding: 0;
   }
   @media only screen and (max-width:425px){
       width: 85%;
   }
`;

const Header = Styled.div`
   display: flex;
   justify-content: flex-end;
`;

const Form = Styled.div`
   display: flex;   
   flex-direction: column;
   justify-content: space-evenly;
   min-height: 300px;
   input{
     outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
   }
   input:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   textarea{
    outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
     height: 100PX;
     padding: 10px;
     resize: vertical;
   }
   textarea:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

function ConnectGoogleModal() {
  const [password, setPassword] = useState("");
  const email = useSelector((state) => state.SetUser.user.logindetails.email);
  const active = useSelector((state) => state.GoogleConnectModal);
  const dispatch = useDispatch();

  return (
    <>
      {active === UIActionTypes.OPEN_GOOGLE_MODAL ? (
        <Container>
          <Background onClick={() => dispatch(CloseGoogleConnectModal())} />
          <Content>
            <Header>
              <motion.div
                style={{ cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(CloseGoogleConnectModal())}
              >
                <img style={{ width: 20 }} src={Close} />
              </motion.div>
            </Header>
            <Form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img style={{ width: 100 }} src={KlvienLogo} />
                <span style={{ fontSize: 30, fontWeight: "bold" }}>+</span>
                <img style={{ width: 100 }} src={GoogleLogo} />
              </div>
              <input type="name" placeholder={email} disabled />
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="password"
              />
              <ButtonPrimary
                OnClick={() => dispatch(ConnectGoogle(email, password))}
                text="Link"
              />
            </Form>
          </Content>
        </Container>
      ) : null}
    </>
  );
}

export default ConnectGoogleModal;
