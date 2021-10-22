import { styled } from '@stitches.js';

const Button = styled('button', {
  // reset
  all: 'unset',
  appearance: 'none',
  userSelect: 'none',
  boxSizing: 'border-box',
  cursor: 'pointer',

  // display
  display: 'flex',
  jc: 'center',
  al: 'center',

  // fonts
  fontVariantNumeric: 'tabular-nums',
  fontSize: '$base',
  fontWeight: 'bold',

  // size
  px: '$2',
  py: '$2',

  // border
  border: '1px solid $colors$mauve7',

  // transition
  transition: 'background-color 100ms ease',

  defaultVariants: {
    kind: 'grayScale',
    shape: 'smooth',
  },
  variants: {
    kind: {
      whiteScale: {
        bc: '$loContrast',
        color: '$hiContrast',
        borderColor: '$gray7',
        '@hover': {
          '&:hover': {
            bc: '$gray4',
          },
        },
        '&:active': {
          bc: '$gray5',
        },
        '&:focus, &:focus-visible': {
          borderColor: '$gray7',
        },
      },
      grayScale: {
        bc: '$mauve3',
        color: '$mauve11',
        borderColor: '$mauve7',
        '@hover': {
          '&:hover': {
            bc: '$mauve4',
          },
        },
        '&:active': {
          bc: '$mauve5',
        },
        '&:focus, &:focus-visible': {
          borderColor: '$mauve7',
        },
      },
      redScale: {
        bc: '$red3',
        color: '$red11',
        borderColor: '$red7',
        '@hover': {
          '&:hover': {
            bc: '$red4',
          },
        },
        '&:active': {
          bc: '$red5',
        },
        '&:focus, &:focus-visible': {
          borderColor: '$red7',
        },
      },
      blueScale: {
        bc: '$blue3',
        color: '$blue11',
        borderColor: '$blue7',
        '@hover': {
          '&:hover': {
            bc: '$blue4',
          },
        },
        '&:active': {
          bc: '$blue5',
        },
        '&:focus, &:focus-visible': {
          borderColor: '$blue7',
        },
      },
      greenScale: {
        bc: '$green3',
        color: '$green11',
        borderColor: '$green7',
        '@hover': {
          '&:hover': {
            bc: '$green4',
          },
        },
        '&:active': {
          bc: '$green5',
        },
        '&:focus, &:focus-visible': {
          borderColor: '$green7',
        },
      },
    },
    shape: {
      smooth: {
        br: '$2',
      },
      round: {
        br: '$round',
      },
      pill: {
        br: '$pill',
      },
    },
    size: {
      small: {
        fontSize: '$sm',
        p: '$1',
      },
      large: {
        fontSize: '$lg',
        py: '$3',
      },
    },
    state: {
      active: {
        bc: '$mauve3',
        color: '$mauve12',
        '@hover': {
          '&:hover': {
            bc: '$mauve4',
          },
          '&:active': {
            bc: '$mauve5',
          },
          '&:focus, &:focus-visible': {
            bc: '$mauve5',
          },
        },
      },
      waiting: {
        bc: '$mauve3',
        color: '$transparent',
        pointerEvents: 'none',
        '@hover': {
          '&:hover': {
            bc: '$mauve4',
          },
          '&:active': {
            bc: '$mauve5',
          },
          '&:focus, &:focus-visible': {
            bc: '$mauve5',
          },
        },
      },
    },
    ghost: {
      true: {
        bc: 'transparent',
        borderColor: 'transparent',
      },
    },
  },
  compoundVariants: [
    {
      kind: 'whiteScale',
      ghost: 'true',
      css: {
        bc: 'transparent',
        borderColor: 'transparent',
      },
    },
    {
      kind: 'grayScale',
      ghost: 'true',
      css: {
        bc: 'transparent',
        borderColor: 'transparent',
      },
    },
    {
      kind: 'redScale',
      ghost: 'true',
      css: {
        bc: 'transparent',
        borderColor: 'transparent',
      },
    },
    {
      kind: 'blueScale',
      ghost: 'true',
      css: {
        bc: 'transparent',
        borderColor: 'transparent',
      },
    },
    {
      kind: 'greenScale',
      ghost: 'true',
      css: {
        bc: 'transparent',
        borderColor: 'transparent',
      },
    },
  ],
});

export default Button;
