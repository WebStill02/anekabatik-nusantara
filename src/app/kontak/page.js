'use client';

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material'; // Pastikan Container juga diimport
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function KontakPage() {
    const [formData, setFormData] = useState({
        namaLengkap: '',
        email: '',
        pesan: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}> 
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', mb: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Kirimkan Pesan Anda
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nama Lengkap *"
                        name="namaLengkap"
                        value={formData.namaLengkap}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Pesan Anda *"
                        name="pesan"
                        value={formData.pesan}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}> 
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            KIRIM PESAN
                        </Button>
                    </Box>
                </form>
            </Box>
            <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px', bgcolor: 'background.paper' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Informasi Kontak
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1 }} />
                    <Typography>+62 812-3456-7890</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 1 }} />
                    <Typography>info@anekabatiknusantara.com</Typography>
                </Box>
            </Box>
        </Container>
    );
}