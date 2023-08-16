import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/pages/Parceiros.module.css";

// components
import {
  Footer,
  Logo
} from "../../components";

// parceiros/dashboard#gerir - vai no link "Gerir propriedades"

const Parceiros = () =>
  <div className={styles.Container}>
    <Head>
      <title>OngueYa - Parceiros</title>
    </Head>

    <header>
      <div className={styles.Logo}>
        <Link href="/parceiros">
          <a>
            <Logo
              tipo="badge"
              width="140"
              height="140"
            />
          </a>
        </Link>
        <h2>Parceiros</h2>
      </div>
    </header>

    <main>
      <div className={styles.Ofertas}>
        <div>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfeEjquGmh-_D-nV1OL4PtdurYQN5PaisNTZI26L9-A244tDg/viewform?usp=pp_url">
            <a target="_blank">Listar propriedades</a>
          </Link>
        </div>
        <div>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfA5FZPmimr8YtrYNqSt0R5eape1o5wEe1aBLa3-xvyup2wTg/viewform?usp=pp_url">
            <a target="_blank">Gerir quartos</a>
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

export default Parceiros;
