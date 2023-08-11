import { Link as RouterLink } from 'react-router-dom';
// mui
import { Box, Card, Link, Typography } from '@mui/material';
// styles
import { LoginContainer, LoginRightSide } from '../../../styles/auth.styles';
// components
import LoginForm from './loginForm';

// ----------------------------------------------------------------------

const Login = () => {

  return (
    <LoginContainer>
      <LoginRightSide className='d-flex flex-column'>
        <Card sx={{ boxShadow: 20 }}>
          <div style={{ padding: '56px 40px' }}>
            <div>
              <Box sx={{ pr: 2.5, pl: 2.5, pb: 2.5 }}>
                <div className='d-flex flex-column w-100'>
                  <div className='d-flex flex-column position-relative mb-4'>
                    <Typography variant='h4' gutterBottom>
                        {'Sign in to Musical Bassoon'}
                     
                    </Typography>
                  </div>
                </div>
                <LoginForm />
             
                  <div className='d-flex flex-row justify-content-center mt-2'>
                    <Typography variant='body1' align='center' sx={{ mt: 1 }}>
                      New User?
                      <Link
                        className='text-underline-none'
                        variant='subtitle1'
                        to={'/auth/register'}
                        component={RouterLink}
                        sx={{ ml: 1 }}
                      >
                        Create an account
                      </Link>
                    </Typography>
                  </div>
             
              </Box>
            </div>
          </div>
        </Card>
      </LoginRightSide>
    </LoginContainer>
  );
};

export default Login;
