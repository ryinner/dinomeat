import React from "react";
import styles from "./Button.module.scss";

export default function Button({ children, className, ...buttonProps }: Props) {
  const computedClassName = `${styles.button} ${className}`;

  return (
    <button className={computedClassName} {...buttonProps}>
      {children}
    </button>
  );
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
