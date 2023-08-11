import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// mui
import { Alert, Link, CardActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form and its validation
import { useFormik } from 'formik';
import * as Yup from 'yup';
// components
import  Input from '../../../components/form/input';
import _ from 'lodash';
import { useLazyUserDetailsQuery, useLoginUserMutation } from '../redux/auth.api';
import { useDispatch } from 'react-redux';
import {login} from '../redux/auth.slice';

// ----------------------------------------------------------------------

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
const [login_user] = useLoginUserMutation();
const dispatch = useDispatch();

const [userDetail] = useLazyUserDetailsQuery();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      is_checked: false,
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await login_user({data:{email:values.email,password:values.password}});
      if (response?.data.access_token){
        
        localStorage.setItem("access",response?.data.access_token);
        const user = await userDetail();
        dispatch(  login({
          isAuthenticated: true,
          user: user.data,
        }))
        
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Username cannot be empty'),
      password: Yup.string()
        .required('No password provided')
        .min(8, 'Password must be 8 characters long')
    }),
  });


  const isFielsNull = useMemo(
    () =>
      Object.keys(formik.values).filter((key) => _.isEmpty(formik.values[key])),
    [formik.values.email, formik.values.password]
  );


  return <form onSubmit={formik.handleSubmit}>
      <div className='d-flex flex-column gap-4'>
        {errorMessage && (
          <Alert sx={{ alignItems: 'center' }} severity='error'>
            {errorMessage}
          </Alert>
        )}
        <Input name='email' label='Email' formik={formik} />
        <Input
          name='password'
          label='Password'
          type='password'
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
          Login
        </LoadingButton>
      </CardActions>
    </form>
  
};

export default LoginForm;
