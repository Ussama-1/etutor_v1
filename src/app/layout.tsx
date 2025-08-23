import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
// import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
// import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { AuthProvider } from './AuthProvider';
import '../lib/db-init';

const roboto = Roboto_Condensed({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'eTutor4me',
  description: 'eTutor4me',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='overflow-x-hidden' lang='en'>
      {/* <head>
        <link rel="icon" href="/favicon.svg" />
        <GoogleTagManager gtmId="GTM-WVPLPXVD" />
      </head> */}
      <body
        className={`${roboto.className} overflow-x-hidden !max-w-[1920px] mx-auto`}
      >
        {/* <Navbar /> */}
        <AuthProvider>
          {/* <FpjsProvider loadOptions={{ apiKey: "5CFmbtLKAsYYDhlA8LYG"}}>
            <GoogleAnalytics gaId="G-T11SY5B3KQ" />
            {children}
            <Toaster />
            <SpeedInsights/>
          </FpjsProvider> */}
          {children}
          <Toaster />
        </AuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
