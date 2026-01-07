import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions
} from '@mui/material';

function GameCard({ game }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="220"
          image={`/games/${game.photoUrl}`}
          alt={game.name}
          sx={{ objectFit: 'cover' }}
        />

        <CardContent>
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              minHeight: 48,
            }}
          >
            {game.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Typography sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          {game.price} $
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/game/${game.id}`)}
        >
          Review
        </Button>
      </CardActions>
    </Card>
  );
}

export default GameCard;
