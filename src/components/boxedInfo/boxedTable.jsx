import { Box } from '@mui/material';
import {
  BoxedDetailDetail,
  BoxedDetailHeading,
  BoxedDetailsWrapper,
  BoxedDetailWrapper,
} from './box.styles';

const BoxedTable = ({ rows = [], removeNA = false, isStripped = true }) => {
  const filteredData = removeNA ? rows.filter((row) => row.value) : rows;

  return (
    <BoxedDetailsWrapper>
      {filteredData?.map((row, key) => (
        <BoxedDetailWrapper isstripped={isStripped} key={key}>
          {row.name && <BoxedDetailHeading>{row.name}</BoxedDetailHeading>}
          <BoxedDetailDetail>
            {row.type === 'status' ? (
              <div className='d-flex align-items-center gap-2'>
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: row.statusColor,
                    borderRadius: 50,
                  }}
                ></Box>
                <span
                  style={row?.styleDetails || {}}
                  className={row?.classDetails}
                >
                  {row.value}
                </span>
              </div>
            ) : row.type === 'link' ? (
              <a href={`https://${row.value}`} target='_blank'>
                <span
                  style={row?.styleDetails || {}}
                  className={row?.classDetails}
                >
                  {row.value}
                </span>
              </a>
            ) : (
              <span
                style={row?.styleDetails || {}}
                className={row?.classDetails}
              >
                {row.value}
              </span>
            )}
          </BoxedDetailDetail>
        </BoxedDetailWrapper>
      ))}
    </BoxedDetailsWrapper>
  );
};

export default BoxedTable;
