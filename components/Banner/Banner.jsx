import Image from "next/image";
//styles
import styles from "./Banner.module.css";
//image
import bannerImg from "../../public/assets/imagens/paisagem.jpg";
//helpers
import { classNameBuilder } from "../../util/helpers";

export function Banner(props) {
  const {
    bg,
    overlay,
    mini,
    sticky,
    opacity = "0"
  } = props;

  return (
    <div className={classNameBuilder({
      [styles.BannerMini]: mini,
      [styles.BannerSticky]: sticky,
      [styles.BannerFull]: !bg
    }, styles.Banner)}>
      <div
        className={styles.BannerShadow}
        style={{ opacity: opacity || "0" }}
      ></div>
      <div className={styles.BannerOverlay}>
        {overlay && <div className={styles.BannerOverlayHtml}>{overlay}</div>}
        {!overlay
        && <>
          <h1>O melhor do turismo</h1>
          <div className={styles.BannerOverlayText}>
            <p>
              Experiência turística garantida
            </p>
            <p>
              No país mais abençoado pela Mãe natureza
            </p>
          </div>
        </>
        }
      </div>
      <Image
        src={bg || bannerImg}
        //blurDataURL={bg || bannerImg}
        alt="Banner"
        placeholder="blur"
      />
    </div>
  );
}
