import Styled from "styled-components";
import { ButtonPrimary, ButtonScondary } from "../Components/Button";
import { LogoutIcon } from "../Assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { OpenProfileModal } from "../Store/actions/uiActions";
import { motion } from "framer-motion";
import { Logout } from "../Store/reducers/userReducer";
import { GET_PROFILE } from "../Store/constants/api";

const Container = Styled.div`
   position: fixed;
   width: 300px;
   height: calc(100vh - 70px);
   background: white;
   left: calc(100vw - 300px);
   box-shadow: -2px 10px 10px rgba(0, 0, 0, 0.07);
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
   @media only screen and (max-width: 1024px) {
      display: none;
   }
`;

const GoogleButton = Styled(motion.button)`
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

const ProfileContainer = Styled.div`
   text-align: center;
   display: flex;
   flex-direction: column;
   h2{
     margin: 0;
     margin-top: 10px;
     margin-bottom: 10px;
     padding: 0;
   }

`;

const ProfileImg = Styled.div`
   width: 150px;
   height: 150px;
   border-radius: 50%;
   overflow: hidden;
   align-self: center;
   img{
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
`;

const Department = Styled.span`
   margin-bottom: 10px;
   color: #7D859A;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.SetUser.user.student);
  return (
    <Container>
      <ProfileContainer>
        <ProfileImg>
          <img src={GET_PROFILE + profile.profile} />
        </ProfileImg>
        <h2>{profile.fname}</h2>
        <Department>{profile.depname}</Department>
        <ButtonPrimary
          OnClick={() => dispatch(OpenProfileModal())}
          text={"View"}
        />
      </ProfileContainer>
      <ButtonScondary
        OnClick={() => dispatch(Logout())}
        style={{
          display: "flex",
          alignItems: "center",
        }}
        Icon={LogoutIcon}
        text={"Log out"}
        textStyle={{ marginLeft: 10 }}
      />
    </Container>
  );
};

export default Profile;
