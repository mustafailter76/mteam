import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box
} from '@mui/material';
import { formatDate } from '../util/formatDate';

function LibraryGameCard({ game }) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={`/games/${game.photoUrl}`}
          alt={game.name}
          sx={{
            objectFit: 'cover'
          }}
        />

        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.3
              }}
            >
              {game.name}
            </Typography>

            <Typography
              sx={{
                fontSize: '0.9rem',
                color: 'text.secondary'
              }}
            >
              Purchased: {formatDate(game.purchaseDate)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default LibraryGameCard;
