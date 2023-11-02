import ErrorImage from "../Assets/401.svg";
import Styled from "styled-components";
import { ButtonPrimary } from "../Components/Button";
import { useHistory } from "react-router-dom";

const Container = Styled.div`
   background: #fff;
   width: 100vw;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
`;

const Error401 = () => {
  const history = useHistory();
  return (
    <Container>
      <img style={{ maxWidth: 500 }} src={ErrorImage} />
      <ButtonPrimary
        OnClick={() => history.push("/login")}
        text="Login"
        styled={{ marginTop: 20 }}
      />
    </Container>
  );
};

export default Error401;
