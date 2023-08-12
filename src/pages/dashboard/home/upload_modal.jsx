import Box from "@mui/material/Box";
import { useRef, useState } from "react";
import { Alert, CardActions} from "@mui/material";
import Input from "../../../components/form/input";
import { LoadingButton } from "@mui/lab";
import {useRegisterUserMutation} from "../../auth/redux/auth.api"
import {useUploadMusicMutation} from "../redux/upload.api.js"

// form and its validation
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import Papa from "papaparse";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadModal({
  handleModalClose,
  modal_open,
  setUploadAlerts,
}) {
  const [errorMessage] = useState(null);
  const [register_user] = useRegisterUserMutation();
  const [upload_music] = useUploadMusicMutation();

  const formik = useFormik({
    initialValues: {
      uploaded_csv: "",
      password: "",

    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      let new_songs = {} ;

      let new_users = {};


      Papa.parse(uploadedFile.current?.files?.[0], {
        complete: function (results) {
          results?.data?.forEach((data,idx)=>{
            if(idx === 0){return};
            if (data.length < 2 ) {return};
            let first_name = data[0];
            let address = data[1];
            let gender = data[2];
            let phone = data[3]
            let email = data[4]
            let last_name = data[5]
            let dob = new Date(data[6])
            dob = `${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`;
            let title = data[7]
            let album_name = data[8]
            let genre = data[9]
            let role = 3;
            let password = formik.values.password
            let song = {email,title,album_name,genre}
            let user_detail = {email,first_name,last_name,address,gender,phone,dob,password,role}
            if(new_songs.hasOwnProperty(email)){
              new_songs[email].push(song)
            }else{
              new_songs[email] = [song]
            }

            if(!new_users.hasOwnProperty(email)){
              new_users[email] = user_detail
            }


          });

          let user_registered = 0;
          let songs_uploaded = 0;

          Object.entries(new_users).map(async ([email,data],idx)=>{

            const response =  await register_user({data})
            console.log(response)
            if (response?.data?.id){
              user_registered ++;
              let message = ` ${user_registered} New Artists Added, ${songs_uploaded} New Songs Added`
              setUploadAlerts(message)
            }

            let songs = new_songs[email];

            Object.entries(songs).map(async ([idx,music])=>{


              let response = await upload_music({data:music});

              if (!response?.errors){
                songs_uploaded ++;
                let message = ` ${user_registered} New Artists Added, ${songs_uploaded} New Songs Added`
                setUploadAlerts(message)
              }

            })

          });


          handleModalClose();

        },
      });
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
      .required("No password provided")
      .min(8, "Password must be 8 characters long"),

    }),
  });

  const uploadedFile = useRef();

  return (
    <div>
      <Modal
        open={modal_open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column  flex-wrap gap-4">
              {errorMessage && (
                <Alert sx={{ alignItems: "center" }} severity="error">
                  {errorMessage}
                </Alert>
              )}

              <Alert severity="warning">
                Please ensure your CSV has the following headers
                <div>
                  <code>first_name,address,gender,phone,email
                    ,last_name,dob,title,album_name,genre
                  </code>

                </div>

              </Alert>

              <Input
                name="password"
                label="Default User Password"
                type="password"
                formik={formik}
              />
              <input name="uploaded_csv" ref={uploadedFile} type="file" />
            </div>
            <CardActions className="d-flex flex-column p-0 pt-1">
              <LoadingButton
                fullWidth
                sx={{ minHeight: 55, mt: 2 }}
                size="large"
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
              >
                Upload
              </LoadingButton>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
