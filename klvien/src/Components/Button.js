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

const ButtonPrimary = ({ text, OnClick, styled, textStyle }) => {
  return (
    <PrimaryButton
      style={styled}
      onClick={OnClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span style={textStyle}>{text}</span>
    </PrimaryButton>
  );
};

const ButtonScondary = ({ text, OnClick, Icon, style, textStyle }) => {
  return (
    <SecondaryButton
      onClick={OnClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={style}
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
