const custom = (z: number) => `
  z-index: ${z};
`;

const zIndex = {
  fullScreenLoader: custom(900),
  alert: custom(600),
  modal: custom(500),
  behind: custom(-1),
  custom,
};

export default zIndex;
