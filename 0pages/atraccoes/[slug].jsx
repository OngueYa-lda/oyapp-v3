import Head from "next/head";
import Link from "next/link";

import styles from "../../styles/pages/PageItem.module.css";

// components
import {
  SimpleLineIcon,
  Nav,
  Footer,
  Gallery,
  ActiveAnchorLink
} from "../../components";

// icons
import {
  Star
} from "../../icons";

import {
  safeValue as val,
  readablePrice
} from "../../util/helpers.js";

import { apiFetch } from "../../util/fetch";

const AtraccoesItem = props => {
  const { data: item, cookies } = props;

  const numeroDeEstrelas = Number(val(item, "classificacao.estrelas"));
  const itemEstrelas = new Array(numeroDeEstrelas).fill(1);
  const itemImages = val(item, "imagens", []);
  const precoMinimo = readablePrice(val(item, "preco.minimo"));
  const pageTitle = `${item.name} - OngueYa`;

  return (
    <div className="PageShadeBg">
      <Nav cookies={cookies} />
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className={styles.PageItem}>
        <ul className={styles.PageItemLinks}>
          <li>
            <ActiveAnchorLink anchor="#detalhes">
              Detalhes
            </ActiveAnchorLink>
          </li>
          <li>
            <ActiveAnchorLink anchor="#oqueFazer">
              O que fazer
            </ActiveAnchorLink>
          </li>
          <li>
            <ActiveAnchorLink anchor="#comoChegar">
              Como chegar
            </ActiveAnchorLink>
          </li>
          <li>
            <ActiveAnchorLink anchor="#infoUtil">
              Informações úteis
            </ActiveAnchorLink>
          </li>
        </ul>
        <div className={styles.PageItemGalleryWrap}>
          <Gallery images={itemImages} />
        </div>
        {item && <main>
          <div className={styles.PageItemOverview}>
            <section>
              <div className={styles.PageItemHeader}>
                <h2 className={styles.PageItemName}>
                  {val(item, "name")}
                </h2>
                <div className={styles.PageItemLocalizacao}>
                  <SimpleLineIcon icon="location-pin" />
                  <span>
                    {val(item, "localizacao.texto")}, {val(item, "localizacao.cidade")}
                  </span>
                </div> 
                <hr />
                <div className={styles.PageItemComodidades}>                  
                  {itemEstrelas.length > 0 && <div className={styles.PageItemStars}>
                    <p>Nível de procura </p>
                    {itemEstrelas.map((_, i) =>
                      <Star key={`PAGE-ITEM-STAR${i}`} />
                    )}
                  </div>}                  
                </div>
              </div>
              <div id="detalhes" className={styles.PageItemBox}>
                <h3>Informações do local</h3>
                <hr />
                <p>
                  {val(item, "informacoes.detalhes")}
                </p>
              </div>
              <div id="oqueFazer" className={styles.PageItemBox}>
                <h3>O que fazer aqui</h3>
                <hr />
                <p>
                  {val(item, "informacoes.oqueFazer")}
                </p>
              </div>
              <div id="comoChegar" className={styles.PageItemBox}>
                <h3>Como chegar aqui</h3>
                <hr />
                <p>
                  {val(item, "informacoes.comoChegar")}
                </p>
              </div>
              <div id="infoUtil" className={styles.PageItemBox}>
                <h3>Informações úteis</h3>
                <hr />
                <p>
                  {val(item, "informacoes.infoUtil")}
                </p>
              </div>
            </section>
            <section className={styles.PageItemPrice}>
              <div className={styles.ItemPrice}>
                <span className={styles.ItemPriceLabel}>Solicitar guiatur a partir de </span>
                <h3 className={styles.ItemPriceText}>
                  <span className="KwanzaCurrencySymbol">
                    {val(item, "preco.moeda")}
                  </span>
                  {precoMinimo}
                </h3>
              </div>
              <div className={styles.ItemHours}>
                <div className={styles.ItemHourWrap}>
                  <div className={styles.ItemHour}>
                    <span>Obs. Você paga o guiatur</span>
                  </div>
                </div>
              </div>
              <div className={styles.PageItemReservarButton}>
                <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSfVQms-nHfODESFfmgfWTfrHT02C64vFck444yVlNTxyUzEpQ/viewform?usp=pp_url"}>
                  <a target="_blank" className="AppButton">Reservar uma visita com guiatur</a>
                </Link>
              </div>
            </section>
          </div>         
        </main>}
      </div>
      <Footer />
    </div>
  );
};

export default AtraccoesItem;

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  const res = await apiFetch(`/atraccoes?slug=${slug}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  const data = await res.json();
  data.images = [];

  return { props: { data } };
}
