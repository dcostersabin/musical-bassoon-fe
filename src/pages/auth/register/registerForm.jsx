import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// mui
import { Alert, Link, CardActions } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// form and its validation
import { useFormik } from "formik";
import * as Yup from "yup";
// components
import Input from "../../../components/form/input";
import _ from "lodash";
import {
  useLazyUserDetailsQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../redux/auth.api";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth.slice";

// ----------------------------------------------------------------------

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [register_user] = useRegisterUserMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      role: 1,
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
      navigate("/auth/login");
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
    <form onSubmit={formik.handleSubmit}>
      <div className="d-flex flex-column gap-4">
        {errorMessage && (
          <Alert sx={{ alignItems: "center" }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <Input name="first_name" label="First Name" formik={formik} />
        <Input name="last_name" label="Last Name" formik={formik} />
        <Input name="address" label="Address" formik={formik} />

        <Input name="dob" label="DOB" type="date" formik={formik} />
        <Input name="phone" label="Phone Number" type="phone" formik={formik} />
        <Input name="email" label="Email" type="email" formik={formik} />
        <Input
          name="password"
          label="Password"
          type="password"
          formik={formik}
        />
      </div>
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
  );
};

export default RegisterForm;
