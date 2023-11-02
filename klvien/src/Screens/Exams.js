import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getExams } from "../Store/reducers/serverReducer";
import { ClearServer } from "../Store/actions/serverActions";
import Styled from "styled-components";
import { ButtonPrimary } from "../Components/Button";
import { Success, Warning, Error } from "../Components/StatusCard";
import { OpenUploadModal } from "../Store/actions/uiActions";
import { ServerActionTypes } from "../Store/constants/actionTypes";

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

const Exams = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.Server["exams"]);
  useEffect(async () => {
    await dispatch(ClearServer());
    await dispatch(getExams());
  }, []);

  if (!exams.length) {
    return (
      <Container>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Subject Code</th>
                <th>Exam Code </th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((data) => {
                return (
                  <tr>
                    <td>{data.subject}</td>
                    <td>{data.examCode}</td>
                    <td>{data.subjectCode}</td>
                    <td>{data.date}</td>
                    <td>
                      {data.startingTime} To {data.endingTime}
                    </td>
                    <td>
                      {data.status === "PENDING" ? (
                        <Warning text={data.status} />
                      ) : data.status === "COMPLETED" ? (
                        <Success text={data.status} />
                      ) : data.status === "ABSENT" ? (
                        <Error text={data.status} />
                      ) : (
                        <Warning text={data.status} />
                      )}
                    </td>
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Content>
      </Container>
    );
  }

  if (exams.length) {
    return (
      <Container>
        <Content>
          <Table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Subject Code</th>
                <th>Exam Code </th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((data) => {
                return (
                  <tr>
                    <td>{data.subject}</td>
                    <td>{data.examCode}</td>
                    <td>{data.subjectCode}</td>
                    <td>{data.date}</td>
                    <td>
                      {data.startingTime} To {data.endingTime}
                    </td>
                    <td>
                      {data.status === "PENDING" ? (
                        <Warning text={data.status} />
                      ) : data.status === "COMPLETED" ? (
                        <Success text={data.status} />
                      ) : data.status === "ABSENT" ? (
                        <Error text={data.status} />
                      ) : (
                        <Warning text={data.status} />
                      )}
                    </td>
                    <td>
                      {data.status === "PENDING" ? (
                        <ButtonPrimary
                          OnClick={() =>
                            dispatch(
                              OpenUploadModal(
                                data,
                                ServerActionTypes.UPLOAD_EXAM
                              )
                            )
                          }
                          text={"Upload"}
                        />
                      ) : (
                        <ButtonPrimary text={"View"} />
                      )}
                    </td>
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

export default Exams;
