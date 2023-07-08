export const isNumber = (input: string[]): boolean => {
  let result = true;
  input.forEach((element) => (isNaN(Number(element)) ? (result = false) : null));
  return result;
};
