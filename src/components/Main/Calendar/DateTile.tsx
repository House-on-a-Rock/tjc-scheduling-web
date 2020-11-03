import React, { ReactNode } from 'react';

interface DateTileProps {
  day: Date;
  onTileClick: (day: Date) => void;
  // isSelected: boolean;
  isCurrentMonth: boolean;
  // textStyling?;
  // hasTask;
}

export const DateTile = (props: DateTileProps) => {
  const {
    day,
    isCurrentMonth,
    onTileClick,
    // , isSelected,  onTilePress, textStyling, hasTask
  } = props;
  // const TileComponent = isCurrentMonth ? TouchableOpacity : View;
  // const styling = isCurrentMonth
  //     ? isSelected && styles.selectedStyle
  //     : styles.fadedStyle;

  // const textStyle = isSelected ? { ...textStyling, color: 'white' } : textStyling;

  return (
    <div
      style={{
        width: 200,
        height: 200,
        border: '1px solid rgba(0, 0, 0, 1)',
        display: 'flex',
        justifyContent: 'center',
      }}
      onClick={() => onTileClick(day)}
    >
      <div style={isCurrentMonth ? { color: 'black' } : { color: 'grey' }}>
        {day.getDate()}
      </div>
      {/* {hasTask && <Entypo name="dot-single" size={20} color="black" />} */}
    </div>
  );
};
