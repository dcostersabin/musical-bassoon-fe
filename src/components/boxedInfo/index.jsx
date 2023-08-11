// mui
import { Box, Typography, useTheme } from '@mui/material';
import { BoxWrapper, BoxHeader, BoxContent } from './box.styles';
import _ from "lodash";
// ----------------------------------------------------------------------

const BoxedInfo = ({
  width = '100%',
  height = '100%',
  maxWidth = '100%',
  styleDetails = {},
  classDetails = '',
  headerClassDetails = '',
  bodyClassDetails = '',
  bodyStyleDetails = {},
  backgroundColor,
  header,
  subHeader,
  children,
  hasHeader = true,
  hasBorderedHeader = true,
  hasBackgroundHeader = true,
  hasId = true,
}) => {
  const {
    palette: { background, grey },
  } = useTheme();

  return (
    <BoxWrapper
      width={width}
      height={height}
      maxwidth={maxWidth}
      sx={{
        backgroundColor: `${backgroundColor || background.paper}`,
        border: '1px solid',
        borderColor: 'grey.50',
        ...styleDetails,
      }}
      className={classDetails}
      id={hasId ? _.kebabCase(_.lowerCase(header)) : ''}
    >
      {hasHeader && (
        <BoxHeader
          className={`d-flex justify-content-between align-items-center ${headerClassDetails} ${
            hasBorderedHeader ? '' : 'border-bottom-0'
          }`}
          style={{
            backgroundColor:
              hasBorderedHeader && hasBackgroundHeader && grey[10],
          }}
          border={grey[300]}
        >
          <Box
            className='d-flex flex-row align-items-center'
            sx={{ gap: '14px' }}
          >
            <Typography sx={{ fontWeight: '600' }} variant='h4'>
              {header}
            </Typography>
          </Box>
          <Typography variant='h6'>{subHeader}</Typography>
        </BoxHeader>
      )}
      <BoxContent className={bodyClassDetails} style={bodyStyleDetails}>
        {children}
      </BoxContent>
    </BoxWrapper>
  );
};

export default BoxedInfo;
