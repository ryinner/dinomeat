import React, { Ref, forwardRef } from "react";
import styles from "./ControlsInputs.module.scss";

const ControlsInput = forwardRef(
  ({ className, ...props }: Props, ref: Ref<HTMLInputElement>) => {
    const classNameComputed = `${styles.input} ${className}`;

    return <input className={classNameComputed} {...props} ref={ref} />;
  }
);

ControlsInput.displayName = "ControlsInput";

export default ControlsInput;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
