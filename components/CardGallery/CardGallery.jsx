/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import styles from "./CardGallery.module.css";

export function CardGallery(props) {
  const {
    images = [],
    width,
    height
  } = props;

  const _images = Array.isArray(images) ? images : [];
  const imagesCount = _images.length;
  const imageIdPrefix = "card-gallery-image-";

  return (
    <div
      className={styles.CardGallery}
      style={{
        width,
        height: height || width
      }}
    >
      <div
        className={styles.CardGalleryWrapper}
        style={{
          width: imagesCount * width
        }}
      >
        {_images.map((img, i) =>
          <div
            id={`${imageIdPrefix}${i + 1}`}
            key={`CARD-IMAGES${i}`}
            className={styles.CardGalleryImage}
          >
            <Image
              src={img}
              alt="Card Image"
              width={width}
              height={height || width}
            />
          </div>
        )}
      </div>
    </div>
  );
}
