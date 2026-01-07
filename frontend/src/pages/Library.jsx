import React, { useEffect, useState } from "react";
import { Container, Box, CircularProgress, Typography } from "@mui/material";
import libraryService from "../services/libraryService.js";
import { toast } from "react-toastify";
import LibraryGameCard from "../components/LibraryGameCard.jsx";

function Library() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchGames() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const data = await libraryService.getLibrary(userId);
        setGames(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [userId]);

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

  if (games.length === 0) {
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
        <Typography variant="h5" color="primary">
          No games in your library
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display:"flex", flexWrap:"wrap", gap:4, justifyContent:"center" }}>
        {games.map((game, index) => (
          <Box key={game.id || index} sx={{ width:{ xs:"100%", sm:"48%", md:"30%", lg:"22%" } }}>
            <LibraryGameCard game={game} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Library;