// const { Err, Status } = require("http-staror")
import { Err, Status } from "http-staror"

console.log(
  Err.setProduction().setStatus(Status.BadGateway).setMessage("Hello")
)
