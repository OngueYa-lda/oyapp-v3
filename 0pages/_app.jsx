import Head from "next/head";

import "../styles/colors.css";
import "../styles/globals.css";
import "../public/assets/simple-line-icons/css/simple-line-icons.css";

import {
  ErrorBoundary,
  ErrorFallback
} from "../components/ErrorBoundary";

import Cookies from "universal-cookie";

function MyApp({ Component, pageProps }) {
  pageProps.cookies = new Cookies();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OngueYa - Turismo, Viagens, Experiências & Pacotes turísticos</title>
        <meta name="title" content="OngueYa - Turismo, Viagens & Pacotes turísticos, experiências" />
        <meta name="description" content="OngueYa - plataforma digital de viagens e turismo" />
        <meta name="keywords" content="ongueya, turismo, viagens, experiencia, angola, hoteis, pacotes, resorts, guias, destinos, ferias, férias, hotéis" />
        <meta name="author" content="OngueYa" />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png" />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
