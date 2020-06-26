import { createMuiTheme } from '@material-ui/core/styles';

const tjcBlue = '#024B8D';
const tjcLightBlue = '#0083a9';
const tjcOrange = '#A15816';
const interactiveColorRed = '#A12D16';
const interactiveColorBlue = '#0684AB';

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
    // typography: {
    //     h3: {
    //         fontWeight: 300,
    //     },
    // },
});
