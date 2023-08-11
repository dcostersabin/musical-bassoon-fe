import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useListUsersQuery } from "../redux/dashboard.api";
import TabNavigation from "../../../components/tabNavigation";
import BoxedInfo from "../../../components/boxedInfo";
import User from "./user";

import {
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
  Snackbar,
  Alert,
} from "@mui/material";

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: "1px solid",
  borderColor: theme.palette.grey[25],
  cursor: "pointer",

  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[10],
  },
}));

const Home = () => {
  let tabs = [
    { label: "Super Admins", value: "" },
    { label: "Artist Managers", value: "managers" },
    { label: "Artists", value: "artists" },
  ];
  const [open, setOpen] = useState(false);

  const [snacbarMessage, setSnackbarMesage] = useState(null);

  const snacbarOpen = Boolean(snacbarMessage);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarMesage(null);
  };

  const {
    data: response,
    isSuccess,
    isLoading,
  } = useListUsersQuery({
    page: currentPage,
    role: tab === "managers" ? 2 : "artists" === tab ? 3 : 1,
  });
  console.log(response);
  return (
    <>
      <TabNavigation
        tabs={tabs}
        tabType="params"
        tabName="tab"
        styleDetails={{
          ".MuiTabs-root": {
            padding: "0 16px",
            ".MuiTab-root": {
              padding: "0px 16px",
              minHeight: "60px",
            },
          },
        }}
      >
        <Box sx={{ padding: "0rem 1.5rem" }}>
          <div
            className="d-flex flex-column"
            style={{ height: "60vh", overflowY: "auto" }}
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
                      <StyledTableCell>NAME</StyledTableCell>
                      <StyledTableCell align="center">
                        EMAIL ADDRESS
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        CONTACT NUMBER
                      </StyledTableCell>
                      <StyledTableCell align="center">GENDER</StyledTableCell>
                      <StyledTableCell align="center">
                        CREATED AT
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        UPDATED AT
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ minHeight: "420px" }}>
                    {response?.user?.map((row, key) => (
                      <User
                        row={row}
                        open={open}
                        setOpen={setOpen}
                        isSubmitting={isSubmitting}
                        setSnackbarMesage={setSnackbarMesage}
                        key={key}
                      />
                    ))}
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
        </Box>
      </TabNavigation>
      <Snackbar
        open={snacbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snacbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Home;
