
import styles from "./Input.module.css";
// util
import { classNameBuilder } from "../../util/helpers";

export function Input(props) {
  const {
    type,
    placeholder,
    className,
    label,
    ...rest
  } = props;

  const isTextType = () => {
    const nonTextType = ["checkbox"];
    return !nonTextType.includes(type);
  };

  const cn = classNameBuilder({
    [styles.InputNonText]: !isTextType()
  }, styles.Input);

  return (
    <div className={cn}>
      {(label || placeholder) && <div className={styles.InputLabel}>
        {label || placeholder}
      </div>
      }
      <input
        type={type || "text"}
        placeholder={placeholder || ""}
        className={classNameBuilder({ [className]: !!className }, styles.InputField)}
        {...rest}
      />
    </div>
  );
}
