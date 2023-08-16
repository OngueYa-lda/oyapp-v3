import Image from "next/image";
import Link from "next/link";

import styles from "./Gallery.module.css";

export function Gallery(props) {
  const {
    images
  } = props;

  const _images = Array.isArray(images) ? images : [];
  const [highlight, ...rest] = _images;

  return (
    <div
      className={styles.Gallery}
      style={{
        height: _images.length === 1 ? "330px" : "auto"
      }}
    >
      {highlight
       && <Link href={highlight}>
         <Link
           className={styles.GalleryHighlight}
           target="_blank"
         >
           <Image
             className={styles.GalleryImage}
             src={highlight}
             alt="Gallery image"
             layout="fill"
           />
         </Link>
       </Link>
      }
      {rest.length > 0
        && <div className={styles.GalleryShowcase}>
          {rest.map((img, i) =>
            <Link
              key={`GALLERY-IMAGE${i}`}
              href={img}
            >
              <Link target="_blank">
                <Image
                  className={styles.GalleryImage}
                  src={img}
                  alt="Gallery image"
                  width={200}
                  height={160}
                />
              </Link>
            </Link>
          )}
        </div>
      }
    </div>
  );
}
