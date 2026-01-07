import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import userService from "../services/userService";   
import { setProfile, updateProfileBalance, clearProfile } from "../redux/userSlice";
import { logoutSuccess } from "../redux/authSlice";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector(state => state.users);
  const { userId } = useSelector(state => state.auth);

  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [moneyDialogOpen, setMoneyDialogOpen] = useState(false);
  const [moneyType, setMoneyType] = useState("deposit");
  const [moneyAmount, setMoneyAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!userId) {
        setLoading(false);
        navigate("/login"); 
        return;
      }
      try {
        const data = await userService.getUserProfile(userId); 
        dispatch(setProfile(data));
      } catch (err) {
        toast.error(err.message || "Profile could not be loaded");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userId, dispatch, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleMoneyConfirm = async () => {
    if (!moneyAmount || Number(moneyAmount) <= 0) {
      toast.warning("Please enter a valid amount");
      return;
    }

    if (moneyType === "withdraw" && Number(moneyAmount) > profile.balance) {
      toast.warning("Insufficient balance");
      return;
    }

    setProcessing(true);
    try {
      const res = moneyType === "deposit"
        ? await userService.depositBalance(userId, moneyAmount)
        : await userService.withdrawBalance(userId, moneyAmount);

      dispatch(updateProfileBalance(res.balance)); 
      toast.success(moneyType === "deposit" ? "Deposit successful" : "Withdrawal successful");

    } catch (err) {
      toast.error(err.message || "Transaction failed");
    } finally {
      setMoneyAmount("");
      setMoneyDialogOpen(false);
      setMoneyType("deposit");
      setProcessing(false);
    }
  };

  const handleDeleteAccount = async () => {
    setProcessing(true);
    try {
      await userService.deleteUserAccount(userId); 
      dispatch(clearCart());
      dispatch(clearProfile());
      dispatch(logoutSuccess());
      toast.success("Account deleted successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Account deletion failed");
    } finally {
      setDeleteDialogOpen(false);
      setProcessing(false);
    }
  };

  const handleMoneyDialogOpen = (type) => {
    setMoneyType(type);
    setMoneyDialogOpen(true);
  };

  if (!profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 6, p: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          My Profile
        </Typography>
        
        <TextField 
          label="Nickname" 
          fullWidth 
          margin="normal" 
          value={profile.nickname || ""} 
          InputProps={{ readOnly: true }}
        />
        
        <TextField 
          label="Email" 
          fullWidth 
          margin="normal" 
          value={profile.email || ""} 
          InputProps={{ readOnly: true }}
        />
        
        <TextField 
          label="Balance" 
          fullWidth 
          margin="normal" 
          value={`${profile.balance || 0} ₺`} 
          InputProps={{ readOnly: true }}
        />

        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            onClick={() => handleMoneyDialogOpen("deposit")}
            sx={{ flex: 1, minWidth: 120 }}
            disabled={processing}
          >
            Deposit
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            color="secondary"
            onClick={() => handleMoneyDialogOpen("withdraw")}
            sx={{ flex: 1, minWidth: 120 }}
            disabled={processing}
          >
            Withdraw
          </Button>
        </Box>

        <Button 
          variant="outlined" 
          color="error" 
          fullWidth 
          sx={{ mt: 4 }}
          onClick={() => setDeleteDialogOpen(true)}
          disabled={processing}
        >
          Delete Account
        </Button>
      </Paper>

      <Dialog
        open={moneyDialogOpen}
        onClose={() => !processing && setMoneyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {moneyType === "deposit" ? "Deposit Money" : "Withdraw Money"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {moneyType === "deposit" 
              ? "Enter the amount you want to deposit:" 
              : "Enter the amount you want to withdraw:"}
          </DialogContentText>
          <TextField 
            autoFocus 
            fullWidth 
            type="number"
            label="Amount (₺)"
            value={moneyAmount}
            onChange={e => setMoneyAmount(e.target.value)}
            margin="normal"
            inputProps={{ min: 1 }}
            disabled={processing}
          />
          {moneyType === "withdraw" && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Available balance: {profile.balance} ₺
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setMoneyDialogOpen(false)} 
            disabled={processing}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleMoneyConfirm} 
            disabled={processing}
            variant="contained"
            color={moneyType === "deposit" ? "primary" : "secondary"}
            autoFocus
          >
            {processing ? "Processing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => !processing && setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Delete Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            disabled={processing}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteAccount} 
            disabled={processing}
            variant="contained"
            color="error"
            autoFocus
          >
            {processing ? "Processing..." : "Yes, Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Profile;