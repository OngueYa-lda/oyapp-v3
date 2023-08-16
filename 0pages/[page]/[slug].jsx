import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../../styles/pages/PageItem.module.css";

// components
import {
  SimpleLineIcon,
  Nav,
  Footer,
  Gallery,
  Comodidade,
  RoomCard,
  RoomDatesFilter,
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
import { dateFormat, daysFromToday } from "../../util/dates";

const PageItem = props => {
  const { data: item, cookies } = props;
 
  const router = useRouter();

  const {
    checkin,
    checkout,
    nquartos,
    nviajantes
  } = router.query;


  const numeroDeEstrelas = Number(val(item, "classificacao.estrelas"));
  const itemEstrelas = new Array(numeroDeEstrelas).fill(1);

  const itemImages = val(item, "imagens", []);
  const comodidades = val(item, "comodidades", {});
  const politicaDeCancelamento = val(item, "comodidades.politicaDeCancelamento", []);
  const quartos = val(item, "quartos.data", []);
  const precoMinimo = readablePrice(val(item, "preco.minimo"));

  const [select, setSelect] = useState({
    checkin: dateFormat(checkin || daysFromToday(7), "Y-MM-dd"),
    checkout: dateFormat(checkout || daysFromToday(8), "Y-MM-dd"),
    nquartos: Number(nquartos || 1),
    nviajantes: Number(nviajantes || 1)
  });

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
            <ActiveAnchorLink anchor="#comodidades">
              Comodidades
            </ActiveAnchorLink>
          </li>
          <li>
            <ActiveAnchorLink anchor="#cancelamento">
              Cancelamento
            </ActiveAnchorLink>
          </li>
          <li>
            <ActiveAnchorLink anchor="#quartos">
              Quartos
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

                {itemEstrelas.length > 0 && <div className={styles.PageItemStars}>
                  {itemEstrelas.map((_, i) =>
                    <Star key={`PAGE-ITEM-STAR${i}`} />
                  )}
                </div>
                }
                                                
                <hr />
                <div className={styles.PageItemComodidades}>
                  <Comodidade
                    className={`${styles.PageItemComodidade} ellipsis`}
                    state={comodidades.alimentacao.breakfast}
                    icon="cup"
                    label="Pequeno almoço"
                  />
                  <Comodidade
                    className={`${styles.PageItemComodidade} ellipsis`}
                    state={comodidades.internet.wifi}
                    icon="feed"
                    label="Wi-Fi"
                  />
                  <Comodidade
                    className={`${styles.PageItemComodidade} ellipsis`}
                    state={comodidades.tipoDeEventos.reuniao}
                    icon="briefcase"
                    label="Sala de Reuniões"
                  />
                  <Comodidade
                    className={`${styles.PageItemComodidade} ellipsis`}
                    state={comodidades.tipoPagamento.multicaixa}
                    icon="credit-card"
                    label="Multicaixa"
                  />
                </div>
              </div>

              <div id="detalhes" className={styles.PageItemBox}>
                <h3>Informações da propriedade</h3>
                <hr />
                <p>
                  {val(item, "informacoes.detalhes")}
                </p>
              </div>

              <div id="comodidades" className={styles.PageItemBox}>
                <h3>Comodidades</h3>
                <hr />
                <div className={styles.ComodidadesGrid}>
                  <div className={styles.ComodidadesGridItem}>
                    <p>
                      <SimpleLineIcon icon="home" />
                      <span>Instalações</span>
                    </p>                    
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.instalacoesFisicas.piscina}
                      icon="pie-chart"
                      label="Piscina"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.instalacoesFisicas.ginasio}
                      icon="organization"
                      label="Ginásio"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.instalacoesFisicas.parque}
                      icon="directions"
                      label="Estacionamento"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <p>
                      <SimpleLineIcon icon="layers" />
                      <span>Serviços Oferecidos</span>
                    </p>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.servicosOferecidos.room}
                      icon="check"
                      label="Room Service"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.servicosOferecidos.lavandaria}
                      icon="trash"
                      label="Lavandaria"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <p>
                      <SimpleLineIcon icon="event" />
                      <span>Eventos</span>
                    </p>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.tipoDeEventos.reuniao}
                      icon="briefcase"
                      label="Sala de Reuniões"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.tipoDeEventos.eventos}
                      icon="bag"
                      label="Outros eventos"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <p>
                      <SimpleLineIcon icon="globe" />
                      <span>Internet</span>
                    </p>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.internet.wifi}
                      icon="feed"
                      label="Wi-Fi"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <p>
                      <SimpleLineIcon icon="check" />
                      <span>Alimentação</span>
                    </p>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.alimentacao.breakfast}
                      icon="cup"
                      label="Pequeno almoço"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.alimentacao.restaurante}
                      icon="cup"
                      label="Restaurante"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.alimentacao.bar}
                      icon="cup"
                      label="Bar"
                    />
                  </div>
                  <div className={styles.ComodidadesGridItem}>
                    <p>
                      <SimpleLineIcon icon="check" />
                      <span>Tipos de Pagamento</span>
                    </p>
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.tipoPagamento.multicaixa}
                      icon="credit-card"
                      label="Multicaixa"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.tipoPagamento.visa}
                      icon="credit-card"
                      label="Visa"
                    />
                    <Comodidade
                      className={"ellipsis"}
                      state={comodidades.tipoPagamento.cash}
                      icon="wallet"
                      label="Cash"
                    />
                  </div>
                </div>
              </div>

              <div id="cancelamento" className={styles.PageItemBox}>
                <h3>Política de cancelamento</h3>
                <hr />
                <div className={styles.PageItemCancelamento}>
                  {politicaDeCancelamento.map((text, i) =>
                    <span key={`ITEM-CANCELAMENTO${i}`}>{text}&nbsp;</span>)
                  }
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
                  <SimpleLineIcon icon="clock" size="14px" />
                  <div className={styles.ItemHour}>
                    <span>Entrada</span>
                    {val(item, "comodidades.checkin.hora", "6pm")}
                  </div>
                </div>

                <div className={styles.ItemHourWrap}>
                  <SimpleLineIcon icon="clock" size="14px" />
                  <div className={styles.ItemHour}>
                    <span>Saída</span>
                    {val(item, "comodidades.checkout.hora", "11am")}
                  </div>
                </div>
              </div>

              <div className={styles.PageItemReservarButton}>
                <ActiveAnchorLink
                  className="AppButton"
                  anchor="#quartos"
                  shadow
                >
                  Reserva um quarto
                </ActiveAnchorLink>
              </div>
            </section>
          </div>

          <section id="quartos" className={styles.PageItemRooms}>
            <RoomDatesFilter
              onSearchChange={setSelect}
            />
            {quartos.map((quarto, i) => <RoomCard
              key={`PAGE-ITEM-QUARTO${i}`}
              data={{
                images: itemImages,
                quarto,
                unitKind: item.dataKind,
                unit: item.slug,
                select
              }}
            />)
            }
          </section>
        </main>}
      </div>

      <Footer />
    </div>
  );
};

export default PageItem;

export async function getServerSideProps(ctx) {
  const { page, slug } = ctx.params;

  const pass = ["hoteis", "resorts"];

  if (!pass.includes(page)) {
    return {
      notFound: true
    };
  }

  const res = await apiFetch(`/${page}?slug=${slug}`, {
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
