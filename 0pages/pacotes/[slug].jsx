import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/pages/PageItem.module.css";
// components
import {
  Nav,
  Footer,
  Gallery,
  Comodidade,
  SimpleLineIcon,
  ActiveAnchorLink
} from "../../components";
import {
  safeValue as val,
  readablePrice
} from "../../util/helpers.js";
import { apiFetch } from "../../util/fetch";

const PacotesItem = props => {
  const { data: item, cookies } = props;  

  const itemImages = val(item, "imagens", []);
  const comodidades = val(item, "comodidades", {});
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
            <ActiveAnchorLink anchor="#politicas">
              Políticas de cancelamento
            </ActiveAnchorLink>
          </li> 
          <li>
            <ActiveAnchorLink anchor="#regras">
              Regras gerais
            </ActiveAnchorLink>
          </li>
        </ul>
        <div className={styles.PageItemGalleryWrap}>
          <Gallery images={itemImages} />
        </div>
        <main>
          <div className={styles.PageItemOverview}>
            <section>
              <div className={styles.PageItemHeader}>
                <h2 className={styles.PageItemName}>
                  {val(item, "name")}
                </h2>                                            
                <div className={styles.PageItemLocalizacao}>
                  <SimpleLineIcon icon="location-pin" />
                  <span>
                    {val(item, "localizacao.texto")}
                  </span>
                </div>                                     
                <hr />
                <div className={styles.PageItemComodidades}>
                  <div className={styles.ItemHours}>
                    <div className={styles.ItemHourWrap}>
                      <SimpleLineIcon icon="calendar" size="14px" />
                      <div className={styles.ItemHour}>
                        <span>Data: </span>
                        {val(item, "data.tempo")}
                      </div>
                    </div>
                    <div className={styles.ItemHourWrap}>
                      <SimpleLineIcon icon="clock" size="14px" />
                      <div className={styles.ItemHour}>
                        <span>Começa:</span>
                        {val(item, "hora.comeca")}
                      </div>
                    </div>
                    <div className={styles.ItemHourWrap}>
                      <SimpleLineIcon icon="clock" size="14px" />
                      <div className={styles.ItemHour}>
                        <span>Termina:</span>
                        {val(item, "hora.termina")}
                      </div>
                    </div>                 
                  </div>                                  
                </div>                
              </div>
              <div id="detalhes" className={styles.PageItemBox}>
                <h3>Descrição da actividade</h3>
                <hr />
                <p> 
                  {val(item, "informacoes.detalhes")} 
                </p>
              </div>
              <div id="comodidades" className={styles.PageItemBox}>
                <h3>O que inclui e não inclui</h3>
                <hr />
                <div className={styles.ComodidadesGrid}>
                  <div className={styles.ComodidadesGridItem}>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.servicosOferecidos.transporte}
                      icon="directions"
                      label="Transporte"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.servicosOferecidos.alojamento}
                      icon="home"
                      label="Alojamento"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.bilhete}
                      icon="rocket"
                      label="Bilhete"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.alimentacao.bebidas}
                      icon="cup"
                      label="Bebidas"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.alimentacao.breakfast}
                      icon="cup"
                      label="Almoço"
                    />                    
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.servicosOferecidos.guiatur}
                      icon="user"
                      label="Guiatur"
                    />
                  </div>
                </div>
              </div>
              <div id="politicas" className={styles.PageItemBox}>
                <h3>Políticas de cancelamento</h3>
                <hr />
                <div className={styles.PageItemCancelamento}>
                  <span>{val(item, "informacoes.politicaDeCancelamento")}</span>
                </div>
              </div>
              <div id="regras" className={styles.PageItemBox}>
                <h3>Regras gerais</h3>
                <hr />
                <p>
                  {val(item, "informacoes.regrasGerais")}
                </p>                  
                <hr />
                <div className={styles.PageItemCancelamento}>                   
                  <span>Organizado por</span>
                  <p className={styles.PageItemGuiatur}>
                    <SimpleLineIcon icon="user-follow" size="14px" />
                    {val(item, "categoriaGuiatur.nome")}                    
                  </p>           
                  <small>
                    <SimpleLineIcon icon="share-alt" size="8px" />
                    {val(item, "categoriaGuiatur.categoria")}
                  </small>                        
                </div>
              </div>
            </section>
            <section className={styles.PageItemPrice}>
              <div className={styles.ItemPrice}>
                <span className={styles.ItemPriceLabel}>A partir de </span>
                <h3 className={styles.ItemPriceText}>
                  <span className="KwanzaCurrencySymbol">
                    {val(item, "preco.moeda")}
                  </span>
                  {precoMinimo}
                </h3>
              </div>
              <div className={styles.ItemHours}>
                <div className={styles.ItemHourWrap}>
                  <SimpleLineIcon icon="user-follow" size="14px" />
                  <div className={styles.ItemHour}>
                    <span> {val(item, "informacoes.publico")} </span>                    
                  </div>
                </div>
                <div className={styles.ItemHourWrap}>                  
                  <div className={styles.ItemHour}>
                    <span></span>                    
                  </div>
                </div>
              </div>              
              <div className={styles.PageItemReservarButton}>
                <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSdv4b4_gT6G5D2uMZIL5kvMXJnDZivXaH8nq-PlOkTPAeyK-w/viewform?usp=pp_url"}>
                  <a target="_blank" className="AppButton">Comprar pacote</a>
                </Link>
              </div>
            </section>            
          </div>         
        </main>     
      </div>
      <Footer />
    </div>
  );
};

export default PacotesItem;

export async function getServerSideProps(ctx) {
  const { slug } = ctx.params;

  const res = await apiFetch(`/pacotes?slug=${slug}`, {
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
