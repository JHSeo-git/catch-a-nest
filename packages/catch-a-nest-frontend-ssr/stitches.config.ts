import { createStitches, PropertyValue } from '@stitches/react';
import {
  amber,
  amberA,
  amberDark,
  amberDarkA,
  blue,
  blueA,
  blueDark,
  blueDarkA,
  bronze,
  bronzeA,
  bronzeDark,
  bronzeDarkA,
  brown,
  brownA,
  brownDark,
  brownDarkA,
  crimson,
  crimsonA,
  crimsonDark,
  crimsonDarkA,
  cyan,
  cyanA,
  cyanDark,
  cyanDarkA,
  gold,
  goldA,
  goldDark,
  goldDarkA,
  grass,
  grassA,
  grassDark,
  grassDarkA,
  gray,
  grayA,
  grayDark,
  grayDarkA,
  green,
  greenA,
  greenDark,
  greenDarkA,
  indigo,
  indigoA,
  indigoDark,
  indigoDarkA,
  lime,
  limeA,
  limeDark,
  limeDarkA,
  mauve,
  mauveA,
  mauveDark,
  mauveDarkA,
  mint,
  mintA,
  mintDark,
  mintDarkA,
  olive,
  oliveA,
  oliveDark,
  oliveDarkA,
  orange,
  orangeA,
  orangeDark,
  orangeDarkA,
  pink,
  pinkA,
  pinkDark,
  pinkDarkA,
  plum,
  plumA,
  plumDark,
  plumDarkA,
  purple,
  purpleA,
  purpleDark,
  purpleDarkA,
  red,
  redA,
  redDark,
  redDarkA,
  sage,
  sageA,
  sageDark,
  sageDarkA,
  sand,
  sandA,
  sandDark,
  sandDarkA,
  sky,
  skyA,
  skyDark,
  skyDarkA,
  slate,
  slateA,
  slateDark,
  slateDarkA,
  teal,
  tealA,
  tealDark,
  tealDarkA,
  tomato,
  tomatoA,
  tomatoDark,
  tomatoDarkA,
  violet,
  violetA,
  violetDark,
  violetDarkA,
  yellow,
  yellowA,
  yellowDark,
  yellowDarkA,
} from '@radix-ui/colors';

const {
  styled,
  getCssText,
  keyframes,
  theme: lightTheme,
  createTheme,
  globalCss,
} = createStitches({
  media: {
    '3xl': '(min-width: 2200px)', // 137.5rem
    '2xl': '(min-width: 1920px)', // 120rem
    xl: '(min-width: 1440px)', // 90rem
    lg: '(min-width: 1280px)', // 80rem
    md: '(min-width: 1024px)', // 64rem
    sm: '(min-width: 788px)', // 49.25rem
    xs: '(min-width: 576px)', // 36rem
    motion: '(prefers-reduced-motion)',
    hover: '(any-hover: hover)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)',
  },
  theme: {
    colors: {
      // gray-scale colors
      ...gray,
      ...grayA,
      ...mauve,
      ...mauveA,
      ...slate,
      ...slateA,
      ...sage,
      ...sageA,
      ...olive,
      ...oliveA,
      ...sand,
      ...sandA,

      // red-scale colors
      ...tomato,
      ...tomatoA,
      ...red,
      ...redA,
      ...crimson,
      ...crimsonA,
      ...pink,
      ...pinkA,
      ...plum,
      ...plumA,

      // blue-scale colors
      ...purple,
      ...purpleA,
      ...violet,
      ...violetA,
      ...indigo,
      ...indigoA,
      ...blue,
      ...blueA,
      ...cyan,
      ...cyanA,

      // green-scale colors
      ...teal,
      ...tealA,
      ...green,
      ...greenA,
      ...grass,
      ...grassA,

      //
      ...orange,
      ...orangeA,
      ...brown,
      ...brownA,

      // bright-scale colors
      ...sky,
      ...skyA,
      ...mint,
      ...mintA,
      ...lime,
      ...limeA,
      ...yellow,
      ...yellowA,
      ...amber,
      ...amberA,

      // metal-scale colors
      ...gold,
      ...goldA,
      ...bronze,
      ...bronzeA,

      // semantic colors
      black: '#000',
      white: '#fff',
      hiContrast: '$mauve12',
      loContrast: 'white',
    },
    fonts: {
      base: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
      ubuntu: `'Ubuntu', Ubuntu, Roboto, 'Open Sans', 'Helvetica Neue', sans-serif`,
      code: `Fira Code, Consolas, Monaco, Andale Mono, Ubuntu mono, monospace`,
    },
    sizes: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
      maxWidth: '770px', // 48.125rem
      headerHeight: '70px', // 4.375rem
      footerHeight: '120px', // 4.375rem
    },
    space: {
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '35px',
      7: '45px',
      8: '65px',
      9: '80px',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      round: '50%',
      pill: '9999px',
    },
    zIndices: {
      1: '10',
      2: '20',
      3: '30',
      4: '40',
      5: '50',
      fixed: '500',
      modal: '998',
      max: '999',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    shadows: {
      muiShadow1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      muiShadow2: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      muiShadow3: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      muiShadow4: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      muiShadow5: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    },

    letterSpacings: {},
    transitions: {},
    fontWeights: {},
    lineHeights: {},
    borderStyles: {},
    borderWidths: {},
  },
  utils: {
    p: (value: PropertyValue<'padding'>) => ({
      padding: value,
    }),
    pt: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
    }),
    pr: (value: PropertyValue<'paddingRight'>) => ({
      paddingRight: value,
    }),
    pb: (value: PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value,
    }),
    pl: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
    }),
    px: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    m: (value: PropertyValue<'margin'>) => ({
      margin: value,
    }),
    mt: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
    }),
    mr: (value: PropertyValue<'marginRight'>) => ({
      marginRight: value,
    }),
    mb: (value: PropertyValue<'marginBottom'>) => ({
      marginBottom: value,
    }),
    ml: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
    }),
    mx: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value,
    }),
    ta: (value: PropertyValue<'textAlign'>) => ({ textAlign: value }),
    fd: (value: PropertyValue<'flexDirection'>) => ({ flexDirection: value }),
    fw: (value: PropertyValue<'flexWrap'>) => ({ flexWrap: value }),
    ai: (value: PropertyValue<'alignItems'>) => ({ alignItems: value }),
    ac: (value: PropertyValue<'alignContent'>) => ({ alignContent: value }),
    jc: (value: PropertyValue<'justifyContent'>) => ({ justifyContent: value }),
    as: (value: PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
    fg: (value: PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
    fs: (value: PropertyValue<'flexShrink'>) => ({ flexShrink: value }),
    fb: (value: PropertyValue<'flexBasis'>) => ({ flexBasis: value }),
    bc: (value: PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value,
    }),
    br: (value: PropertyValue<'borderRadius'>) => ({
      borderRadius: value,
    }),
    btrr: (value: PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value,
    }),
    bbrr: (value: PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value,
    }),
    bblr: (value: PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value,
    }),
    btlr: (value: PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value,
    }),
    bs: (value: PropertyValue<'boxShadow'>) => ({ boxShadow: value }),
    lh: (value: PropertyValue<'lineHeight'>) => ({ lineHeight: value }),
    ox: (value: PropertyValue<'overflowX'>) => ({ overflowX: value }),
    oy: (value: PropertyValue<'overflowY'>) => ({ overflowY: value }),
    pe: (value: PropertyValue<'pointerEvents'>) => ({ pointerEvents: value }),
    us: (value: PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    userSelect: (value: PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      userSelect: value,
    }),
    size: (value: PropertyValue<'width'>) => ({
      width: value,
      height: value,
    }),
    appearance: (value: PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      appearance: value,
    }),
    backgroundClip: (value: PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value,
    }),
    ellipsisLine: (value: number) => ({
      display: '-webkit-box',
      WebkitLineClamp: value,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
  },
});

const darkTheme = createTheme('dark-theme', {
  colors: {
    // gray-scale colors
    ...grayDark,
    ...grayDarkA,
    ...mauveDark,
    ...mauveDarkA,
    ...slateDark,
    ...slateDarkA,
    ...sageDark,
    ...sageDarkA,
    ...oliveDark,
    ...oliveDarkA,
    ...sandDark,
    ...sandDarkA,

    // red-scale colors
    ...tomatoDark,
    ...tomatoDarkA,
    ...redDark,
    ...redDarkA,
    ...crimsonDark,
    ...crimsonDarkA,
    ...pinkDark,
    ...pinkDarkA,
    ...plumDark,
    ...plumDarkA,

    // blue-scale colors
    ...purpleDark,
    ...purpleDarkA,
    ...violetDark,
    ...violetDarkA,
    ...indigoDark,
    ...indigoDarkA,
    ...blueDark,
    ...blueDarkA,
    ...cyanDark,
    ...cyanDarkA,

    // green-scale colors
    ...tealDark,
    ...tealDarkA,
    ...greenDark,
    ...greenDarkA,
    ...grassDark,
    ...grassDarkA,

    //
    ...orangeDark,
    ...orangeDarkA,
    ...brownDark,
    ...brownDarkA,

    // bright-scale colors
    ...skyDark,
    ...skyDarkA,
    ...mintDark,
    ...mintDarkA,
    ...limeDark,
    ...limeDarkA,
    ...yellowDark,
    ...yellowDarkA,
    ...amberDark,
    ...amberDarkA,

    // metal-scale colors
    ...goldDark,
    ...goldDarkA,
    ...bronzeDark,
    ...bronzeDarkA,

    // semantic colors
    hiContrast: '$mauve12',
    loContrast: '$mauve2',
  },
});

export const lightThemeClassName = lightTheme.className;
export const darkThemeClassName = darkTheme.className;
export { globalCss, styled, getCssText, keyframes };
