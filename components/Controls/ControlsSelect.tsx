import React from 'react';

export default function ControlsSelect ({ empty = false, children, ...selectAttrs}: Props) {
  return <select {...selectAttrs}>
    {empty && <option value=''>{empty}</option>}
    {children}
  </select>
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  empty?: false|string;
  type?: string;
  children: React.ReactNode;
}