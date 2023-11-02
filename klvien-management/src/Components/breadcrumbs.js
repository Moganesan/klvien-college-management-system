import React from "react";
import Styled from "styled-components";
import { AarrowForward } from "../Assets/icons";
import { useHistory } from "react-router-dom";

const Container = Styled.div`
  display: flex;
  align-items: center;
  h3{
      margin: 0;
      padding: 0;
      color: #686D76;
  }
`;

const Breadcrumbs = ({ pages }) => {
  const page = pages;
  const history = useHistory();
  return (
    <Container>
      {pages ? (
        <>
          {pages.length ? (
            <>
              {pages.map((page, key, { length }) => {
                return (
                  <>
                    {key > 0 ? (
                      <AarrowForward
                        style={{ marginTop: 3 }}
                        width={20}
                        height={20}
                      />
                    ) : null}

                    <h3
                      onClick={() => {
                        const path = pages
                          .map((page) => page)
                          .toString()
                          .split(",")
                          .join("/");
                      }}
                      style={key + 1 === length ? { color: "black" } : null}
                    >
                      {page[0].toUpperCase() + page.slice(1)}
                    </h3>
                  </>
                );
              })}
            </>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default React.memo(Breadcrumbs);
