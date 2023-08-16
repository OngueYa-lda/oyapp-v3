
import styles from "./Comodidade.module.css";

// components
import {
  SimpleLineIcon
} from "..";

export function Comodidade(props) {
  const {
    icon,
    state,
    label = "",
    className,
    onTitle = "",
    offTitle = "",
    ...rest
  } = props;

  const _onTitle = onTitle || label;
  const _offTitle = offTitle || `O estabelecimento não oferece "${label}"`;

  return (
    <div
      className={`${styles.Comodidade} ${className}`}
      data-state={state ? "on" : "off"}
      {...rest}
    >
      {icon && <SimpleLineIcon icon={icon} />}
      {state && <span title={_onTitle}>{label}</span>}
      {!state && <span title={_offTitle}>{label}</span>}
    </div>
  );
}
