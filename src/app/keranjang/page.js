'use client'; 

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Divider, Paper, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { KERANJANG_API_URL } from '../../lib/api'; 

export default function KeranjangPage() {
  const [keranjangItems, setKeranjangItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });

  const fetchKeranjangItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(KERANJANG_API_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setKeranjangItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch cart items:", err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeranjangItems();
  }, []);

  const updateItemQuantity = async (itemId, newQuantity) => {
    setAlert({ show: false, message: '', severity: 'success' }); 
    if (newQuantity < 1) {
      await removeItem(itemId);
      return;
    }
    try {
      await fetch(`${KERANJANG_API_URL}/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jumlah: newQuantity }),
      });
      fetchKeranjangItems(); 
      setAlert({ show: true, message: 'Jumlah item berhasil diupdate.', severity: 'info' });
    } catch (err) {
      console.error("Error updating item quantity:", err);
      setAlert({ show: true, message: 'Gagal mengupdate jumlah item.', severity: 'error' });
    }
  };

  const removeItem = async (itemId) => {
    setAlert({ show: false, message: '', severity: 'success' }); 
    try {
      await fetch(`${KERANJANG_API_URL}/${itemId}`, {
        method: 'DELETE',
      });
      fetchKeranjangItems(); 
      setAlert({ show: true, message: 'Item berhasil dihapus dari keranjang.', severity: 'success' });
    } catch (err) {
      console.error("Error removing item:", err);
      setAlert({ show: true, message: 'Gagal menghapus item.', severity: 'error' });
    }
  };

  const totalHarga = keranjangItems.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Memuat keranjang...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">
          Terjadi kesalahan saat memuat keranjang: {error.message}. <br/>
          Pastikan MockAPI URL Anda benar dan server berjalan.
        </Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Keranjang Belanja Anda
      </Typography>
      {alert.show && (
        <Alert severity={alert.severity} onClose={() => setAlert({ show: false, message: '', severity: 'success' })} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      {keranjangItems.length === 0 ? (
        <Alert severity="info" sx={{ mt: 4 }}>
          Keranjang belanja Anda kosong. Yuk, <Button component={Link} href="/galeri">jelajahi batik</Button>!
        </Alert>
      ) : (
        <Paper elevation={3} sx={{ p: 3 }}>
          <List>
            {keranjangItems.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Button size="small" onClick={() => updateItemQuantity(item.id, item.jumlah - 1)}>
                        <RemoveIcon />
                      </Button>
                      <Typography variant="body1">{item.jumlah}</Typography>
                      <Button size="small" onClick={() => updateItemQuantity(item.id, item.jumlah + 1)}>
                        <AddIcon />
                      </Button>
                      <Button edge="end" aria-label="delete" onClick={() => removeItem(item.id)}>
                        <DeleteIcon color="error" />
                      </Button>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded" src={item.gambar || 'https://via.placeholder.com/50x50?text=Batik'} alt={item.nama} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.nama}
                    secondary={`Rp ${item.harga ? item.harga.toLocaleString('id-ID') : 'N/A'} x ${item.jumlah}`}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total Harga:</Typography>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
              Rp {totalHarga.toLocaleString('id-ID')}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Lanjutkan ke Pembayaran (Fitur belum aktif)
          </Button>
        </Paper>
      )}
    </Container>
  );
}