import React from 'react';
import styles from './ControlsInputs.module.scss';

export default function ControlsInput ({ className, ...props }: Props) {
  const classNameComputed = `${styles.input} ${className}`;
  return <input className={classNameComputed} {...props} />
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

}