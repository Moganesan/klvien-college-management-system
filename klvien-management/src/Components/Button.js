import Styled from "styled-components";
import { motion } from "framer-motion";

const PrimaryButton = Styled(motion.button)`
   padding: 10px 30px;
   background-color: #171717;
   outline: none;
   border: none;
   color: white;
   border-radius: 10px;
   font-weight: bold;
   align-self: center;
   cursor: pointer;
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
`;

const ButtonPrimary = ({ text, OnClick, styled, textStyle, whileHover }) => {
  return (
    <PrimaryButton
      style={styled}
      onClick={OnClick}
      whileHover={whileHover ? { scale: 1.1 } : false}
      whileTap={{ scale: 0.9 }}
    >
      <span style={textStyle}>{text}</span>
    </PrimaryButton>
  );
};

const ButtonScondary = ({
  text,
  OnClick,
  Icon,
  styled,
  textStyle,
  whileHover,
}) => {
  return (
    <SecondaryButton
      style={styled}
      onClick={OnClick}
      whileHover={whileHover ? { scale: 1.1 } : false}
      whileTap={{ scale: 0.9 }}
    >
      {Icon ? <Icon /> : null}
      <span style={textStyle}>{text}</span>
    </SecondaryButton>
  );
};

ButtonPrimary.defaultProps = {
  text: "Button Primary",
};

ButtonScondary.defaultProps = {
  text: "Button Secondary",
};

export { ButtonPrimary, ButtonScondary };
