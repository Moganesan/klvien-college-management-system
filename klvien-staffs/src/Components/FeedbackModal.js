import { useState } from "react";
import Styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { UIActionTypes } from "../Store/constants/actionTypes";
import { CloseFeedbackModal } from "../Store/actions/uiActions";
import Close from "../Assets/close.svg";
import { motion } from "framer-motion";
import { ButtonPrimary } from "../Components/Button";
import { addFeedback } from "../Store/reducers/serverReducer";

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

const FeedBack = () => {
  const active = useSelector((state) => state.FeedbackModal);
  const Name = useSelector((state) => state.SetUser.user.staff.fname);
  const Email = useSelector((state) => state.SetUser.user.staff.email);

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  return (
    <>
      {active === UIActionTypes.OPEN_FEEDBACKMODAL ? (
        <Container>
          <Background onClick={() => dispatch(CloseFeedbackModal())} />
          <Content>
            <Header>
              <motion.div
                style={{ cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(CloseFeedbackModal())}
              >
                <img
                  width="20"
                  height="20"
                  alt="close"
                  style={{ width: 20 }}
                  src={Close}
                />
              </motion.div>
            </Header>
            <Form>
              <input type="name" placeholder={Name} disabled />
              <input type="email" placeholder={Email} disabled />
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                placeholder="Message"
              />
              <ButtonPrimary
                OnClick={() => dispatch(addFeedback(message))}
                text="Send"
              />
            </Form>
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default FeedBack;
