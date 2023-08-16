import Head from "next/head";

import styles from "../../styles/pages/Page.module.css";

// image
import bannerImg from "../../public/assets/imagens/fundo/truck.svg";

// components
import {
  Banner,
  Nav,
  Footer,
  CardDois,
  Empty
} from "../../components";
import { apiFetch } from "../../util/fetch";

const Atraccoes = props => {
  const { data, cookies } = props;
  const items = data.data;
  const dataCount = items?.length || 0;
  const path = "atraccoes";

  return (
    <>
      <Head>
        <title>Atracções turísticas - OngueYa</title>
      </Head>

      <Nav cookies={cookies} withTravelSearch />

      <div className={styles.Page}>
        <Banner
          opacity=".0"
          mini
          sticky
          bg={bannerImg}
          overlay={<div>
            <h1>Atracções</h1>
            <p>Os encantos naturais</p>
          </div>}
        />


        {dataCount > 0 && <main className={styles.PageMain}>
          {items.map((item, i) => <CardDois
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

export default Atraccoes;

export async function getServerSideProps() {
  const res = await apiFetch("/atraccoes", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  const data = await res.json();

  return { props: { data } };
}
