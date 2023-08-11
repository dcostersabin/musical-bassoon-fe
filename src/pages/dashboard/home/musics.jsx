import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useListMusicQuery } from "../redux/music.api";
import { useSelector } from "react-redux";
import BoxedInfo from "../../../components/boxedInfo";
import MusicUpdateModal from "./music_update_modal"
import MusicAddModal from "./music_create_modal"
import {
  Button,
  Pagination,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import Music from "./music";

import { tableCellClasses } from "@mui/material/TableCell";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid",
    borderColor: theme.palette.grey[25],
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.grey[600],
  },
  padding: "20px",
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.grey[500],
    fontSize: 14,
    fontWeight: 500,
  },
}));
export default function Musics({setSnackbarMesage}) {

  const [musicUpdateModal, setMusicUpdateModal] = useState(null);

  const [musicAddModal, setMusicAddModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const music_id = searchParams.get("id");

  const { id } = useSelector((state) => state.auth.user);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { currentData, isLoading, isSuccess } = useListMusicQuery({
    user_id: music_id || id,
    page: currentPage,
  });


  const handleModalOpen = (music_data) => {
    setMusicUpdateModal(music_data);
  };

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ padding: "0rem 1.5rem" }} >
                  <Button variant="outlined" onClick={() => setMusicAddModal(true)}>
                Add Music
              </Button>

      <div
        className="d-flex flex-column"
        style={{ height: "90vh", overflowY: "auto" }}
      >
        <BoxedInfo
          bodyClassDetails="p-0"
          classDetails="border-bottom-0"
          styleDetails={{
            position: "relative",
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          hasHeader={false}
        >
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ALBUM NAME</StyledTableCell>
                  <StyledTableCell align="center">TITLE</StyledTableCell>
                  <StyledTableCell align="center">GENRE</StyledTableCell>
                  <StyledTableCell align="center">CREATED AT</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ minHeight: "420px" }}>
                {currentData?.music?.map((row, idx) => {
                  return <Music row={row} key={idx} setSnackbarMesage={setSnackbarMesage} handleModalOpen={handleModalOpen}
                  />;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </BoxedInfo>
      </div>
      {!isLoading && isSuccess && (
        <Paper
          className="d-flex justify-content-center"
          style={{
            padding: "20px",
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          }}
          variant="outlined"
          square
        >
          <Pagination
            page={currentPage}
            color="primary"
            variant="outlined"
            shape="rounded"
            count={100}
            onChange={handlePageChange}
          />
        </Paper>
      )}
            <MusicUpdateModal modal_open={musicUpdateModal} handleModalClose={()=>setMusicUpdateModal(null)}
            setSnackbarMesage={setSnackbarMesage}
      / >

            <MusicAddModal modal_open={musicAddModal} handleModalClose={()=>setMusicAddModal(false)}
            setSnackbarMesage={setSnackbarMesage}
      / >

    </Box>
  );
}
