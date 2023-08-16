import Image from "next/image";

import styles from "./Empty.module.css";

export function Empty(props) {
  const {
    text = "Não disponível!"
  } = props;

  return (
    <div className={styles.Empty}>
      <Image
        className={styles.EmptyImage}
        src="/assets/imagens/oy-badge.webp"
        alt="Ongueya badge"
        width="140"
        height="140"
      />
      {text && <p className={styles.EmptyText}>
        {text}
      </p>}
    </div>
  );
}
