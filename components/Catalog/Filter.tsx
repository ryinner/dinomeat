import React from 'react';

export default function Filter ({ children, heading }: Props) {
  return <div>
    {heading}
    <div>
      {children}
    </div>
  </div>
}

interface Props {
  children: React.ReactNode;
  heading: string;
}
