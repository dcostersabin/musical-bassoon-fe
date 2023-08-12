import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useListMusicQuery } from "../redux/music.api";
import { useSelector } from "react-redux";
import BoxedInfo from "../../../components/boxedInfo";
import MusicUpdateModal from "./music_update_modal"
import MusicAddModal from "./music_create_modal"
import {useLazyDumpMusicQuery} from "../redux/dump.api"
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

  const { id,role} = useSelector((state) => state.auth.user);

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { currentData, isLoading, isSuccess } = useListMusicQuery({
    user_id: music_id || id,
    page: currentPage,
  });

  const [trigger] = useLazyDumpMusicQuery();

  const dump = async ()=>{

    const response = await trigger({artist_id:music_id,page:currentPage});
    console.log(response);
    if (response.isSuccess) {
      // Create a temporary URL object from the blob
      const url = URL.createObjectURL(response?.data);

      // Create a temporary anchor element and set its href to the URL
      const a = document.createElement('a');
      a.href = url;

      // Set the anchor element's download attribute to the file name
      a.download = `dump.csv`;

      // Programmatically click the anchor element to initiate the download
      a.click();

      // Clean up the temporary objects
      URL.revokeObjectURL(url);
      a.remove();

      return true;
    }

    return false;
  }



  const handleModalOpen = (music_data) => {
    setMusicUpdateModal(music_data);
  };

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ padding: "0rem 1.5rem" }} >
    {role === 3 &&
                  <Button variant="outlined" onClick={() => setMusicAddModal(true)}>
                Add Music
              </Button>
              }

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
        <div>
        {role === 2 &&
                          <Button classDetails="mb-2" variant="outlined" onClick={()=>(dump())}>
                Export Data
              </Button>
              }

        </div>
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
                  return <Music role={role} row={row} key={idx} setSnackbarMesage={setSnackbarMesage} handleModalOpen={handleModalOpen}
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
