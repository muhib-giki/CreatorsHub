import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <span>{text}</span>
      <img
        className={styles.arrow}
        width="25px"
        height="25px"
        src="/images/rightarrow.png"
        alt="arrow"
      />
    </button>
  );
};

export default Button;
