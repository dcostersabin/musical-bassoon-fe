import { useState } from "react";
import { useSearchParams } from "react-router-dom";
// mui
import {
  styled,
  Typography,
  TableCell,
  TableRow,
  Stack,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { MoreVert, Update } from "@mui/icons-material";
// icons and images
import { Eye, Trash } from "@phosphor-icons/react";

import { useDeleteUserMutation } from "../redux/dashboard.api";

// ----------------------------------------------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid",
    borderColor: theme.palette.grey[25],
    fontSize: 14,
    fontWeight: 600,
  },
  padding: "20px",
  [`&.${tableCellClasses.body}`]: {
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

// ----------------------------------------------------------------------

const User = ({ row, setSnackbarMesage, handleModalOpen, role }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const showUserDetail = () => {
    searchParams.set("id", row?.id);
    searchParams.set("page",1);
    setSearchParams(searchParams);
  };

  const [deleteUser] = useDeleteUserMutation();

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Typography variant="sideInfo">
          {row?.first_name} {row?.last_name}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="sideInfo">{row?.email}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="sideInfo">{row?.phone}</Typography>
      </StyledTableCell>
      <StyledTableCell>
        {row?.gender === "M" ? "Male" : row?.gender === "F" ? "False" : "Other"}
      </StyledTableCell>
      <StyledTableCell>{row?.created_at}</StyledTableCell>
      <StyledTableCell>{row?.updated_at}</StyledTableCell>
      <StyledTableCell>
        <Stack direction={"row"} justifyContent={"center"} gap={"14px"}>
          <Box sx={{ flex: "1 0 10% " }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MoreVert />
            </IconButton>
          </Box>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
          >
            {(searchParams.get("tab") === "artists" ||
              row?.role === 3) && (
                <MenuItem
                  onClick={() => {
                    showUserDetail();
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <Eye size={18} weight="bold" />
                  </ListItemIcon>
                  <Typography
                    sx={{ lineHeight: "1", padding: "4px 0px" }}
                    variant="subtitle4"
                  >
                    View Songs
                  </Typography>
                </MenuItem>
              )}
            <MenuItem
              onClick={() => {
                handleModalOpen(row);
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <Update size={18} weight="bold" />
              </ListItemIcon>
              <Typography
                sx={{ lineHeight: "1", padding: "4px 0px" }}
                variant="subtitle4"
              >
                Update
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                deleteUser({ id: row.id });
                setSnackbarMesage("Successfully Deleted");
                handleMenuClose();
              }}
            >
              <ListItemIcon>
                <Trash size={18} weight="bold" />
              </ListItemIcon>
              <Typography
                sx={{ lineHeight: "1", padding: "4px 0px" }}
                variant="subtitle4"
              >
                Delete
              </Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default User;
