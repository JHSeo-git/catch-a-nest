const custom = (z: number) => `
  z-index: ${z};
`;

const zIndex = {
  alert: custom(999),
  fullScreenLoader: custom(900),
  modal: custom(500),
  fixedButton: custom(400),
  behind: custom(-1),
  custom,
};

export default zIndex;
