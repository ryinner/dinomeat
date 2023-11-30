import React from 'react';
import styles from './ControlsCheckbox.module.scss';

export default function ControlsCheckbox ({ children, inputAttrs, className, ...props }: Props) {
  const classNameComputed = `${styles.checkbox} ${className ?? ''}`;
  return <label className={classNameComputed} {...props}>
    <input type='checkbox' className={styles.checkbox__input} {...inputAttrs} />
    <span className={styles.checkbox__icon} />
    {children}
  </label>
}

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  inputAttrs?: React.InputHTMLAttributes<HTMLInputElement>
}