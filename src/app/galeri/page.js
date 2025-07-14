'use client';

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from 'next/link';
import { BATIK_API_URL, KERANJANG_API_URL } from '../../lib/api';
import { useInView } from 'react-intersection-observer'; 

function BatikCard({ batik, onAddToCart }) {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2,    
  });

  return (
    <Card
      ref={ref} 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        opacity: inView ? 1 : 0,
        boxShadow: inView ? '0px 5px 15px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <Link href={`/galeri/${batik.id}`} passHref>
        <Box sx={{ cursor: 'pointer' }}>
          <CardMedia
            component="img"
            height="200"
            image={batik.gambar || 'https://via.placeholder.com/200x200?text=No+Image'}
            alt={batik.nama}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div">
              {batik.nama}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold', mb: 1 }}>
              Rp {batik.harga ? batik.harga.toLocaleString('id-ID') : 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {batik.deskripsi || 'Deskripsi belum tersedia.'}
            </Typography>
          </CardContent>
        </Box>
      </Link>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(batik)}
          fullWidth
        >
          Tambah ke Keranjang
        </Button>
      </Box>
    </Card>
  );
}

export default function GaleriPage() {
  const [batikData, setBatikData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  useEffect(() => {
    fetch(BATIK_API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setBatikData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch batik data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (batikItem) => {
    setAlert({ show: false, message: '', severity: 'success' });

    try {
      const existingCartItems = await fetch(KERANJANG_API_URL).then(res => res.json());
      const existingItem = existingCartItems.find(item => item.id_batik === batikItem.id);

      if (existingItem) {
        const updatedJumlah = existingItem.jumlah + 1;
        await fetch(`${KERANJANG_API_URL}/${existingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jumlah: updatedJumlah }),
        });
        setAlert({ show: true, message: `${batikItem.nama} berhasil diupdate di keranjang!`, severity: 'info' });
      } else {
        await fetch(KERANJANG_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_batik: batikItem.id,
            nama: batikItem.nama,
            harga: batikItem.harga,
            gambar: batikItem.gambar,
            jumlah: 1,
          }),
        });
        setAlert({ show: true, message: `${batikItem.nama} berhasil ditambahkan ke keranjang!`, severity: 'success' });
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      setAlert({ show: true, message: `Gagal menambahkan ${batikItem.nama} ke keranjang.`, severity: 'error' });
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Memuat data batik...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Terjadi kesalahan saat memuat data batik: {error.message}. <br/>
          Pastikan MockAPI URL Anda benar dan server berjalan.
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Koleksi Batik Nusantara
      </Typography>
      {alert.show && (
        <Alert severity={alert.severity} onClose={() => setAlert({ show: false, message: '', severity: 'success' })} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <Grid container spacing={4}>
        {batikData.map((batik) => (
          <Grid item key={batik.id} xs={12} sm={6} md={4}>
            <BatikCard batik={batik} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}