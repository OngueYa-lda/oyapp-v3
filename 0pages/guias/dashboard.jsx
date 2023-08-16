import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import styles from "../../styles/pages/Dashboard.module.css";

// import {
//   Nav,
//   Footer
// } from '../../components';

const config = {
  authTokenKey: "oy-g-tok",
  login: "/guias/login",
  path: "/guias"
};

const Dashboard = props => {
  const { cookies } = props;
  const [session, setSession] = useState(null);

  const router = useRouter();

  const logout = useCallback(() => {
    cookies.remove(config.authTokenKey);
    setSession(null);
  }, [cookies]);

  useEffect(() => {
    const data = cookies.get(config.authTokenKey);
    if (!session && data) {
      setSession(data);
    }

    if (!data) {
      router.push(config.login);
    }

    if (data && data.error) {
      router.push(data.callbackUrl);
      logout();
    }
  }, [session, cookies, router, logout]);

  return (
    <>
      <Head>
        <title>Dashboard - Guiatur - OngueYa</title>
      </Head>

      {session && <>
        <div className={styles.Container}>
          <h1>Guiatur Dashboard em progresso...</h1>
          <p>
            <button onClick={() => {
              logout();
            }}>
            Sair
            </button>
          </p>
        </div>
      </>
      }
    </>
  );
};

export default Dashboard;
