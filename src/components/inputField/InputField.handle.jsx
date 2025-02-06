import { useEffect, useRef } from "react";
import styles from "./InputField.module.css";

export default function InputFieldHandle({
  placeholder = "",
  bgColor = "#fff",
  outColor = "#6b9997",
  textColor = "#000",
  inHeight = "20px",
  type,
  width,
  handleValue,
  value,
  name = "nothing",
  required = false,
  accept
}) {
  const input = useRef(null);
  useEffect(() => {
    if (required && input.current) {
      input.current.setAttribute("required", "true");
    }
  }, [required]);

  return (
    <div className={styles.group} style={{ color: textColor, width }}>
      <input
        style={{
          height: inHeight + "px",
          outlineColor: outColor,
          color: textColor,
          width,
        }}
        className={styles.group_input}
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={handleValue}
        value={value}
        name={name}
        ref={input}accept={accept?accept:"*"}
      />
      <label
        id="myLabel"
        htmlFor="myInput"
        className={styles.group_label}
        style={{ backgroundColor: bgColor, height: inHeight, color: textColor }}
      >
        {placeholder.split("optional")[0]}
      </label>
    </div>
  );
}
