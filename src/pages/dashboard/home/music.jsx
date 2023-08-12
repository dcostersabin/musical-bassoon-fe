import { useState } from "react";
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
import { Trash } from "@phosphor-icons/react";

import { useDeleteMusicMutation} from "../redux/music.api";

// ----------------------------------------------------------------------

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottom: "1px solid",
    borderColor: theme.palette.grey[25],
    fontSize: 14,
    fontWeight: 600,
  },
  padding: "15px",
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

const Music = ({ role,row,setSnackbarMesage,handleModalOpen}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [deleteMusic] = useDeleteMusicMutation();

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Typography variant="sideInfo">
          {row?.album_name}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="sideInfo">{row?.title}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="sideInfo">{row?.genre}</Typography>
      </StyledTableCell>
      <StyledTableCell>{row?.created_at}</StyledTableCell>
      <StyledTableCell>

        {role === 3 &&
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
              <MenuItem
                onClick={()=>{
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
                onClick={()=>{deleteMusic({music_id:row.id});setSnackbarMesage("Music Deleted Successfully");handleMenuClose()}}
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

        }
      </StyledTableCell>

    </StyledTableRow>
  );
};

export default Music;
