// mui
import { CheckBox } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
// styles
import {
  BoxedDetailHeading,
  BoxedDetailsWrapper,
  BoxedDetailWrapper,
} from './box.styles';

const BoxedDetails = ({ rows = [], currentStep }) => {
  return (
    <BoxedDetailsWrapper>
      {rows?.map((row, key) => (
        <BoxedDetailWrapper
          className=' d-flex align-items-center gap-3'
          key={key}
        >
          {key == rows.length - 1 && currentStep !== -1 ? (
            <CircularProgress size={20} />
          ) : (
            <CheckBox />
          )}

          <BoxedDetailHeading className='no-colon'>
            {row.name}
          </BoxedDetailHeading>
        </BoxedDetailWrapper>
      ))}
    </BoxedDetailsWrapper>
  );
};

export default BoxedDetails;
