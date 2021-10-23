import { globalCss } from '@stitches.js';

const globalStyle = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  'html, body, #__next': {
    height: '100%',
  },

  body: {
    m: 0,
    fontFamily: '$base',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',

    bc: '$loContrast',

    wordBreak: 'break-word',
  },

  button: {
    border: 'none',
    m: 0,
    p: 0,
    color: 'inherit',
    font: 'inherit',
    background: 'transparent',
    WebkitFontSmoothing: 'inherit',
    MozOsxFontSmoothing: 'inherit',
    appearance: 'none',

    cursor: 'pointer',
  },

  a: {
    outline: 'none',
    m: 0,
    p: 0,
    color: 'inherit',
    font: 'inherit',
    textDecoration: 'none',
  },

  // 'h1, h2, h3, h4, h5, h6': {
  //   wordBreak: 'keep-all',
  // },
  // 'p, span': {
  //   wordBreak: 'keep-all',
  // },

  // TODO: everride style
  // react-toastify
  ':root': {
    // '--toastify-color-light': '$colors$hiContrast',
    // --toastify-color-dark: #121212;
    // --toastify-color-info: #3498db;
    // --toastify-color-success: #07bc0c;
    // --toastify-color-warning: #f1c40f;
    // --toastify-color-error: #e74c3c;
    // --toastify-color-transparent: rgba(255, 255, 255, 0.7);
    // --toastify-icon-color-info: var(--toastify-color-info);
    // --toastify-icon-color-success: var(--toastify-color-success);
    // --toastify-icon-color-warning: var(--toastify-color-warning);
    // --toastify-icon-color-error: var(--toastify-color-error);
    // --toastify-toast-width: 320px;
    // --toastify-toast-background: #fff;
    // --toastify-toast-min-height: 64px;
    // --toastify-toast-max-height: 800px;
    // --toastify-font-family: sans-serif;
    // --toastify-z-index: 9999;
    // --toastify-text-color-light: #757575;
    // --toastify-text-color-dark: #fff;
    // //Used only for colored theme
    // --toastify-text-color-info: #fff;
    // --toastify-text-color-success: #fff;
    // --toastify-text-color-warning: #fff;
    // --toastify-text-color-error: #fff;
    // --toastify-spinner-color: #616161;
    // --toastify-spinner-color-empty-area: #e0e0e0;
    // // Used when no type is provided
    // // toast("**hello**")
    // --toastify-color-progress-light: linear-gradient(
    //   to right,
    //   #4cd964,
    //   #5ac8fa,
    //   #007aff,
    //   #34aadc,
    //   #5856d6,
    //   #ff2d55
    // );
    // // Used when no type is provided
    // --toastify-color-progress-dark: #bb86fc;
    // --toastify-color-progress-info: var(--toastify-color-info);
    // --toastify-color-progress-success: var(--toastify-color-success);
    // --toastify-color-progress-warning: var(--toastify-color-warning);
    // --toastify-color-progress-error: var(--toastify-color-error);
  },
  '.Toastify__toast': {
    fontFamily: 'inherit',
    fontWeight: 'bold',
  },
});

export default globalStyle;
