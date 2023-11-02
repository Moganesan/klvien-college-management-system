import Styled from "styled-components";

const Container = Styled.div`
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    span{
        font-weight: bold;
    }
`;

const Success = ({ text }) => {
  return (
    <Container style={{ backgroundColor: " rgba(113, 239, 163, 0.3)" }}>
      <span style={{ color: "#71EFA3" }}>{text}</span>
    </Container>
  );
};

const Warning = ({ text }) => {
  return (
    <Container style={{ backgroundColor: "rgba(255, 229, 0, 0.3)" }}>
      <span style={{ color: "#FFE500" }}>{text}</span>
    </Container>
  );
};

const Error = ({ text }) => {
  return (
    <Container style={{ backgroundColor: "rgba(255, 70, 70, 0.3)" }}>
      <span style={{ color: "#FF4646" }}>{text}</span>
    </Container>
  );
};

export { Success, Warning, Error };
