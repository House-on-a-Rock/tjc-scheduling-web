import React from 'react';

export const NewLineText = ({ text, style }: { text: string; style: any }) => {
  const newText = text.split('\n').map((str) => <p>{str}</p>);
  return <div style={style}>{newText}</div>;
};
