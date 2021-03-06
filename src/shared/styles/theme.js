import { createMuiTheme } from '@material-ui/core/styles';

const tjcBlue = '#024B8D';
const tjcLightBlue = '#0083a9';
const tjcOrange = '#A15816';
const interactiveColorRed = '#A12D16';
const interactiveColorBlue = '#0684AB';
const primaryButtonColor = tjcBlue; // '#024B8D';
const mainTextColor = '#556071';
const mainTitleColor = mainTextColor;
const mainBackgroundColor = '#FFFFFF';
const secondaryBackgroundColor = '#EDEEF3';
const greyedOutButtonColor = '#C8C8C8';
const greyedOutBorderColor = greyedOutButtonColor;
const greyedOutBackgroundColor = '#2F2F2F';
const fastTransitionTime = '0.2s';
const slowTransitionTime = '1s';

export default createMuiTheme({
  palette: {
    common: {
      blue: `${tjcBlue}`,
      lightBlue: `${tjcLightBlue}`,
    },
    primary: {
      main: `${tjcBlue}`,
    },
    secondary: {
      main: `${tjcOrange}`,
    },
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    h1: {
      fontSize: '36px',
      color: mainTitleColor,
    },
    h2: {
      fontSize: '26px',
      color: mainTitleColor,
    },
    h3: {
      fontSize: '24px',
      color: mainTitleColor,
    },
    body: {
      fontSize: '16px',
    },
  },
});

// TODO: find a way to integrate custom names into createMuiTheme instead of this separate object:
// custom theme object for custom names:
export const themeExtension = {
  palette: {
    common: {
      blue: tjcBlue,
      lightBlue: tjcLightBlue,
    },
    primary: {
      main: tjcBlue,
    },
    secondary: {
      main: tjcOrange,
    },
  },
  transition: {
    fast: fastTransitionTime,
    slow: slowTransitionTime,
  },
  typography: {
    fontFamily: 'Source Sans Pro',
    common: {
      color: mainTextColor,
    },
  },
  card: {
    backgroundColor: mainBackgroundColor,
    boxShadow: '#CCCCCC 0 2px 23px',
    transition: fastTransitionTime,
    hover: {
      border: `${interactiveColorBlue} 2px solid`,
      boxShadow: '#CCDBE0 0 2px 23px',
    },
    '&:hover, &:focus': {
      border: `${interactiveColorBlue} 2px solid`,
      boxShadow: '#CCDBE0 0 2px 23px',
    },
  },
  button: {
    outlined: {
      backgroundColor: mainBackgroundColor,
      border: `${primaryButtonColor} 1px solid`,
      boxShadow: '#D5E3F0 0 6px 15px',
    },
    filled: {
      backgroundColor: primaryButtonColor,
      boxShadow: '#000B44 0 3px 10px',
      transition: fastTransitionTime,
      hover: {
        backgroundColor: interactiveColorBlue,
      },
      '&:hover, &:focus': {
        backgroundColor: interactiveColorBlue,
      },
    },
    icon: {
      color: primaryButtonColor,
      transition: fastTransitionTime,
      hover: {
        color: interactiveColorBlue,
      },
      '&:hover, &:focus': {
        color: interactiveColorBlue,
      },
    },
  },
  sideBar: {
    backgroundColor: secondaryBackgroundColor,
    boxShadow: '#CFCFCF 0 2px 23px',
    hover: {
      backgroundColor: interactiveColorBlue,
    },
    '&:hover, &:focus': {
      backgroundColor: interactiveColorBlue,
    },
  },
};

// to avoid loading the whole object:
export const paletteTheme = themeExtension.palette;
export const typographyTheme = themeExtension.typography;
export const transitionTheme = themeExtension.transition;
export const cardTheme = themeExtension.card;
export const buttonTheme = themeExtension.button;
export const sideBarTheme = themeExtension.sideBar;
