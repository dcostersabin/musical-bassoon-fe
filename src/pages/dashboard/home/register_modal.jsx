import Box from "@mui/material/Box";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Alert, CardActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRegisterUserMutation } from "../../auth/redux/auth.api.js";

import Input from "../../../components/form/input";
// form and its validation
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";

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

export default function RegisterUserModal({
  handleModalClose,
  modal_open,
  setSnackbarMessage,
}) {
  const isModalOpen = Boolean(modal_open);

  const [errorMessage, setErrorMessage] = useState(null);

  const [register_user] = useRegisterUserMutation();

  const { role } = useSelector((state) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      dob: new Date(),
      gender: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      role: 3,
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setErrorMessage(null);
      const response = await register_user({
        data: values,
      });

      if (response?.error) {
        return setErrorMessage("Please validate the entered data");
      }

      handleModalClose();

      setSnackbarMessage("User Created Successfully");
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name cannot be empty"),
      last_name: Yup.string().required("Last Name cannot be empty"),
      dob: Yup.date().required("Date of Birth cannot be empty"),
      gender: Yup.string().required("Gender cannot be empty"),
      phone: Yup.string().required("Phone Number cannot be empty"),
      email: Yup.string().email().required("Email cannot be empty"),
      password: Yup.string()
        .required("No password provided")
        .min(8, "Password must be 8 characters long"),
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
            <div className="d-flex flex-row  flex-wrap gap-4">
              {errorMessage && (
                <Alert sx={{ alignItems: "center" }} severity="error">
                  {errorMessage}
                </Alert>
              )}

              <Input name="email" label="Email" type="email" formik={formik} />
              <Input
                name="password"
                label="Password"
                type="password"
                formik={formik}
              />
              <Input name="first_name" label="First Name" formik={formik} />
              <Input name="last_name" label="Last Name" formik={formik} />
              <Input name="address" label="Address" formik={formik} />

              <Input name="dob" label="DOB" type="date" formik={formik} />
              <Input
                name="phone"
                label="Phone Number"
                type="phone"
                formik={formik}
              />
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

              <Input
                name="role"
                label="Account Type"
                type="radio"
                radioLabels={
                  role === 1
                    ? [
                        { value: 1, label: "Super Admin" },
                        { value: 2, label: "Artist Manager" },
                        { value: 3, label: "Artist" },
                      ]
                    : [{ value: 3, label: "Artist" }]
                }
                styles={{ label: { display: "flex" } }}
                classDetails="w-100"
                formik={formik}
              />
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
                Register
              </LoadingButton>
            </CardActions>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
