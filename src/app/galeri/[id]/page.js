'use client'; 

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Button, CardMedia, Paper } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { BATIK_API_URL, KERANJANG_API_URL } from '../../../lib/api'; 
import { useParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer'; 

export default function BatikDetailPage() {
  const { id } = useParams();
  const [batik, setBatik] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  // Hooks untuk animasi reveal
  const [refDetails, inViewDetails] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refImage, inViewImage] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refAbout, inViewAbout] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError(new Error("ID Batik tidak ditemukan di URL."));
      return;
    }

    const fetchBatikDetail = async () => {
      try {
        const res = await fetch(`${BATIK_API_URL}/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Batik tidak ditemukan.");
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBatik(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch batik detail:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchBatikDetail();
  }, [id]);

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
            gambar: batikItem.gambarUrl, 
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
        <Typography variant="h6" sx={{ ml: 2 }}>Memuat detail batik...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Terjadi kesalahan saat memuat detail batik: {error.message}.
          <br />Pastikan ID batik benar dan MockAPI..io berjalan.
        </Alert>
      </Container>
    );
  }

  if (!batik) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="warning">Batik dengan ID {id} tidak ditemukan.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}
        ref={refDetails}
        className={`animate-fade-in ${inViewDetails ? 'is-visible' : ''}`}
      >
        <Box sx={{ flex: 1, maxWidth: { md: '50%' } }}>
          <CardMedia
            component="img"
            image={batik.gambarUrl || 'https://via.placeholder.com/600x400?text=No+Image'} 
            alt={batik.nama}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: 3
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {batik.nama}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
            Rp {batik.harga ? batik.harga.toLocaleString('id-ID') : 'N/A'}
          </Typography>
          <Typography variant="body1" paragraph>
            {batik.deskripsi || 'Deskripsi belum tersedia untuk batik ini.'}
          </Typography>
          {alert.show && (
            <Alert severity={alert.severity} onClose={() => setAlert({ show: false, message: '', severity: 'success' })} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
          )}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => handleAddToCart(batik)}
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
          >
            Tambah ke Keranjang
          </Button>
        </Box>
      </Box>
      <Paper
        elevation={2}
        sx={{ p: 3, mt: 4 }}
        ref={refAbout}
        className={`animate-on-scroll ${inViewAbout ? 'is-visible' : ''}`}
      >
        <Typography variant="h6" gutterBottom>Tentang Batik Ini</Typography>
        <Typography variant="body2" color="text.secondary">
          Batik ini adalah contoh keindahan seni tradisional Indonesia yang kaya akan makna dan sejarah. Cocok untuk berbagai acara, dari formal hingga santai.
        </Typography>
      </Paper>
    </Container>
  );
}