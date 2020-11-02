import React, { ReactNode } from 'react';

// interface DateTileProps {
//     day;
//     onTilePress?;
//     isSelected;
//     isCurrentMonth;
//     textStyling?;
//     hasTask;
// }

export const DateTile = (props: any) => {
  const {
    day,
    // isCurrentMonth,
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
        width: '14.2857%',
        height: 300,
      }}
      // onPress={() => onTilePress(day)}
      // style={{ ...styles.tile, ...styling }}
    >
      <div>{day.getDate()}</div>
      {/* {hasTask && <Entypo name="dot-single" size={20} color="black" />} */}
    </div>
  );
};
