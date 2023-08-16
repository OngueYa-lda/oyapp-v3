import styles from "./SimpleLineIcon.module.css";

export function SimpleLineIcon(props) {
  const {
    icon = "",
    size = "inherit",
    color = "inherit"
  } = props;

  return (
    <i
      className={`${styles.SimpleLineIcon} icon-${icon}`}
      aria-hidden="true"
      style={{
        fontSize: size || "inherit",
        color: color || "inherit"
      }}
    ></i>
  );
}
