'use client'; 

import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Typography, TextField, Button, Container, Grid } from '@mui/material';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    pesan: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' }); 

    if (!formData.nama || !formData.email || !formData.pesan) {
      setStatus({ type: 'error', message: 'Semua kolom harus diisi!' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus({ type: 'error', message: 'Format email tidak valid.' });
      return;
    }

    console.log('Mengirim pesan:', formData);
    setStatus({ type: 'success', message: 'Pesan Anda telah terkirim! Terima kasih.' });
    setFormData({ nama: '', email: '', pesan: '' }); 
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Hubungi Kami
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Kirimkan Pesan Anda</Typography>
            {status.message && (
              <Alert severity={status.type} sx={{ mb: 2 }}>
                {status.message}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Pesan Anda"
                name="pesan"
                value={formData.pesan}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                sx={{ mt: 2 }}
              >
                Kirim Pesan
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom>Informasi Kontak</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body1">+62 812-3456-7890</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography variant="body1">info@anekabatiknusantara.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography variant="body1">
                Jl. Raya Batik No. 123, <br />
                Kota Semarang, Jawa Tengah, <br />
                Indonesia
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}