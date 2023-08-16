"use client"

import Link from "next/link";

import styles from "./Card.module.css";

import {
  safeValue as val,
  readablePrice
} from "../../util/helpers.js";

import {
  SimpleLineIcon,
  CardGallery
} from "..";
// icons
import { Star } from "../../icons";

export function Card(props) {
  const {
    type,
    item
  } = props;

  const isHotel = type === "hoteis";
  const isExperiencias = type === "experiencias";
  const isPacote = type === "pacotes";

  const numeroDeEstrelas = Number(val(item, "classificacao.estrelas"));
  const itemEstrelas = new Array(numeroDeEstrelas).fill(1);

  let itemImages = val(item, "imagens", []);
  itemImages = itemImages.length > 0 ? itemImages : [
    "/assets/imagens/default/hotel.png"
  ];

  const precoMinimo = readablePrice(val(item, "preco.minimo"));

  return (
    <Link
      href={`/${type}/${val(item, "slug")}`} >
      <a className={styles.Card}>
        <CardGallery
          images={itemImages}
          width={240}
          height={167}
        />
        <div className={styles.CardContent}>
          <div className={styles.CardContentLabel}>
            <SimpleLineIcon icon="location-pin" />
            {val(item, "localizacao.texto")}, {val(item, "localizacao.provincia")}
          </div>

          <h2 className={`${styles.CardName} ellipsis`}>
            {val(item, "name")}
          </h2>

          {isHotel && <div className={styles.CardContentStars}>
            {itemEstrelas.map((_, i) =>
              <Star key={`CardStar${i}`} />
            )}
          </div>
          }

          {isPacote && <div className={styles.CardContentLabel}>
            <SimpleLineIcon icon="list" /> {val(item, "comodidades.incluido")}
          </div>
          }

          <div className={styles.CardContentBottom}>
            {val(item, "preco") && <span className={styles.CardContentLabel}>
              A partir de
            </span>}
            
            <h3 className={styles.CardContentPrice}>
              <span className="KwanzaCurrencySymbol">
                {val(item, "preco.moeda")}
              </span>
              {precoMinimo}
            </h3>

            {isExperiencias && <div className={styles.CardContentL}>
              <span className={styles.CardContentLabel}>
                <SimpleLineIcon icon="people" /> {val(item, "informacoes.publico")} 
              </span>
            </div>
            }          
          </div>
        </div>
      </a>
    </Link>
  );
}
