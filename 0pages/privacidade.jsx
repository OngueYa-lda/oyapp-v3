import Head from "next/head";
import ReactMarkdown from "react-markdown";

import styles from "../styles/pages/Termos.module.css";

import { Logo, Footer } from "../components";

const Privacidade = props => {
  const { data } = props;

  return (
    <>
      <Head>
        <title>Políticas de privacidade - OngueYa</title>
      </Head>

      <div className={styles.Container}>
        <Logo />

        <main className={styles.Content}>
          <h1>Políticas de Privacidade</h1>
          <div className={styles.Text}>
            <ReactMarkdown>
              {data}
            </ReactMarkdown>
          </div>
        </main>

        <div className={styles.Footer}>
          <Footer.Copy />
        </div>
      </div>
    </>
  );
};

export default Privacidade;

export async function getStaticProps() {
  const privacidade = "politicas/PRIVACIDADE.md";

  const fs = await import("fs/promises");
  const data = (await fs.readFile(privacidade)).toString();

  return {
    props: {
      data
    }
  };
}
