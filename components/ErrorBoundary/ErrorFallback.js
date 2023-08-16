import styles from "./ErrorFallback.module.css";

import { Logo } from "..";

export function ErrorFallback(props) {
  const {
    tryAgainClick
  } = props;

  return (
    <div className="FullWidthPage PageShadeBg">
      <div className={styles.ErrorFallback}>
        <div className={styles.LogoWrap}>
          <Logo />
        </div>

        <h2>Algo falhou no servidor!</h2>
        <p>Não te preocupes, a nossa equipa de <i>dançarinos</i> já está no caso</p>
        <button
          type="button"
          className="AppButton"
          onClick={tryAgainClick || (() => {})}
        >
        Tentar novamente
        </button>
      </div>
    </div>
  );
}
