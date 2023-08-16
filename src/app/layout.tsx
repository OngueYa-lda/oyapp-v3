import { Inter } from "next/font/google";
import { Metadata } from 'next'
import Cookies from 'universal-cookie'
import ClientOnly from "../../components/ClientOnly/ClientOnly";

import "./globals.css";

//Components

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OngueYa - Experiências & Viagens',
  description: 'OngueYa - plataforma digital de experiências turísticas'
}

function RootLayout({ pageProps, children }) {
  pageProps = new Cookies();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          {children}
        </ClientOnly>
      </body>
    </html>
  );
}

export default RootLayout;
