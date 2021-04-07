const custom = (z: number) => `
  z-index: ${z};
`;

const zIndex = {
  alert: custom(999),
  fullScreenLoader: custom(900),
  modal: custom(500),
  fixedHeader: custom(400),
  fixedButton: custom(300),
  behind: custom(-1),
  custom,
};

export default zIndex;
