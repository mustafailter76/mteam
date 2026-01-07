import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';

import gameService from '../services/gameService'; 
import { updateProfileBalance } from '../redux/userSlice';
import { addToCart } from '../redux/cartSlice';
import { formatDate } from '../util/formatDate';
import { toast } from "react-toastify";

function GameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector(state => state.users.profile);
  const { isAuthenticated, userId } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const data = await gameService.getGameById(id);
        setGame(data);
      } catch (err) {
        toast.error(err.message || "Game data could not be loaded.");
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warning("You must log in to add to cart.");
      return;
    }
    
    if (!profile) {
      toast.error("User information could not be loaded.");
      return;
    }
    
    if (!game) {
      toast.error("Game information is not available.");
      return;
    }

    const alreadyInCart = cartItems.some(item => item.id === game.id);
    
    if (alreadyInCart) {
      toast.warning("This game is already in your cart.");
      return;
    }

    dispatch(addToCart(game));
    toast.success("Added to cart for bundle discount.");
  };

  const handleBuyClick = () => {
    if (!isAuthenticated) {
      toast.warning("You must log in to purchase.");
      return;
    }
    
    if (!profile) {
      toast.error("User information could not be loaded.");
      return;
    }
    
    if (!game) {
      toast.error("Game information is not available.");
      return;
    }

    const userBalance = Number(profile.balance) || 0;
    const gamePrice = Number(game.price) || 0;
    
    if (userBalance < gamePrice) {
      toast.error("Your balance is insufficient.");
      return;
    }
    
    setDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!userId || !game) return;

    setPurchasing(true);
    try {
      const result = await gameService.purchaseGame(userId, game.id);
      
      dispatch(updateProfileBalance(result.newBalance || result.balance));
      toast.success("The game has been purchased successfully.");
      
    } catch (err) {
      toast.error(err.message || "Purchase failed");
    } finally {
      setPurchasing(false);
      setDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!game) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          Game not found
        </Typography>
      </Container>
    );
  }

  // Format fiyat fonksiyonu
  const formatPrice = (price) => {
    const numPrice = Number(price);
    return !isNaN(numPrice) ? numPrice.toFixed(2) : '0.00';
  };

  // Hesaplanmış değerler
  const userBalance = Number(profile?.balance) || 0;
  const gamePrice = Number(game.price) || 0;
  const balanceAfterPurchase = userBalance - gamePrice;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 6, overflow: 'hidden' }}>
        <Box
          component="img"
          src={`/games/${game.photoUrl}`}
          alt={game.name}
          sx={{ width: '100%', height: 380, objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = '/images/game-placeholder.jpg';
          }}
        />

        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            <Typography variant="h4" fontWeight="bold">
              {game.name}
            </Typography>

            {game.releaseDate && (
              <Typography color="text.secondary">
                Release Date: {formatDate(game.releaseDate)}
              </Typography>
            )}

            {game.category && (
              <Typography color="text.secondary">
                Category: {game.category}
              </Typography>
            )}

            {game.developer && (
              <Typography color="text.secondary">
                Developer: {game.developer}
              </Typography>
            )}

            <Divider />
            
            <Typography sx={{ lineHeight: 1.7, whiteSpace: 'pre-line' }}>
              {game.description}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                {formatPrice(game.price)} ₺
              </Typography>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleAddToCart}
                  disabled={!isAuthenticated || !profile || cartItems.some(item => item.id === game.id)}
                  sx={{ px: 3, py: 1.5, fontWeight: 'bold', textTransform: 'none' }}
                >
                  <Box sx={{ textAlign: 'center', lineHeight: 1.1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Add to Cart</Typography>
                    <Typography sx={{ fontSize: '0.7rem', opacity: 0.7, mt: 0.3 }}>For bundle discounts</Typography>
                  </Box>
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBuyClick}
                  disabled={!isAuthenticated || !profile || userBalance < gamePrice}
                  sx={{ px: 4, py: 1.2, fontWeight: 'bold' }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

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
            Do you want to buy "<strong>{game.name}</strong>"?
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Price: {formatPrice(game.price)} ₺
            </Typography>
            {profile && (
              <Typography variant="body2" color="text.secondary">
                Your balance after purchase: {formatPrice(balanceAfterPurchase)} ₺
              </Typography>
            )}
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
            {purchasing ? "Processing..." : "Confirm Purchase"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default GameDetail;