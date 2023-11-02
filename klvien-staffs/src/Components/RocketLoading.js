import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import Styled from "styled-components";
import animationData from "../Assets/rocket.animation.json";
import useWindowDimensions from "./WindowDimensions";

const Container = Styled.div`
    width: 100vw;
    height: 100vh;
    background: rgb(0,0,0,0.5);
    position: absolute;
    z-index: 100;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const Loading = () => {
  const [Width, setWidth] = useState(400);
  const [Height, setHeight] = useState(400);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 768) {
      setWidth(150);
      setHeight(150);
    }
    if (width >= 768) {
      setWidth(200);
      setHeight(200);
    }
  }, [width]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Container>
      <Lottie
        isStopped={false}
        isPaused={false}
        style={{ marginBottom: "10%" }}
        height={Height}
        width={Width}
        options={defaultOptions}
      />
    </Container>
  );
};

export default Loading;
