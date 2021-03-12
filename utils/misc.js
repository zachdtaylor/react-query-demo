export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const range = (length) => {
  return Array.from(Array(length).keys());
};
