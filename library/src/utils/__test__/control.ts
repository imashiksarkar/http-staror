type ArgType = () => void;

export const onlyDev = (it: ArgType) => {
  if (process.env.NODE_ENV?.toLowerCase() !== "production") {
    it();
  }
};
export const onlyProd = (it: ArgType) => {
  if (process.env.NODE_ENV?.toLowerCase() === "production") {
    it();
  }
};
