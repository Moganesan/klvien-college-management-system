import Styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { CloseNotification } from "../Store/actions/uiActions";
import { UIActionTypes } from "../Store/constants/actionTypes";
import Close from "../Assets/close.svg";
import { motion } from "framer-motion";

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
   width: 400px;
   height: 300px;
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
   justify-content: space-between;
`;

const MessageContainer = Styled.div`
   display: flex;
   flex-direction: column;
`;

const Message = Styled.div`
   display: flex;   
   align-items: center;
   justify-content: space-between;
   background: #E8F0F2;
   padding: 20px ;
   border-radius: 10px;
   p{
       margin: 0;
       font-weight: bold;
   }
   span{
       font-weight: bold;
       color: #B2B1B9;
   }
`;

const Notifications = () => {
  const active = useSelector((state) => state.NotificationModal);
  const dispatch = useDispatch();
  return (
    <>
      {active === UIActionTypes.OPEN_NOTIFICATION ? (
        <Container>
          <Background onClick={() => dispatch(CloseNotification())} />
          <Content>
            <Header>
              <h3>Notifications</h3>
              <motion.div
                style={{ cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(CloseNotification())}
              >
                <img style={{ width: 20 }} src={Close} />
              </motion.div>
            </Header>
            <hr style={{ background: "#E8F0F2" }} />
            <MessageContainer>
              {/* <Message>
                <p>New schedule added</p>
                <span>2 min ago</span>
              </Message> */}
            </MessageContainer>
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default Notifications;
