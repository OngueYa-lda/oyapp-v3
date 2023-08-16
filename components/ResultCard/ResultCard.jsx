import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./ResultCard.module.css";

// components
import {
  SimpleLineIcon,
  Comodidade
} from "..";
// icons
import {
  Star
} from "../../icons";

import {
  readablePrice,
  safeValue as val
} from "../../util/helpers";

export function ResultCard({ item }) {
  const router = useRouter();
  const {
    checkin,
    checkout,
    nquartos,
    nviajantes
  } = router.query;

  const numeroDeEstrelas = Number(val(item, "classificacao.estrelas"));
  const itemEstrelas = new Array(numeroDeEstrelas).fill(1);
  const hasPrice = !!val(item, "preco.moeda");

  const urlParams = () => new URLSearchParams({
    checkin,
    checkout,
    nquartos,
    nviajantes
  });

  const itemUrl = `${item.dataKind}/${item.slug}?${urlParams()}`;
  let itemImagens = val(item, "imagens", []);

  itemImagens = itemImagens.length > 0 ? itemImagens : [
    "/assets/imagens/default/hotel.png"
  ];

  const precoMinimo = readablePrice(val(item, "preco.minimo"));
  const comodidades = val(item, "comodidades", {});

  return (
    <Link href={itemUrl}>
      <a className={styles.ResultCard}>
        <section className={styles.ResultCardImages}>
          {itemImagens.map((img, i) =>
            <div key={`ITEM-IMAGES${i}`} className={styles.ResultCardImage}>
              <Image
                src={img}
                alt="Foto"
                layout="fill"
              />
            </div>
          )}
        </section>

        <section className={styles.ResultCardDescription}>
          <h2 className={`${styles.ResultCardTitle} ellipsis`}>
            {val(item, "name")}
          </h2>

          <div className={styles.ResultCardLocation}>
            <SimpleLineIcon icon="location-pin" />
            {val(item, "localizacao.texto")}
          </div>

          {itemEstrelas.length > 0 && <div className={styles.ResultCardStars}>
            {itemEstrelas.map((_, i) =>
              <Star key={`ResultCardStar${i}`} />
            )}
          </div>}

          <div className={styles.ResultCardInfo}>
            <Comodidade
              className={`${styles.ResultCardComodidade} ellipsis`}
              state={comodidades.alimentacao?.breakfast}
              icon="cup"
              label="Pequeno almoço"
            />
            <Comodidade
              className={`${styles.ResultCardComodidade} ellipsis`}
              state={comodidades.internet?.wifi}
              icon="feed"
              label="Wi-Fi"
            />
            <Comodidade
              className={`${styles.ResultCardComodidade} ellipsis`}
              state={comodidades.tipoPagamento?.multicaixa}
              icon="credit-card"
              label="Multicaixa"
            />
          </div>
        </section>

        {hasPrice && <section className={styles.ResultCardDetails}>
          <div className={styles.ResultCardPriceLabel}>A partir de</div>
          <div className={styles.ResultCardPrice}>
            <p>
              <span className="KwanzaCurrencySymbol">
                {val(item, "preco.moeda")}
              </span>
              {precoMinimo}
            </p>
          </div>
        </section>}
      </a>
    </Link>
  );
}
