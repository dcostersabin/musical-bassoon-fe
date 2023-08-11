import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const GuestContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: 'right';

  @media (min-width: 900px) {
    grid-template-columns: 1fr 480px;
    grid-template-areas: 'left right';
  }
`;

export const LogoContainer = styled(Link)`
  margin: 0;
  text-decoration: none;
  display: contents;
`;

export const LogoWrapper = styled.div`
  height: 40px;
  display: inline-flex;
  z-index: 9;
  position: absolute;
  @media (min-width: 0px) {
    margin-top: 12px;
    margin-left: 16px;
  }

  @media (min-width: 900px) {
    margin-top: 40px;
    margin-left: 40px;
  }
`;

export const AuthContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  align-items: center;
  /* padding-top: 100px; */
  width: 100%;
  height: 100%;
  z-index: 0;
  @media (min-width: 1200px) {
    width: 1080px;
    justify-content: space-between;
  }
`;

export const LoginContainer = styled(AuthContainer)`
  align-items: center;
  @media (min-width: 1200px) {
    width: 100%;
    justify-content: center;
  }
`;

export const AuthLeftSide = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

export const AuthRightSide = styled(Box)`
  margin-left: 5%;
  margin-right: 5%;
  @media (min-width: 1200px) {
    width: 540px;
    min-width: 540px;
    margin-left: 0%;
    margin-right: 0%;
  }
`;

export const LoginRightSide = styled(AuthRightSide)`
  margin-left: 5%;
  margin-right: 5%;
  width: 100%;
  @media (min-width: 630px) {
    margin-left: 0%;
    margin-right: 0%;
    width: 540px;
    min-width: 540px;
  }
`;

export const BackgroundBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0);
  background-attachment: scroll, scroll;
  background-image: ${(props) =>
    `${
      props.theme === 'light'
        ? `linear-gradient(rgba(255, 255, 255, ${
            props.opacitylight || 0.9
          }), rgba(255, 255, 255, ${props.opacitylight || 0.9}))`
        : `linear-gradient(rgba(22, 28, 36, ${
            props.opacitydark || 0.94
          }), rgba(22, 28, 36, ${props.opacitydark || 0.94}))`
    }, url(${props.backdrop})`};
  background-origin: padding-box, padding-box;
  background-clip: border-box, border-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  top: 0px;
  left: 0px;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: scaleX(1);
  opacity: 0.7;
`;

export const BackgroundBackdropOne = styled.div`
  position: absolute;
  bottom: 0;
  transform: scaleX(-1);
  z-index: -1;
  width: 100vw;
`;

export const BackdropContainer = styled.div`
  z-index: 0;
  position: fixed;
  top: -250px;
  bottom: 0;
  left: 0;
  right: 0;
  transform: skewY(-12deg);
`;

export const Backdrop = styled(Paper)`
  transform-origin: 0%;
  height: 1698px;
  position: absolute;
  top: -1000px;
  left: 0;
  right: 0;
`;
