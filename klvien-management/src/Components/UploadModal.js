import { useEffect, useState } from "react";
import Styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  UIActionTypes,
  ServerActionTypes,
} from "../Store/constants/actionTypes";
import {
  CloseUploadModal,
  SetSuccessMessage,
  SetErrorMessage,
} from "../Store/actions/uiActions";
import Close from "../Assets/close.svg";
import { motion } from "framer-motion";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { API } from "../Store/constants/api";
import FolderIcon from "../Assets/folder.svg";
import PDFIcon from "../Assets/pdf.svg";

const Container = Styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 1;
   display: flex;   
   align-items: center;
   justify-content: center;
`;

const Background = Styled.div`
   background: rgb(0, 0, 0,0.3);
   width: 100%;
   height: 100%;
   position: absolute;
`;

const Content = Styled.div`
   width: 300px;
   min-height: 300px;
   background-color: #fff;
   z-index: 2;
   position: absolute;
   border-radius: 30px;
   padding: 20px;   
   h3{
       margin: 0;   
       padding: 0;
   }
   @media only screen and (max-width:425px){
       width: 85%;
   }
`;

const Header = Styled.div`
   display: flex;
   justify-content: flex-end;
`;

const Form = Styled.div`
   display: flex;   
   flex-direction: column;
   min-height: 250px;
   text-align: center;
   h2{
     margin:0;
   }
   p{
     margin: 0;
     font-size: 13px;
     font-weight: 500;
     color: #738598;
   }
   input{
     outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
   }
   input:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   textarea{
    outline: none;
     border: 1px solid #EFEFEF;
     background: #EFEFEF;
     border-radius: 8px;
     height: 35px;
     padding: 0 10px;
     height: 100PX;
     padding: 10px;
     resize: vertical;
   }
   textarea:focus{
    border: 1px solid #DBDBDB;
    box-shadow: 0px 2px 11px rgba(0, 0, 0, 0.14);
    background-color: #fff;
   }
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  input[type=number] {
    -moz-appearance: textfield;
  }
  input[type=file] {
    display: none;
  }
`;

const UploadContainer = Styled.div`
   max-width: 300px;
   height: 150px;
   background: rgba(136, 255, 247, 0.3);
   border: 1px dashed #88FFF7;
   border-width: 2px; 
   border-radius: 10px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 20px;
`;

const Progress = Styled.div`
   text-align: left;
   padding: 20px 10px;
`;

const ProgressBar = Styled.div`
   display: flex;
   align-items: center;
   margin-top: 10px;
`;

const Upload = () => {
  const active = useSelector((state) => state.UploadModal.status);
  const target = useSelector((state) => state.UploadModal.target);
  const { _id } = useSelector((state) => state.UploadModal.data);

  const { StudId, InId, SemId, DepId } = useSelector(
    (state) => state.SetUser.user.logindetails
  );
  const dispatch = useDispatch();
  const [fileServer, setFileServer] = useState(false);
  const [fileName, setFileName] = useState("");
  const [serverState, setServerState] = useState(0);

  const Upload = (e) => {
    if (e.target.files.length) {
      console.log("Upload start");
      if (target === ServerActionTypes.UPLOAD_ASSIGNMENT) {
        setFileServer(true);
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        setFileName(fileName);
        const formData = new FormData();
        formData.append("name", fileName);
        formData.append("file", file);
        formData.append("AssgId", _id);
        formData.append("StudId", StudId);
        formData.append("InId", InId);
        formData.append("SemId", SemId);
        formData.append("DepId", DepId);

        axios({
          url: `${API}/student/assignments/upload`,
          method: "post",
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setServerState(percentage);
          },
          data: formData,
        })
          .then((res) => {
            setTimeout(() => {
              setFileServer(false);
            }, 1000);
            dispatch(
              SetSuccessMessage({
                message: "File Uploaded!",
              })
            );
          })
          .catch((err) => {
            setTimeout(() => {
              setFileServer(false);
            }, 1000);
            dispatch(SetErrorMessage(err));
          });
      }
      if (target === ServerActionTypes.UPLOAD_EXAM) {
        setFileServer(true);
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        setFileName(fileName);
        const formData = new FormData();
        formData.append("name", fileName);
        formData.append("file", file);
        formData.append("ExamId", _id);
        formData.append("StudId", StudId);
        formData.append("InId", InId);
        formData.append("SemId", SemId);
        formData.append("DepId", DepId);

        axios({
          url: `${API}/student/exams/upload`,
          method: "post",
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor((loaded * 100) / total);
            setServerState(percentage);
          },
          data: formData,
        })
          .then((res) => {
            setTimeout(() => {
              setFileServer(false);
            }, 1000);
            dispatch(
              SetSuccessMessage({
                message: "File Uploaded!",
              })
            );
          })
          .catch((err) => {
            setTimeout(() => {
              setFileServer(false);
            }, 1000);
            dispatch(SetErrorMessage(err));
          });
      }
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      {active === UIActionTypes.OPEN_UPLOAD_MODAL ? (
        <Container>
          <Background
            onClick={() => {
              dispatch(CloseUploadModal());
            }}
          />
          <Content>
            <Header>
              <motion.div
                style={{ cursor: "pointer" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  dispatch(CloseUploadModal());
                }}
              >
                <img style={{ width: 20 }} src={Close} />
              </motion.div>
            </Header>
            <Form>
              <h2>Upload File</h2>
              <p>file should be PDF</p>
              <UploadContainer>
                <motion.div
                  style={{ cursor: "pointer" }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <input
                    accept=".pdf"
                    id="file"
                    type="file"
                    onChange={(e) => {
                      Upload(e);
                    }}
                  />
                  <label for="file">
                    <img style={{ width: 50 }} src={FolderIcon} />
                  </label>
                </motion.div>
              </UploadContainer>
              {fileServer ? (
                <Progress>
                  <p>Uploaded files</p>
                  <ProgressBar>
                    <div style={{ width: 40 }}>
                      <img src={PDFIcon} />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <label style={{ fontSize: 13, fontWeight: "500" }}>
                          {fileName}
                        </label>
                        <span style={{ fontSize: 13, fontWeight: "500" }}>
                          {serverState}%
                        </span>
                      </div>
                      <progress value={serverState} max="100">
                        32%
                      </progress>
                    </div>
                  </ProgressBar>
                </Progress>
              ) : null}
            </Form>
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default Upload;
