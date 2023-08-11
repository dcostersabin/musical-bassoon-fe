import styled from 'styled-components';
// mui
import { Box } from '@mui/material';

export const BoxWrapper = styled(Box)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: ${(props) => props.maxwidth};
  border-radius: 5px;
`;

export const BoxHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f2f2f2;
`;

export const BoxContent = styled.div`
  padding: 1.5rem 1.5rem;
`;

export const BoxedDetailsWrapper = styled.div`
  margin-bottom: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
`;

export const BoxedDetailWrapper = styled.dl`
  align-items: baseline;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 0;
  padding: 8px 0;
  position: relative;

  &:nth-child(2n)::before {
    background-color: ${(props) => props.isstripped && '#0e1e2505'};
  }

  &::before {
    bottom: 0;
    content: ' ';
    left: calc(24px * -1);
    pointer-events: none;
    position: absolute;
    right: calc(24px * -1);
    top: 0;
    display: block;
  }

  & > *,
  & > div > * {
    position: relative;
  }
`;

export const BoxedDetailHeading = styled.dt`
  box-sizing: content-box;
  margin-top: 0;
  margin-left: 0;
  flex: 1 1 0%;
  margin-left: 0;
  margin-right: 24px;
  min-width: 168px;
  transform: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
  &:not(.no-colon)::after {
    content: ': ';
  }
`;

export const BoxedDetailDetail = styled.dt`
  margin-top: 0;
  margin-left: 0;
  flex: 1;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
`;
