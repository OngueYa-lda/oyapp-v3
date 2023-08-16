import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import styles from "../styles/pages/Dashboard.module.css";

// import {
//   Nav,
//   Footer
// } from '../components';

const userAuthTokKey = "oy-u-tok";

const Dashboard = props => {
  const { cookies } = props;
  const [session, setSession] = useState(null);

  const router = useRouter();

  const logout = useCallback(() => {
    cookies.remove(userAuthTokKey);
    setSession(null);
  }, [cookies]);

  useEffect(() => {
    const data = cookies.get(userAuthTokKey);
    if (!session && data) {
      setSession(data);
    }

    if (!data) {
      router.push("/");
    }

    if (data && data.error) {
      router.push(data.callbackUrl);
      logout();
    }
  }, [session, cookies, router, logout]);

  return (
    <>
      <Head>
        <title>Dashboard - OngueYa</title>
      </Head>

      {session && <>
        <div className={styles.Container}>
          <h1>Usuarios Dashboard em progresso...</h1>
          <p>
            <button onClick={() => {
              logout();
            }}>
            Sair
            </button>
          </p>
        </div>
      </>}
    </>
  );
};

export default Dashboard;
