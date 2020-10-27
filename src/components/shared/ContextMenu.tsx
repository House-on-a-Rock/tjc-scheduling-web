import React from 'react';
import { ContextMenu as CMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

interface ContextMenuProps {
  children: React.ReactNode;
  menuId: string;
  value: any;
}

interface MenuItemProps {
  event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>;
  data: Object;
  target: HTMLElement;
}

//This doesn't come with default styling unfortunately. They're style sheets are here: https://github.com/vkbansal/react-contextmenu/blob/master/examples/react-contextmenu.css
export const ContextMenu = ({ children, menuId, value }: ContextMenuProps) => {
  function handleClick({ event, data, target }: MenuItemProps) {
    console.log('hiiii');
  }

  const cellMenu = (
    <div>
      <CMenu
        id={menuId}
        hideOnLeave={true}
        style={{
          margin: 1,
          borderColor: 'black', //these border attributes don't show up for some reason
          borderWidth: 1,
          padding: 5,
          backgroundColor: 'white',
          opacity: 1,
          zIndex: 10,
        }}
      >
        <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
          {value}
        </MenuItem>
        <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider />
        <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
          ContextMenu Item 3
        </MenuItem>
      </CMenu>
    </div>
  );

  return (
    <>
      <ContextMenuTrigger id={menuId}>{children}</ContextMenuTrigger>
      {cellMenu}
    </>
  );
};
