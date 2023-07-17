const HttpStatuses = {
  Continue: { value: "Continue", code: 100 },
  SwitchingProtocols: { value: "SwitchingProtocols", code: 101 },
  Processing: { value: "Processing", code: 102 },
  EarlyHints: { value: "EarlyHints", code: 103 },
  OK: { value: "OK", code: 200 },
  Created: { value: "Created", code: 201 },
  Accepted: { value: "Accepted", code: 202 },
  NonAuthoritativeInformation: {
    value: "NonAuthoritativeInformation",
    code: 203,
  },
  NoContent: { value: "NoContent", code: 204 },
  ResetContent: { value: "ResetContent", code: 205 },
  PartialContent: { value: "PartialContent", code: 206 },
  MultiStatus: { value: "MultiStatus", code: 207 },
  AlreadyReported: { value: "AlreadyReported", code: 208 },
  IMUsed: { value: "IMUsed", code: 226 },
  MultipleChoices: { value: "MultipleChoices", code: 300 },
  MovedPermanently: { value: "MovedPermanently", code: 301 },
  Found: { value: "Found", code: 302 },
  SeeOther: { value: "SeeOther", code: 303 },
  NotModified: { value: "NotModified", code: 304 },
  UseProxy: { value: "UseProxy", code: 305 },
  TemporaryRedirect: { value: "TemporaryRedirect", code: 307 },
  PermanentRedirect: { value: "PermanentRedirect", code: 308 },
  BadRequest: { value: "BadRequest", code: 400 },
  Unauthorized: { value: "Unauthorized", code: 401 },
  PaymentRequired: { value: "PaymentRequired", code: 402 },
  Forbidden: { value: "Forbidden", code: 403 },
  NotFound: { value: "NotFound", code: 404 },
  MethodNotAllowed: { value: "MethodNotAllowed", code: 405 },
  NotAcceptable: { value: "NotAcceptable", code: 406 },
  ProxyAuthenticationRequired: {
    value: "ProxyAuthenticationRequired",
    code: 407,
  },
  RequestTimeout: { value: "RequestTimeout", code: 408 },
  Conflict: { value: "Conflict", code: 409 },
  Gone: { value: "Gone", code: 410 },
  LengthRequired: { value: "LengthRequired", code: 411 },
  PreconditionFailed: { value: "PreconditionFailed", code: 412 },
  PayloadTooLarge: { value: "PayloadTooLarge", code: 413 },
  URITooLong: { value: "URITooLong", code: 414 },
  UnsupportedMediaType: { value: "UnsupportedMediaType", code: 415 },
  RangeNotSatisfiable: { value: "RangeNotSatisfiable", code: 416 },
  ExpectationFailed: { value: "ExpectationFailed", code: 417 },
  ImATeapot: { value: "ImATeapot", code: 418 },
  MisdirectedRequest: { value: "MisdirectedRequest", code: 421 },
  UnprocessableEntity: { value: "UnprocessableEntity", code: 422 },
  Locked: { value: "Locked", code: 423 },
  FailedDependency: { value: "FailedDependency", code: 424 },
  TooEarly: { value: "TooEarly", code: 425 },
  UpgradeRequired: { value: "UpgradeRequired", code: 426 },
  PreconditionRequired: { value: "PreconditionRequired", code: 428 },
  TooManyRequests: { value: "TooManyRequests", code: 429 },
  RequestHeaderFieldsTooLarge: {
    value: "RequestHeaderFieldsTooLarge",
    code: 431,
  },
  UnavailableForLegalReasons: {
    value: "UnavailableForLegalReasons",
    code: 451,
  },
  InternalServerError: { value: "InternalServerError", code: 500 },
  NotImplemented: { value: "NotImplemented", code: 501 },
  BadGateway: { value: "BadGateway", code: 502 },
  ServiceUnavailable: { value: "ServiceUnavailable", code: 503 },
  GatewayTimeout: { value: "GatewayTimeout", code: 504 },
  HTTPVersionNotSupported: { value: "HTTPVersionNotSupported", code: 505 },
  VariantAlsoNegotiates: { value: "VariantAlsoNegotiates", code: 506 },
  InsufficientStorage: { value: "InsufficientStorage", code: 507 },
  LoopDetected: { value: "LoopDetected", code: 508 },
  NotExtended: { value: "NotExtended", code: 510 },
  NetworkAuthenticationRequired: {
    value: "NetworkAuthenticationRequired",
    code: 511,
  },
  UnparseableResponseHeaders: {
    value: "UnparseableResponseHeaders",
    code: 600,
  },
  ConnectionTimedOut: { value: "ConnectionTimedOut", code: 601 },
  RequestTimedOut: { value: "RequestTimedOut", code: 602 },
  NameNotResolved: { value: "NameNotResolved", code: 603 },
} as const

// single value object type on HttpStatuses
interface IHttpStatus {
  value: keyof typeof HttpStatuses
  code: number
}

export const Status = HttpStatuses as {
  [key in keyof typeof HttpStatuses]: IHttpStatus
}

type HttpStatusKeysType = keyof typeof HttpStatuses

export type ExtendedHttpStatusKeysType = HttpStatusKeysType | `x-${string}`

export type setStatusParamType = ExtendedHttpStatusKeysType | IHttpStatus

export interface IStatus {
  status: ExtendedHttpStatusKeysType
  statusCode: number
  message: string
}

interface IStatusPrototype extends IStatus {
  readonly setStatusCode: (statusCode: number) => IStatusPrototype
  readonly setMessage: (message: string) => IStatusPrototype
}

class Http implements IStatusPrototype {
  declare readonly status: ExtendedHttpStatusKeysType
  declare statusCode: number
  declare message: string

  static readonly setStatus = (status: setStatusParamType) => {
    // if status param is an onject then the value would be a string that exists inside of HttpStatuses
    if (status instanceof Object)
      status = status.value as ExtendedHttpStatusKeysType
    // remove x- if it is a custom status
    else if (status.startsWith("x-"))
      status = status.slice(2) as ExtendedHttpStatusKeysType

    const statusObj = Object.create(new Http()) as IStatusPrototype
    statusObj.status = status

    // if the status exists in HttpStatus then the status code would be relative to the key otherwise a generic 200
    statusObj.statusCode =
      status in HttpStatuses
        ? HttpStatuses[status as HttpStatusKeysType].code
        : 200

    statusObj.message = status

    return statusObj
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode
    return this
  }

  setMessage(message: string) {
    this.message = message
    return this
  }
}

export default Http
