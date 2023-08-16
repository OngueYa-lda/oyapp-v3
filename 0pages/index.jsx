import Image from "next/image";
import Link from "next/link";

import styles from "../styles/pages/Home.module.css";

// image
import hoteisGoImage from "../public/assets/imagens/hoteis-go.webp";
import resortsGoImage from "../public/assets/imagens/resorts-go.webp";
import parceirosGoImage from "../public/assets/imagens/parceiro.webp";
import cadastroBanner from "../public/assets/imagens/user-go.webp";
import atraccoesGoImage from "../public/assets/imagens/atraccoes-go.webp";
import experienciasGoImage from "../public/assets/imagens/experiencias-go.webp";
import ongueyaGoImage from "../public/assets/imagens/ongueya-go.webp";

// components
import {
  Banner,
  Nav,
  Footer
} from "../components";

import {
  readablePrice,
  safeValue as val
} from "../util/helpers";
import { apiFetch } from "../util/fetch";

const ofertasList = [{
  type: "hoteis",
  link: "/hoteis",
  bg: hoteisGoImage,
  altText: "Hotel Image",
  text: "Hotéis"
}, {
  type: "pacotes",
  link: "/pacotes",
  bg: resortsGoImage,
  altText: "Resort Image",
  text: "Pacotes"
}, {
  type: "experiencias",
  link: "/experiencias",
  bg: experienciasGoImage,
  altText: "Experiencias Image",
  text: "Experiências"
}];

const paraViajanteLinks = [{
  link: "/cadastro",
  bg: cadastroBanner,
  altText: "Cadastro Image",
  text: "Cadastra-se",
  subtext: "Receba novidades em primeira mão"
}, {
  link: "/atraccoes",
  bg: atraccoesGoImage,
  altText: "Cadastro Image",
  text: "Explore mais Angola",
  subtext: "Encontre os lugares mais emblemáticos"
}, {
  link: "https://leads.ongueya.com/",
  target: "_blank",
  bg: ongueyaGoImage,
  altText: "Aproveite!",
  text: "Turismo é Saúde",
  subtext: "Receba dicas para ter uma óptima viagem"
}];

const parceiroLinks = [{
  link: "/parceiros", 
  bg: parceirosGoImage,
  altText: "Seja um Parceiro",
  text: "Listar propriedade",
  subtext: "Receba hôspedes de qualquer parte do mundo!"
}];

function Home(props) {
  const {
    cookies,
    data
  } = props;

  const processed = data.data;

  return (
    <>
      <Nav cookies={cookies} withTravelSearch />

      <main className={styles.Home}>
        <Banner opacity=".55" />        

        <div className={styles.PageSection}>
          <h3>As melhores ofertas</h3>
          <div className={styles.PageSectionContent}>
            {ofertasList.map((item, i) => {
              const proc = processed[item.type];

              return (
                <Link key={`HOMELINK${i}`} href={item.link}>
                  <a className={styles.SectionContent}>
                    <Image
                      className={styles.SectionContentImage}
                      alt={item.altText}
                      src={item.bg}
                      width={340}
                      height={300}
                    />
                    <div className={styles.SectionContentData}>
                      <div className={styles.SectionContentDataName}>
                        <h4>{item.text}</h4>
                      </div>
                      <div className={styles.SectionContentDataPrice}>
                        {proc.data && <>
                          <p className={styles.SectionContentDataLabel}>
                            A partir de
                          </p>
                          <h4>
                            <span className="KwanzaCurrencySymbol">
                              {val(proc, "data.preco.moeda")}
                            </span>
                            {readablePrice(val(proc, "data.preco.minimo"))}
                          </h4>
                        </>}
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })
            }
          </div>
        </div>

        <div className={styles.PageSection}>
          <h3>Esteja em movimento</h3>
          <div className={styles.PageSectionContent}>
            {paraViajanteLinks.map((item, i) => <Link key={`HOMELINK${i}`} href={item.link}>
              <a title={item.subtext} className={styles.SectionContent}>
                <Image
                  className={styles.SectionContentImage}
                  alt={item.altText}
                  src={item.bg}
                  width={340}
                  height={300}
                />
                <div className={styles.SectionContentData}>
                  <div className={styles.SectionContentDataName}>
                    <h4>{item.text}</h4>
                    <span className={styles.SectionContentDataLabel}>
                      {item.subtext}
                    </span>
                  </div>
                </div>
              </a>
            </Link>)
            }
          </div>
        </div>

        <div className={styles.Container}>
          <div className={styles.Row}>
            <div className={styles.ColunaY}>
              <div className={styles.ContainerContent}>
                <div className={styles.PartnerItem}>
                  <div className={styles.BackgroundPartner}>
                    {parceiroLinks.map((item, i) => <Link key={`HOMELINK${i}`} href={item.link}>
                      <a title={item.subtext} className={styles.SectionContent}>
                        <Image
                          className={styles.SectionContentImage}
                          alt={item.altText}
                          src={item.bg}
                        />
                        <div className={styles.SectionContentData}>
                          <div className={styles.SectionContentDataName}>
                            <h4>{item.text}</h4>
                            <span className={styles.SectionContentDataLabel}>
                              {item.subtext}
                            </span>
                          </div>
                        </div>
                      </a>
                    </Link>)
                    }
                  </div>
                  <div className={styles.PartnerContentBox}>
                    <div className={styles.PartnerCardTitulo}>Listar propriedade</div>
                    <div className={styles.TextoPartner}>Do nacional ao internacional. Receba hôspedes de qualquer parte do mundo!</div>
                    <div className={styles.PartnerButton}>
                      <Link href="/parceiros">
                        <a className={styles.PartnerBtnPrimary} title="Clique aqui para cadastrar o seu hotel ou resort ou unidade similar">
                          Listar propriedade
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className={styles.PartnerItem}>
                  <div className={styles.PartnerContentBox}>
                    <div className={styles.PartnerCardTitulo}>Faça o seu cadastrado na plataforma</div>
                    <div className={styles.TextoPartner}>Faça já o seu, para receber novidades em primeira mão, descontos e muito mais.</div>
                    <div className={styles.PartnerButton}>
                      <Link href="/cadastro">
                        <a className={styles.PartnerLink} title="Faça o seu cadastrado na plataforma">
                          Cadastrar-se gratuitamente
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className={styles.PartnerItem}>
                  <div className={styles.PartnerContentBox}>
                    <div className={styles.PartnerCardTitulo}>Seja um Guiatur</div>
                    <div className={styles.TextoDoCard}>Leve turistas aos lugares mais emblemáticos da tua cidade ou região e ganhe uma renda. Simples assim!</div>
                    <div className={styles.PartnerButton}>
                      <Link href="/guias">
                        <a className={styles.PartnerLink} title="Seja um guiatur" >
                          Saiba mais
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const res = await apiFetch("/processed", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "GET"
  });

  const data = await res.json();

  return {
    props: {
      data
    }
  };
}
