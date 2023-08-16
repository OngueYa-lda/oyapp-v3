import Head from "next/head";

import styles from "../../styles/pages/Page.module.css";

// image
import bannerImg from "../../public/assets/imagens/fundo/aviao.svg";

// components
import {
  Banner,
  Nav,
  Footer,
  Card,
  Empty
} from "../../components";
import { apiFetch } from "../../util/fetch";

const Experiencias = props => {
  const { data, cookies } = props;
  const items = data.data;
  const dataCount = items?.length || 0;
  const path = "experiencias";

  return (
    <>
      <Head>
        <title>Experiências - OngueYa</title>
      </Head>

      <Nav cookies={cookies} withTravelSearch />

      <div className={styles.Page}>
        <Banner
          opacity=".0"
          mini
          sticky
          bg={bannerImg}
          overlay={<div>
            <h1>Experiências</h1>
            <p>Autenticidade ao limite</p>
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

export default Experiencias;

export async function getServerSideProps() {
  const res = await apiFetch("/experiencias", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });
  const data = await res.json();

  return { props: { data } };
}
