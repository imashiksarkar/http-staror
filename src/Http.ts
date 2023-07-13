export enum HttpStatuses {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  URITooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
  UnparseableResponseHeaders = 600,
  ConnectionTimedOut = 601,
  RequestTimedOut = 602,
  NameNotResolved = 603,
}

export type StatusTypes = keyof typeof HttpStatuses | `x-${string}`

export const safeEnumAccess = (
  enumObj: Record<string | number, any>,
  key: StatusTypes
): number | null => (enumObj[key] !== undefined ? enumObj[key] : null)

export const Status = (() => {
  type dummyObjTypes = {
    -readonly [k in keyof typeof HttpStatuses]: k
  }
  type TupleOf<
    T,
    N extends number,
    R extends any[] = []
  > = R["length"] extends N ? R : TupleOf<T, N, [...R, T]>

  type StatusTypesTuple = TupleOf<
    Exclude<StatusTypes, `x-${string}`>,
    typeof keysLen
  >

  const keys = Object.keys(HttpStatuses) as StatusTypesTuple
  const keysLen: number = keys.length / 2
  keys.splice(0, keysLen)

  const dummyStatuses = {} as dummyObjTypes
  keys.forEach((key) => {
    dummyStatuses[key] = key
  })
  return dummyStatuses
})()

export interface IStatus {
  status: StatusTypes
  statusCode: number
  message: string
}

export interface IStatusPrototype extends IStatus {
  readonly setStatusCode: (statusCode: number) => IStatusPrototype
  readonly setMessage: (message: string) => IStatusPrototype
}

class Http implements IStatusPrototype {
  declare readonly status: StatusTypes
  declare statusCode: number
  declare message: string

  static readonly setStatus = (status: StatusTypes) => {
    const statusObj = Object.create(new Http()) as IStatusPrototype
    statusObj.status = status
    statusObj.statusCode = safeEnumAccess(HttpStatuses, status) || 200
    statusObj.message = status
    return statusObj
  }
  setStatusCode(statusCode: number) {
    this.statusCode = statusCode
    return this
  }
  setMessage(message: string) {
    console.log("setMessage", this)

    this.message = message
    return this
  }
}

export default Http
