import Head from "next/head";

import styles from "../styles/pages/Page.module.css";

// image
import bannerImg from "../public/assets/imagens/fundo/taxi2.svg";

// components
import {
  Banner,
  Nav,
  Footer,
  Card,
  Empty
} from "../components";
import { apiFetch } from "../util/fetch";

const Resorts = props => {
  const { data, cookies } = props;
  const items = data.data;
  const dataCount = items?.length || 0;
  const path = "resorts";

  return (
    <>
      <Head>
        <title>Resorts - OngueYa</title>
      </Head>

      <Nav cookies={cookies} withTravelSearch />

      <div className={styles.Page}>
        <Banner
          opacity=".0"
          mini
          sticky
          bg={bannerImg}
          overlay={<div>
            <h1>Resorts</h1>
            <p>O charme e glamour</p>
          </div>}
        />

        {dataCount > 0 && <main className={styles.PageMain}>
          {items.map((item, i) => <Card
            key={path + i}
            type={path}
            item={item}
          />)}
        </main>
        }
        {dataCount === 0 && <Empty />}
      </div>
      <Footer />
    </>
  );
};

export default Resorts;

export async function getServerSideProps() {
  const res = await apiFetch("/resorts", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  const data = await res.json();

  return { props: { data } };
}
