import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar, Box, Toolbar, Typography,
  IconButton, Avatar, Button, Menu,
  MenuItem, Container, Badge
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import authService from "../services/authService.js";
import { logoutSuccess } from "../redux/authSlice";
import { clearProfile } from "../redux/userSlice";
import { clearCart, openCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(clearCart());
      dispatch(logoutSuccess());
      dispatch(clearProfile());
      setAnchorEl(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor:"#171a21", minHeight:"85px", justifyContent:"center" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display:"flex", justifyContent:"space-between" }}>
          <Box component={Link} to="/" sx={{ display:"flex", alignItems:"center", textDecoration:"none", gap:2 }}>
            <Typography variant="h5" sx={{ color:"#66c0f4", fontWeight:"bold", letterSpacing:1 }}>
              MTEAM
            </Typography>
          </Box>

          <Box sx={{ display:"flex", alignItems:"center", gap:3 }}>
            {!isAuthenticated ? (
              <>
                <Button component={Link} to="/login" color="inherit">Login</Button>
                <Button component={Link} to="/register" color="inherit">Register</Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/library" color="inherit">Library</Button>

                <IconButton onClick={() => dispatch(openCart())} sx={{ color:"white" }}>
                  <Badge badgeContent={items.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                  <Avatar sx={{ bgcolor:"#66c0f4" }} />
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={()=>{
                    setAnchorEl(null);
                    navigate("/profile");
                  }}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;