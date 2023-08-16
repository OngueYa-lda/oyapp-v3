import Image from "next/image";

export function Logo(props) {
  const {
    tipo,
    width = 130,
    height = 34
  } = props;

  const tipos = {
    white: "logo.png",
    blue: "logo-azul.png",
    badge: "oy-badge.webp"
  };

  return (
    <Image
      src={`/assets/imagens/${tipos[tipo || "blue"]}`}
      alt="Ongueya logo"
      width={width || "130"}
      height={height || "34"}
    />
  );
}
