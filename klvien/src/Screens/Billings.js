import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styled from "styled-components";
import { Success, Warning } from "../Components/StatusCard";
import { ClearServer, GetBillings } from "../Store/actions/serverActions";
import { getBillings } from "../Store/reducers/serverReducer";

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

const Billings = () => {
  const billings = useSelector((state) => state.Server.billings);
  const dispatch = useDispatch();
  useEffect(async () => {
    await dispatch(ClearServer());
    await dispatch(getBillings());
  }, []);

  if (!billings.length) {
    return (
      <Container>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Bill Item</th>
                <th>Amount</th>
                <th>Outstanding</th>
                <th>Status</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Bill Item</th>
              <th>Amount</th>
              <th>Outstanding</th>
              <th>Status</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {billings.map((data) => {
              return (
                <tr>
                  <td>{data.billNo}</td>
                  <td>{data.billItem}</td>
                  <td>&#8377;{data.amount}</td>
                  <td>&#8377;{data.pendingAmount}</td>
                  <td>
                    {data.paymentStatus === "COMPLETED" ? (
                      <Success text={data.paymentStatus} />
                    ) : (
                      <Warning text={data.paymentStatus} />
                    )}
                  </td>
                  <td>{data.method}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default Billings;
