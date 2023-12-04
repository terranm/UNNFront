export const deleteConsole = () => {
  // if (process.env.REACT_APP_TEST === "prod") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  // }
};
