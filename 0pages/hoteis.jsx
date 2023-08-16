import Head from "next/head";

import styles from "../styles/pages/Page.module.css";

// image
import bannerImg from "../public/assets/imagens/fundo/taxi.svg";

// components
import {
  Banner,
  Nav,
  Footer,
  Card,
  Empty
} from "../components";
import { apiFetch } from "../util/fetch";
// import { getImagesPerFolders } from '../config/cloudinary';

const Hoteis = props => {
  const { data, cookies } = props;
  const items = data.data;
  const imagens = data?.imagens || [];

  const dataCount = items?.length || 0;
  const path = "hoteis";

  return (
    <>
      <Head>
        <title>Alojamentos - OngueYa</title>
      </Head>

      <Nav cookies={cookies} withTravelSearch />

      <div className={styles.Page}>
        <Banner
          opacity=".0"
          mini
          sticky
          bg={bannerImg}
          overlay={<div>
            <h1 className={styles.PageTitle}>Alojamentos</h1>
            <small>De 1 à 5 estrelas</small>
          </div>}
        />

        {dataCount > 0 && <main className={styles.PageMain}>
          {items.map((item, i) =>
            <Card
              key={path + i}
              type={path}
              item={item}
              images={imagens}
            />
          )}
        </main>
        }
        {dataCount === 0 && <Empty />}
      </div>
      <Footer />
    </>
  );
};

export default Hoteis;

export async function getServerSideProps() {
  const res = await apiFetch("/hoteis", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  const data = await res.json();
  // data.imagens = await getImagesPerFolders();

  return { props: { data } };
}
