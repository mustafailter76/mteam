import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  removeFromCart,
  clearCart,
  closeCart
} from '../redux/cartSlice';

import gameService from '../services/gameService';
import { updateProfileBalance } from '../redux/userSlice';
import { toast } from "react-toastify";

function CartDrawer() {
  const dispatch = useDispatch();

  const { items, isOpen } = useSelector(state => state.cart);
  const { userId } = useSelector(state => state.auth);

  const [purchasing, setPurchasing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toFixed(2) : '0.00';
  };

  const total = items.reduce((sum, i) => sum + i.price, 0);
  const discountedTotal = items.length >= 2 ? total * 0.8 : total;
  
  const formattedTotal = formatPrice(total);
  const formattedDiscountedTotal = formatPrice(discountedTotal);
  const formattedSave = formatPrice(total - discountedTotal);

  const handleConfirmPurchase = async () => {
    if (purchasing || items.length < 2) return; 

    setPurchasing(true);
    setDialogOpen(false);

    try {
      const gameIds = items.map(i => i.id || i.gameId);
      const res = await gameService.purchaseBulkGames(userId, gameIds);

      dispatch(updateProfileBalance(res.newBalance || res.balance));
      dispatch(clearCart());
      dispatch(closeCart());

      toast.success("Purchase successful");
    } catch (err) {
      toast.error(err.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  const handlePurchaseClick = () => {
    if (items.length < 2) {
      toast.warning("You need at least 2 games in cart for bundle purchase");
      return;
    }
    setDialogOpen(true);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => dispatch(closeCart())}
      >
        <Box sx={{ width: 360, p: 3 }}>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight="bold">Your Cart</Typography>
            <IconButton onClick={() => dispatch(closeCart())}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {items.length === 0 && (
            <Typography color="text.secondary">
              Cart is empty
            </Typography>
          )}

          {items.map(game => (
            <Box
              key={game.id || game.gameId}
              sx={{ display: 'flex', mb: 2 }}
            >
              <img
                src={`/games/${game.photoUrl}`}
                alt={game.name}
                width={60}
              />
              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Typography fontWeight="bold">{game.name}</Typography>
                <Typography>{formatPrice(game.price)} ₺</Typography>
              </Box>
              <Button
                color="error"
                onClick={() =>
                  dispatch(removeFromCart(game.id || game.gameId))
                }
                disabled={purchasing}
              >
                Remove
              </Button>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography>Total: {formattedTotal} ₺</Typography>
          {items.length >= 2 && (
            <Typography color="success.main">
              Bundle Discount: {formattedDiscountedTotal} ₺
            </Typography>
          )}

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              fullWidth
              disabled={items.length < 2 || purchasing} 
              onClick={handlePurchaseClick}
            >
              {purchasing ? 'Processing...' : 'Purchase'}
              {items.length < 2 && ' (Need 2+ games)'}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => dispatch(clearCart())}
              disabled={items.length === 0 || purchasing}
            >
              Clear
            </Button>
          </Box>

          {items.length === 1 && (
            <Typography variant="caption" color="warning.main" sx={{ mt: 2, display: 'block' }}>
              Add at least one more game for bundle purchase
            </Typography>
          )}

        </Box>
      </Drawer>

      <Dialog
        open={dialogOpen}
        onClose={() => !purchasing && setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Purchase Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to buy these {items.length} games with bundle discount?
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Original total: {formattedTotal} ₺
            </Typography>
            <Typography variant="body2" color="success.main" fontWeight="bold">
              Bundle price: {formattedDiscountedTotal} ₺ (20% discount)
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              You save: {formattedSave} ₺
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDialogOpen(false)} 
            disabled={purchasing}
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmPurchase} 
            disabled={purchasing}
            variant="contained"
            color="primary"
            autoFocus
          >
            {purchasing ? "Processing..." : `Buy for ${formattedDiscountedTotal} ₺`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CartDrawer;