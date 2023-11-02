import { useEffect } from "react";
import { addAttendance, getClasses } from "../Store/reducers/serverReducer";
import { useSelector, useDispatch } from "react-redux";
import Styled from "styled-components";
import { ButtonPrimary } from "../Components/Button";
import { Warning } from "../Components/StatusCard";
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

   input[type="date"] {
      background-color: white;
      outline: none;
      border: none;
      border-radius: 5px;
      margin-left: 10px;
      height: 30px;
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

const Classes = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.Server["classes"]);
  useEffect(async () => {
    document.getElementById("date").valueAsDate = new Date();
    const currentDate = new Date();
    const serverDate = currentDate.toLocaleDateString("sv");
    await dispatch(ClearServer());
    await dispatch(getClasses(serverDate));
  }, []);

  if (!classes.length) {
    <Container>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>
                Date
                <input
                  onChange={async (e) => {
                    await dispatch(ClearServer());
                    await dispatch(getClasses(e.target.value));
                    console.log(e.target.value);
                  }}
                  type="date"
                  id="date"
                  name="date"
                />
              </th>
              <th>Subject</th>
              <th>Timing</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>18/02/2003</td>
              <td>Science</td>
              <td>01:30 to 02:00</td>
              <td>
                <ButtonPrimary text="Attend" />
              </td>
            </tr>
            ;
          </tbody>
        </Table>
      </Content>
    </Container>;
  }

  return (
    <Container>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>
                Date
                <input
                  onChange={async (e) => {
                    await dispatch(ClearServer());
                    await dispatch(getClasses(e.target.value));
                    console.log(e.target.value);
                  }}
                  type="date"
                  id="date"
                  name="date"
                />
              </th>
              <th>Subject</th>
              <th>Timing</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((data) => {
              return (
                <tr>
                  <td>{data.date}</td>
                  <td>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ margin: 0 }}>{data.subject}</p>
                      <p style={{ margin: 0 }}>{data.chapter}</p>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {data.staffName}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ margin: 0, textAlign: "start" }}>
                        {data.start}&nbsp;to&nbsp;{data.end}
                      </p>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        ({data.duration}min)
                      </p>
                    </div>
                  </td>
                  <td>
                    {data.meeting ? (
                      <ButtonPrimary
                        text="Attend"
                        OnClick={() =>
                          dispatch(
                            addAttendance(
                              data.subId,
                              data._id,
                              data.meeting.join_url
                            )
                          )
                        }
                      />
                    ) : (
                      <Warning text="Not yet started" />
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
};

export default Classes;
