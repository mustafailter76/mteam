import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

import authService from "../services/authService.js";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";

function Login(){

  const navigate = useNavigate();
  const dispatch = useDispatch();

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      toast.warning("Email and password are required");
      return;
    }

    try{

      var data = await authService.login({ email, password });

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        dispatch(loginSuccess(data));
        navigate("/");
      }, 1500);

    } catch(err) {
      toast.error(err.message || "Login failed");
    }

  };

  return (
    <Box sx={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Box sx={{ width:360, backgroundColor:"#111", p:4, borderRadius:2, display:"flex", flexDirection:"column", gap:3 }}>

        <TextField
          label="Email"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          InputLabelProps={{ style:{ color:"#aaa" } }}
          InputProps={{ style:{ color:"#fff" } }}
        />

        <TextField
          label="Password"
          variant="standard"
          type="password"
          fullWidth
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          InputLabelProps={{ style:{ color:"#aaa" } }}
          InputProps={{ style:{ color:"#fff" } }}
        />

        <Button fullWidth variant="contained" sx={{ mt:2 }} onClick={handleLogin}>
          Login
        </Button>

      </Box>
    </Box>
  );

}

export default Login;
