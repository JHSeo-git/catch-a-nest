const custom = (size: number) => `
  @media (max-width: ${size}px)
`;

const media = {
  xxxl: custom(2200),
  xxl: custom(1920),
  xl: custom(1440),
  lg: custom(1280),
  md: custom(1024),
  sm: custom(788),
  xs: custom(576),
  custom,
};

export default media;
