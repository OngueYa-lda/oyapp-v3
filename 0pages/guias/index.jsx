import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/pages/Parceiros.module.css";

// components
import {
  Footer,
  Logo
} from "../../components";

// /guias/dashboard#servicos - vai para o link "Gerir servicos" 

const Guias = () =>
  <div className={styles.Container}>
    <Head>
      <title>Guiatur - OngueYa</title>
    </Head>

    <header>
      <div className={styles.Logo}>
        <Link href="/guias">
          <a>
            <Logo
              tipo="badge"
              width="140"
              height="140"
            />
          </a>
        </Link>
        <h2>Guiatur</h2>
      </div>
    </header>

    <main>
      <div className={styles.Ofertas}>
        <div>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSftHxyRUb5Z3GfmQMmc6hvnM1NxSE7J3ztBHlbPMDLh5NyXEQ/viewform">
            <a target="_blank">Registrar-se</a>
          </Link>
        </div>
        <div>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSez8XaAAHv0N-ld9r_VDP6EmffXccz6YnF-ZoUyzpPLihjteQ/viewform?usp=pp_url">
            <a target="_blank">Gerir Serviços</a>
          </Link>
        </div>
      </div>
    </main>

    <footer className={styles.footer}>
      <Footer.Copy />
      <Footer.Termos />
    </footer>
  </div>
;

export default Guias;
