import React, { useEffect } from "react";
import Styled from "styled-components";
import { motion } from "framer-motion";

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ul{
    list-style: none;
    display: flex;
    margin: 0;
    align-self: right;
    li{
      margin-left: 10px;
    }
  }
`;

const Button = Styled(motion.button)`
   border: none;
   outline: none;
   width: 40px;
   height: 40px;
   border-radius: 5px;
   cursor: pointer;
   border: 1px solid #fff;
   &:hover{
     border: 1px solid #171717;
   } 
`;

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length > 1) {
    return (
      <Container>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <Button
                whileTap={{ scale: 0.9 }}
                style={
                  number === currentPage
                    ? { borderWidth: 1, borderColor: "#171717" }
                    : null
                }
                onClick={() => paginate(number)}
              >
                <span>{number}</span>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    );
  } else {
    return null;
  }
};

export default Pagination;
