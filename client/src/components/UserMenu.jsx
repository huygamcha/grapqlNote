import { Typography, Avatar, Menu, MenuItem, Box } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import LogoutIcon from "@mui/icons-material/Logout";
function UserMenu() {
  const {
    user: { photoURL, auth, displayName },
  } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    auth.signOut();
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box display="flex" onClick={handleClick}>
        <Typography>{displayName} </Typography>
        <Avatar
          alt="avatar"
          src={photoURL}
          sx={{ width: 24, height: 24, marginLeft: "5px" }}
        />
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;
