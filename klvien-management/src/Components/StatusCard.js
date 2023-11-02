import { motion } from "framer-motion";
import Styled from "styled-components";

const Container = Styled(motion.div)`
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    span{
        font-weight: bold;
    }
`;

const Success = ({ text, whileTap, onClick }) => {
  return (
    <Container
      onClick={onClick}
      whileTap={whileTap ? { scale: 0.9 } : false}
      style={
        whileTap
          ? { cursor: "pointer", backgroundColor: " rgba(113, 239, 163, 0.3)" }
          : { backgroundColor: " rgba(113, 239, 163, 0.3)" }
      }
    >
      <span style={{ color: "#71EFA3" }}>{text}</span>
    </Container>
  );
};

const Warning = ({ text, whileTap, onClick }) => {
  return (
    <Container
      onClick={onClick}
      whileTap={whileTap ? { scale: 0.9 } : false}
      style={
        whileTap
          ? { cursor: "pointer", backgroundColor: "rgba(255, 229, 0, 0.3)" }
          : { backgroundColor: "rgba(255, 229, 0, 0.3)" }
      }
    >
      <span style={{ color: "#FFE500" }}>{text}</span>
    </Container>
  );
};

const Error = ({ text, whileTap, onClick }) => {
  return (
    <Container
      onClick={onClick}
      whileTap={whileTap ? { scale: 0.9 } : false}
      style={
        whileTap
          ? { backgroundColor: "rgba(255, 70, 70, 0.3)", cursor: "pointer" }
          : { backgroundColor: "rgba(255, 70, 70, 0.3)" }
      }
    >
      <span style={{ color: "#FF4646" }}>{text}</span>
    </Container>
  );
};

export { Success, Warning, Error };
