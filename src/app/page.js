'use client'; 

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link'; 
import Image from 'next/image'; 
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

   const [greetingText, setGreetingText] = useState("Welcome to");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGreetingText("Jelajahi");
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: 'calc(100vh - 64px)', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden', 
      }}
    >
    
      <Image
        src="/batikfoto.jpg" 
        alt="Background Batik"
        fill 
        style={{ objectFit: 'cover', zIndex: -1 }} 
        priority 
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 0,
        }}
      />

      <Container sx={{ zIndex: 1, position: 'relative', mt: { xs: -8, md: 0 } }}> 
        <Typography
          variant={isMobile ? "h5" : "h4"}
          gutterBottom
          sx={{
            fontFamily: 'var(--font-monte-carlo)', 
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            animation: 'fadeIn 2s ease-in-out', 
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            },
          }}
        >
          {greetingText}
        </Typography>
        <Typography
          variant={isMobile ? "h3" : "h1"}
          component="h1"
          sx={{
            fontFamily: 'var(--font-bona-nova)', 
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            mb: 4,
            animation: 'slideIn 1.5s ease-out', 
            '@keyframes slideIn': {
              '0%': { transform: 'translateY(20px)', opacity: 0 },
              '100%': { transform: 'translateY(0)', opacity: 1 },
            },
          }}
        >
          Batik Nusantara
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link} 
            href="/galeri"
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 20px rgba(0,0,0,0.4)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            LIHAT KOLEKSI BATIK
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            component={Link} 
            href="/keranjang"
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: theme.palette.primary.light,
                color: theme.palette.primary.light,
                backgroundColor: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
          >
            KERANJANG BELANJA
          </Button>
        </Box>
      </Container>
    </Box>
  );
}