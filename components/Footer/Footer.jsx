
import Link from "next/link";
import styles from "./Footer.module.css";

// util
import { year } from "../../util/dates";
import Menu from "../../util/menu.json";
import { classNameBuilder } from "../../util/helpers";

// icons
import {
  Facebook,
  Instagram,
  Linkedin,
  Tiktok
} from "../../icons";

const Termos = ({ inline }) =>
  <ul className={classNameBuilder({
    [styles.FooterTermosInline]: inline
  }, styles.FooterTermos)}>
    <li>
      <Link href="/termos">
        <span target="_blank">Termos de uso</span>
      </Link>
    </li>
    <li>
      <Link href="/privacidade">
        <span target="_blank">Política de privacidade</span>
      </Link>
    </li>
  </ul>
  ;

const Copy = ({ _1em }) =>
  <div className={classNameBuilder({
    [styles.FooterCopy]: _1em,
    [styles.FooterCopy2]: !_1em
  })}>
    &copy; {year()} OngueYa, Lda. Todos os direitos reservados. 
  </div>;

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterWrap}>
        <div className={styles.top}>
          <div className={styles.links}>
            <section>
              <h3>
                OngueYa
              </h3>
              <ul>
                <li>
                  <Link href="/parceiros"><span>Listar propriedade</span></Link>
                </li>
                <li>
                  <Link href="/guias"><span>Tornar-se Guiatur</span></Link>
                </li>
              </ul>
            </section>
            <section>
              <h3>
                Explore
              </h3>
              <ul>
                {Menu.menu.map((item, i) =>
                  <li key={`MENU-ITEM${i}`}>
                    <Link href={item.url}>
                      <span>{item.text}</span>
                    </Link>
                  </li>)}
              </ul>
            </section>
            <section>
              <h3>
                Políticas
              </h3>
              <Termos />
            </section>
            <section className={styles.socials}>
              <h3>
                Siga-nos
              </h3>
              <Link href="https://web.facebook.com/ongueya">
                <span target="_blank" rel="noreferrer">
                  <Facebook />
                </span>
              </Link>
              <Link href="https://www.instagram.com/ongueya_lda/">
                <span target="_blank" rel="noreferrer">
                  <Instagram />
                </span>
              </Link>
              <Link href="https://www.linkedin.com/company/ongueya/">
                <span target="_blank" rel="noreferrer">
                  <Linkedin />
                </span>
              </Link>
              <Link href="https://www.tiktok.com/@ongueya">
                <span target="_blank" rel="noreferrer">
                  <Tiktok />
                </span>
              </Link>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.FooterWrap}>
          <Copy _1em />
        </div>
      </div>
    </footer>
  );
}

Footer.Termos = Termos;
Footer.Copy = Copy;
