import Box from '@mui/material/Box';
import { useState } from "react";
import {useSelector} from "react-redux";
import { Alert,  CardActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {useAddMusicMutation} from "../redux/music.api"

import Input from "../../../components/form/input";
// form and its validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function MusicAddModal({handleModalClose,modal_open,setSnackbarMesage}) {
  const isModalOpen = Boolean(modal_open);

  const [errorMessage, setErrorMessage] = useState(null);

  const [add_music] = useAddMusicMutation();

  const {id} = useSelector(state=>state.auth.user);

  const formik = useFormik({
    initialValues: {
      album_name:modal_open?.album_name,
      title:modal_open?.title,
      genre:modal_open?.genre,
    },enableReinitialize: true,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setErrorMessage(null);

      const response = await add_music({data:{...values,user_id:id}});


      if (response?.error) {
        return setErrorMessage("Please validate the entered data");
      }

      handleModalClose();

      setSnackbarMesage("Music Added Successfully");

    },
    validationSchema: Yup.object().shape({
      album_name: Yup.string().required("Album Name cannot be empty"),
      title: Yup.string().required("Title cannot be empty"),
      genre: Yup.string().required("Genre cannot be empty"),
    }),
  });
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex flex-column gap-4'>
              {errorMessage && (
                <Alert sx={{ alignItems: 'center' }} severity='error'>
                  {errorMessage}
                </Alert>
              )}

              <Input name="album_name" label="Album Name" formik={formik} />
              <Input name="title" label="Title" formik={formik} />

              <Input
                name="genre"
                label="Genre"
                type="radio"
                radioLabels={[
                  { value: "rock", label: "Rock" },
                  { value: "rnb", label: "RNB" },
                  { value: "classic", label: "Classic" },
                  { value: "country", label: "Country" },
                  { value: "jazz", label: "Jazz" },
                ]}
                styles={{ label: { display: "flex" } }}
                classDetails="w-100"
                formik={formik}
              />
            </div>
            <CardActions className='d-flex flex-column p-0 pt-1'>

              <LoadingButton
                fullWidth
                sx={{ minHeight: 55, mt: 2 }}
                size='large'
                type='submit'
                variant='contained'
                loading={formik.isSubmitting}
              >
                Add Music
              </LoadingButton>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

