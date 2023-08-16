import Head from "next/head";
import ReactMarkdown from "react-markdown";

import styles from "../styles/pages/Termos.module.css";

import { Logo, Footer } from "../components";

const Termos = props => {
  const { data } = props;

  return (
    <>
      <Head>
        <title>Termos de uso - OngueYa</title>
      </Head>

      <div className={styles.Container}>
        <Logo />

        <main className={styles.Content}>
          <h1>Termos de uso</h1>
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

export default Termos;

export async function getStaticProps() {
  const termosDeUso = "politicas/TERMOS_DE_USO.md";

  const fs = await import("fs/promises");
  const data = (await fs.readFile(termosDeUso)).toString();

  return {
    props: {
      data
    }
  };
}
