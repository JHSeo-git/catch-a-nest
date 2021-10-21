import { styled } from '@stitches.js';

function Container({ children }: { children: React.ReactNode }) {
  return <ContainerBox>{children}</ContainerBox>;
}

const ContainerBox = styled('section', {
  height: '100%',
  maxWidth: '$maxWidth',
  m: '0 auto',
  py: '$4',

  defaultVariants: {
    size: 'base',
  },
  variants: {
    max: {
      true: {
        maxWidth: '100%',
        p: 0,
      },
    },
    size: {
      small: {
        px: '$1',
      },
      base: {
        px: '$2',
      },
      large: {
        px: '$4',
      },
    },
  },
});

export default Container;
