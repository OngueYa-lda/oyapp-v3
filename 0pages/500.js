import Link from "next/link";
import Head from "next/head";

import styles from "../styles/pages/Error.module.css";
import { Logo } from "../components";

const E500 = () => <>
  <Head>
    <title>Te perdemos - OngueYa</title>
  </Head>

  <div className={styles.Container}>
    <main>
      <Link href="/">
        <a><Logo /></a>
      </Link>

      <h1>500</h1>
    </main>
  </div>
</>;

export default E500;
