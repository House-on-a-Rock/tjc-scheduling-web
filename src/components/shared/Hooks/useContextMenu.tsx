import { useEffect, useCallback, useState } from 'react';

const useContextMenu = (outerRef: any) => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');
  const [menu, showMenu] = useState(false);
  const [cellValue, setCellValue] = useState();

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      if (outerRef && outerRef.current.contains(event.target)) {
        console.log('event', event);
        setXPos(`${event.pageX}px`);
        setYPos(`${event.pageY}px`);
        setCellValue(event.target.value);
        showMenu(true);
        const target = event.target.closest('tr');
        console.log('target', target);
      } else {
        showMenu(false);
      }
    },
    [showMenu, outerRef, setXPos, setYPos],
  );

  const handleClick = useCallback(() => {
    showMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return { xPos, yPos, menu, cellValue };
};

export default useContextMenu;
