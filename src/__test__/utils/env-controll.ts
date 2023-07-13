export const onlyDev = (it: Function) => {
  if (process.env.NODE_ENV?.toLowerCase() !== "production") {
    it()
  }
}
export const onlyProd = (it: Function) => {
  if (process.env.NODE_ENV?.toLowerCase() === "production") {
    it()
  }
}
