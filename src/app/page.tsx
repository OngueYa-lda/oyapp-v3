
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/pages/Home.module.css";
// image
import hoteisGoImage from "../../public/assets/imagens/hoteis-go.webp";
import resortsGoImage from "../../public/assets/imagens/resorts-go.webp";
import parceirosGoImage from "../../public/assets/imagens/parceiro.webp";
import cadastroBanner from "../../public/assets/imagens/user-go.webp";
import atraccoesGoImage from "../../public/assets/imagens/atraccoes-go.webp";
import experienciasGoImage from "../../public/assets/imagens/experiencias-go.webp";
import ongueyaGoImage from "../../public/assets/imagens/ongueya-go.webp";
// components
import {
  Nav,
  Banner,
  Footer
} from "../../components";

import Navbar from "../../components/Navbar/Navbar";

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

  //const processed = data.data;

  return (
    <>

    <Navbar />
    <Nav cookies={cookies} withTravelSearch />

      <main className={styles.Home}>
        <Banner opacity=".55" />              

        <div className={styles.PageSection}>
          <h3>As melhores ofertas</h3>
          <div className={styles.PageSectionContent}>
            {ofertasList.map((item, i) => {
              //const proc = processed[item.type];

              return (
                <Link key={`HOMELINK${i}`} href={item.link}>
                  <p className={styles.SectionContent}>
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
                        
                          <p className={styles.SectionContentDataLabel}>
                            A partir de
                          </p>
                          <h4>
                            <span className="KwanzaCurrencySymbol">
                              kz
                            </span>
                            10 000
                          </h4>
                        
                      </div>
                    </div>
                  </p>
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
              <span title={item.subtext} className={styles.SectionContent}>
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
              </span>
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
                      <span title={item.subtext} className={styles.SectionContent}>
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
                      </span>
                    </Link>)
                    }
                  </div>
                  <div className={styles.PartnerContentBox}>
                    <div className={styles.PartnerCardTitulo}>Listar propriedade</div>
                    <div className={styles.TextoPartner}>Do nacional ao internacional. Receba hôspedes de qualquer parte do mundo!</div>
                    <div className={styles.PartnerButton}>
                      <Link href="/parceiros">
                        <span className={styles.PartnerBtnPrimary} title="Clique aqui para cadastrar o seu hotel ou resort ou unidade similar">
                          Listar propriedade
                        </span>
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
                        <span className={styles.PartnerLink} title="Faça o seu cadastrado na plataforma">
                          Cadastrar-se gratuitamente
                        </span>
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
                        <span className={styles.PartnerLink} title="Seja um guiatur" >
                          Saiba mais
                        </span>
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
