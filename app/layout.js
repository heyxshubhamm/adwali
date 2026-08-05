import './globals.css';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = { title: 'adwali' };
export const viewport = { themeColor: '#FAF4EA' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="nM6sCOVI_JEYnYozVZahrAVGr4rV8KJKpf2R8djHMkw" />
        <meta name="google-site-verification" content="google2bf72ba5c5a88170" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K7V3J5PZRP"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K7V3J5PZRP');
          `
        }} />
      </head>
      <body>
        <link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjIyIiBmaWxsPSIjMTcxMTBGIi8+CiAgPHBhdGggdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNi40MiA3NS4wMCkgc2NhbGUoMC4wNjc4MCAtMC4wNjc4MCkiIGZpbGw9IiNGQUY0RUEiIGQ9Ik01MDQgMTA3SDI2OEwyMzMgMEgwTDI1OSA3MDhINTE1TDc3MyAwSDUzOVpNNDUwIDI3NCAzODYgNDcxIDMyMiAyNzRaTTEwMjAgNzA4VjBINzk4VjcwOFoiLz4KICA8Y2lyY2xlIGN4PSI4NC42IiBjeT0iNzEuMCIgcj0iNy41IiBmaWxsPSIjRkYyRDZCIi8+Cjwvc3ZnPg==" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
