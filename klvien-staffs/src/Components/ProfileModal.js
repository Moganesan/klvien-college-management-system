import Styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  CloseProfileModal,
  OpenGoogleConnectModal,
} from "../Store/actions/uiActions";
import { ButtonPrimary, ButtonScondary } from "../Components/Button";
import { UIActionTypes } from "../Store/constants/actionTypes";
import { motion } from "framer-motion";
import Close from "../Assets/close.svg";
import Google from "../Assets/google.svg";
import { LogoutIcon } from "../Assets/icons";
import { Logout } from "../Store/reducers/userReducer";

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

const GoogleButton = Styled(motion.button)`
    padding: 5px 10px;
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

const LogoutButton = Styled(motion.button)`
   padding: 5px 10px;
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

const ProfileModal = () => {
  const active = useSelector((state) => state.ProfileModal);
  const profile = useSelector((state) => state.SetUser.user.staff);
  const dispatch = useDispatch();
  return (
    <>
      {active == UIActionTypes.OPEN_PROFILEMODAL ? (
        <Container>
          <Background onClick={() => dispatch(CloseProfileModal())} />
          <Content>
            <Header>
              <motion.div
                style={{ cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(CloseProfileModal())}
              >
                <img style={{ width: 20 }} src={Close} />
              </motion.div>
            </Header>
            <Form>
              <label>Name</label>
              <input
                type="text"
                style={{ textTransform: "capitalize" }}
                placeholder={profile.fname}
                disabled
              />
              <label>DOB</label>
              <input type="text" placeholder={profile.dob} disabled />
              <label>Email</label>
              <input type="text" placeholder={profile.email} disabled />
              <label>Mobile</label>
              <input type="text" placeholder={profile.mobile1} disabled />
              <label>Blood Group</label>
              <input
                type="text"
                style={{ textTransform: "capitalize" }}
                placeholder={profile.blood_group}
                disabled
              />
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* <GoogleButton
                  onClick={() => {
                    dispatch(OpenGoogleConnectModal());
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img style={{ width: 20 }} src={Google} />
                  <span>Link with google</span>
                </GoogleButton> */}
                <LogoutButton
                  onClick={() => {
                    dispatch(Logout());
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogoutIcon />
                  <span>Logout</span>
                </LogoutButton>
              </div>
              <ButtonPrimary styled={{ marginTop: 20 }} text="Edit" />
            </Form>
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default ProfileModal;
