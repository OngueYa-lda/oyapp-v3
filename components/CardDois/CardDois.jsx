import Link from "next/link";

import styles from "./CardDois.module.css";

import {
  safeValue as val
} from "../../util/helpers.js";

import {
  SimpleLineIcon,
  CardGallery
} from "..";

export function CardDois(props) {
  const {
    type,
    item
  } = props;

  let itemImages = val(item, "imagens", []);
  itemImages = itemImages.length > 0 ? itemImages : [
    "/assets/imagens/default/hotel.png"
  ];

  return (        
    <div className={styles.SectionCard}>
      <div className={styles.Card}>
        <CardGallery
          images={itemImages}
          width={240}
          height={167}
        />
      </div>
      <div className={styles.CardContent}>
        <div className={styles.CardContentLabel}>
          <SimpleLineIcon icon="location-pin" />
          {val(item, "localizacao.texto")}
        </div>          
        <h2 className={`${styles.CardName} ellipsis`}>
          <Link
            href={`${type}/${val(item, "slug")}`} >
            <Link>
              {val(item, "name")} 
            </Link>  
          </Link>
        </h2> 
        <span className={styles.CardContentLabelDetalhes}>
          {val(item, "informacoes.detalhes")}
        </span>    
      </div>         
    </div>
  );
}
