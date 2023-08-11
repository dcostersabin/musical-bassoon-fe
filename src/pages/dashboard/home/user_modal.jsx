import Box from '@mui/material/Box';
import { useState } from "react";
import Typography from '@mui/material/Typography';
import { Alert,  CardActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {useUpdateUserMutation} from "../redux/dashboard.api"

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

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

export default function UserModal({handleModalClose,modal_open,setSnackbarMessage}) {
  const isModalOpen = Boolean(modal_open);

  const [errorMessage, setErrorMessage] = useState(null);

  const [update_user] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      phone:modal_open?.phone,
      first_name:modal_open?.first_name,
      last_name:modal_open?.last_name,
      address:modal_open?.address,
      gender:modal_open?.gender,
      dob:formatDate(new Date(modal_open?.dob)),
    },enableReinitialize: true,
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setErrorMessage(null);

      const response = await update_user({data:values,user_id:modal_open.id});


      if (response?.error) {
        return setErrorMessage("Please validate the entered data");
      }

      handleModalClose();

      setSnackbarMessage("User Updated Successfully");

    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name cannot be empty"),
      last_name: Yup.string().required("Last Name cannot be empty"),
      dob: Yup.date().required("Date of Birth cannot be empty"),
      gender: Yup.string().required("Gender cannot be empty"),
      phone: Yup.string().required("Phone Number cannot be empty"),
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

              <Input name="first_name" label="First Name" formik={formik} />
              <Input name="last_name" label="Last Name" formik={formik} />
              <Input name="address" label="Address" formik={formik} />

              <Input name="dob" label="DOB" type="date" formik={formik} />
              <Input name="phone" label="Phone Number" type="phone" formik={formik} />
              <Input
                name="gender"
                label="Gender"
                type="radio"
                radioLabels={[
                  { value: "M", label: "Male" },
                  { value: "F", label: "Female" },
                  { value: "O", label: "Others" },
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
                Update
              </LoadingButton>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

