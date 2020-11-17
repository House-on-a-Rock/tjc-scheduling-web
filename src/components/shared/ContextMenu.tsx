import React from 'react';

import useContextMenu from './Hooks/useContextMenu';

export const ContextMenu = ({ outerRef }: any) => {
  const { xPos, yPos, menu, cellValue } = useContextMenu(outerRef);

  if (menu) {
    return (
      <ul
        className="menu"
        style={{ position: 'fixed', top: yPos, left: xPos, zIndex: 100 }}
      >
        <li>{cellValue}</li>
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
      </ul>
    );
  }
  return <></>;
};
