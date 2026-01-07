import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../services/authService";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Register() {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !nickname || !passwordAgain) {
      toast.warning("Nickname, email, and password are required");
      return;
    }
    if (!accepted) {
      toast.warning("You must accept the user agreement");
      return;
    }
    if (password !== passwordAgain) {
      toast.warning("The passwords must match");
      return;
    }

    try {
      await authService.register({ nickname, email, password });
      toast.success("Registration successful! You can now log in");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <Box sx={{ width:360, bgcolor:"#111", p:4, borderRadius:2, display:"flex", flexDirection:"column", gap:3 }}>

        <TextField
          label="Nickname"
          variant="standard"
          fullWidth
          value={nickname}
          onChange={e=>setNickname(e.target.value)}
          InputLabelProps={{ style:{ color:"#aaa" } }}
          InputProps={{ style:{ color:"#fff" } }}
          sx={{ "& .MuiInput-underline:before":{ borderBottomColor:"#555" } }}
        />

        <TextField
          label="Email"
          variant="standard"
          fullWidth
          value={email}
          onChange={e=>setEmail(e.target.value)}
          InputLabelProps={{ style:{ color:"#aaa" } }}
          InputProps={{ style:{ color:"#fff" } }}
          sx={{ "& .MuiInput-underline:before":{ borderBottomColor:"#555" } }}
        />

        <TextField
          label="Password"
          variant="standard"
          type="password"
          fullWidth
          value={password}
          onChange={e=>setPassword(e.target.value)}
          InputLabelProps={{ style:{ color:"#aaa" } }}
          InputProps={{ style:{ color:"#fff" } }}
          sx={{ "& .MuiInput-underline:before":{ borderBottomColor:"#555" } }}
        />

        <TextField
          label="Password Again"
          variant="standard"
          type="password"
          fullWidth
          value={passwordAgain}
          onChange={e=>setPasswordAgain(e.target.value)}
          InputProps={{ style:{ color:"#fff" } }}
          InputLabelProps={{ style:{ color:"#aaa" } }}
          sx={{ "& .MuiInput-underline:before":{ borderBottomColor:"#555" } }}
        />

        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={accepted} onChange={e=>setAccepted(e.target.checked)} />}
            label="I accept the user agreement"
            sx={{ color:"#ccc" }}
          />
        </FormGroup>

        <Button fullWidth variant="contained" onClick={handleRegister} sx={{ mt:2 }}>
          Register
        </Button>

      </Box>
    </Box>
  );
}

export default Register;
