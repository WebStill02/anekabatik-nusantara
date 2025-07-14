'use client';

import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer'; 

export default function AboutUsPage() {
  const [refTitle, inViewTitle] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refImage, inViewImage] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refVisi, inViewVisi] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [refWhyChooseUs, inViewWhyChooseUs] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        ref={refTitle} 
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        className={`animate-fade-in ${inViewTitle ? 'is-visible' : ''}`} 
      >
        Tentang Aneka Batik Nusantara
      </Typography>


      <Box
        ref={refImage} 
        sx={{
          display: 'block',
          maxWidth: { xs: '100%', sm: '75%', md: '55%' },
          mx: 'auto',
          mt: 3,
          mb: 4,
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03) rotate(1deg)',
            boxShadow: '0px 8px 25px rgba(0,0,0,0.2)',
          },
        }}
        className={`animate-on-scroll ${inViewImage ? 'is-visible' : ''}`} // Terapkan kelas animasi
      >
        <Image
          src="/batikfoto.jpg"
          alt="Batik Indonesia"
          width={800}
          height={450}
          layout="responsive"
          style={{
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Paper
        ref={refVisi} 
        elevation={3}
        sx={{ p: 3, mt: 3, mb: 4 }}
        className={`animate-on-scroll ${inViewVisi ? 'is-visible' : ''}`} // Terapkan kelas animasi
      >
        <Typography variant="h5" gutterBottom>
          Visi Kami
        </Typography>
        <Typography paragraph>
          Aneka Batik Nusantara hadir sebagai jembatan yang menghubungkan keindahan warisan budaya Indonesia, batik, dengan generasi masa kini. Kami berkomitmen untuk melestarikan dan memperkenalkan kekayaan motif serta filosofi di balik setiap helai kain batik dari berbagai penjuru Nusantara.
        </Typography>
        <Typography paragraph>
          Setiap produk yang kami hadirkan adalah cerminan dari dedikasi pengrajin lokal, dikerjakan dengan hati-hati dan penuh makna, membawa esensi keindahan dan nilai luhur Indonesia.
        </Typography>
      </Paper>
      
      <Box
        ref={refWhyChooseUs}
        sx={{ mt: 4 }}
        className={`animate-fade-in ${inViewWhyChooseUs ? 'is-visible' : ''}`} // Terapkan kelas animasi
      >
        <Typography variant="h5" gutterBottom align="center">
          Mengapa Memilih Kami?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }} className={`animate-slide-left ${inViewWhyChooseUs ? 'is-visible' : ''}`}>
              <Typography variant="h6" gutterBottom>Kualitas Terjamin</Typography>
              <Typography variant="body2" color="text.secondary">
                Setiap batik yang kami tawarkan telah melalui proses seleksi ketat untuk memastikan kualitas terbaik.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }} className={`animate-on-scroll ${inViewWhyChooseUs ? 'is-visible' : ''}`}>
              <Typography variant="h6" gutterBottom>Dukungan Pengrajin Lokal</Typography>
              <Typography variant="body2" color="text.secondary">
                Dengan membeli produk kami, Anda turut serta dalam mendukung kesejahteraan pengrajin batik tradisional Indonesia.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, height: '100%' }} className={`animate-slide-right ${inViewWhyChooseUs ? 'is-visible' : ''}`}>
              <Typography variant="h6" gutterBottom>Ragam Motif Unik</Typography>
              <Typography variant="body2" color="text.secondary">
                Temukan koleksi batik dengan motif yang beragam, merepresentasikan kekayaan budaya dari Sabang hingga Merauke.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}