const { Err, Status } = require("http-staror")

console.log(
  Err.setProduction().setStatus(Status.BadGateway).setMessage("Hello")
)
