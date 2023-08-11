import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
// @mui
import { Backdrop, Box, Container } from '@mui/material';

// admin layout components
import Sidebar from './sidebar';

const MainStyle = styled.main`
  flex-grow: 1;
  padding-left: 16;
  padding-right: 16;
  width: 'calc(100% - 300px)';
  display: flex;
  flex-direction: column;
  gap: 27px;
`;

const UserLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: '100vh' },
      }}
    >
      {open ? (
        <>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={() => setOpen(false)}
          >
            <Sidebar
              isOpenSidebar={open}
              onToggleSidebar={() => setOpen(!open)}
            />
          </Backdrop>
        </>
      ) : (
        <Sidebar isOpenSidebar={open} onToggleSidebar={() => setOpen(!open)} />
      )}

      <MainStyle>
       
        <Container maxWidth='false'>
          <Outlet />
        </Container>
      </MainStyle>
    </Box>
  );
};

export default UserLayout;
