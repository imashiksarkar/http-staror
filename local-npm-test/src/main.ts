import { Err } from "http-staror"

console.log(
  Err.setStatus("Ok")
    .setMessage("Something Went Wrong!")
    .setNoStack()
    .setIsOperational(false)
)
