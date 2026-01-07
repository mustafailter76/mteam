import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import gameService from '../services/gameService';
import GameCard from '../components/GameCard';

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gameService.getAllGames();
        setGames(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <Container 
        maxWidth="xl" 
        sx={{ 
          py: 5, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {games.map(game => (
          <Box
            key={game.id}
            sx={{
              width: {
                xs: '100%',
                sm: '48%',
                md: '30%',
                lg: '22%',
              },
            }}
          >
            <GameCard game={game} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Home;