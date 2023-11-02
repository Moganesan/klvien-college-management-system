import { useEffect } from "react";
import { getHolidays } from "../Store/reducers/serverReducer";
import { useSelector, useDispatch } from "react-redux";
import Styled from "styled-components";
import { ClearServer } from "../Store/actions/serverActions";

const Container = Styled.div`
   position: relative;
   overflow: scroll;
   width: calc(100vw - 500px);
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (max-width: 1024px) {
     width: 100vw;
    }
`;

const Content = Styled.div`
   display: flex;
   margin-top: 80px;
   margin-bottom: 100px;
   align-items: center;
   @media only screen and (max-width: 768px){
   flex-direction: column;
   margin-top: 10px;
  }
`;

const Table = Styled.table`
   border-collapse: collapse;
   margin: 25px 0;
   font-size: 0.9em;
   width: 700px;
   border-top-left-radius: 30px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-top-right-radius: 30px;
   overflow: hidden;
   @media only screen and (max-width: 768px){
     width: 600px;
   }
   @media only screen and (max-width: 425px){
     width: 200px;
   }

   thead tr{
     background-color: #171717;
     color: white;
     text-align: left;
     font-weight: bold;
   }
   th{
     padding: 12px 15px;
   }
   td{
     padding: 12px 15px;
   }

   tbody tr{
     border-bottom: 1px solid #EEEEEE;
   }

   tbody tr:nth-of-type(even){
     background-color: #f3f3f3;
   }

   
   tbody tr:last-of-type{
    border-bottom: 2px solid #171717;
   }
`;

const Holidays = () => {
  const dispatch = useDispatch();
  const holidays = useSelector((state) => state.Server["holidays"]);
  useEffect(async () => {
    await dispatch(ClearServer());
    await dispatch(getHolidays());
  }, []);

  if (!holidays.length) {
    return (
      <Container>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>Event</th>
                <th>From</th>
                <th>To</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Content>
      </Container>
    );
  }

  if (holidays.length) {
    return (
      <Container>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>Event</th>
                <th>From</th>
                <th>To</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((data) => {
                return (
                  <tr>
                    <td>{data.event}</td>
                    <td>{data.startingDate}</td>
                    <td>{data.endingDate}</td>
                    <td>{data.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Content>
      </Container>
    );
  }
};

export default Holidays;
