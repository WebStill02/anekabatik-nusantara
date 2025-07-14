import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { MonteCarlo, Bona_Nova } from 'next/font/google';

const monteCarlo = MonteCarlo({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-monte-carlo',
});

const bonaNova = Bona_Nova({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-bona-nova',
});

export const metadata = {
  title: 'Aneka Batik Nusantara - Beranda',
  description: 'Selamat datang di Aneka Batik Nusantara, jelajahi koleksi batik terbaik kami.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${monteCarlo.variable} ${bonaNova.variable}`}>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)', 
                    },
                  }}
                >
                  <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                    Aneka Batik Nusantara
                  </Link>
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Button color="inherit" component={Link} href="/">Beranda</Button>
                  <Button color="inherit" component={Link} href="/galeri">Galeri</Button>
                  <Button color="inherit" component={Link} href="/keranjang">Keranjang</Button>
                  <Button color="inherit" component={Link} href="/tentang-kami">Tentang Kami</Button>
                  <Button color="inherit" component={Link} href="/kontak">Kontak</Button>
                </Box>
              </Toolbar>
            </AppBar>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}