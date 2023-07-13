import Http, {
  HttpStatuses,
  IStatus,
  StatusTypes,
  safeEnumAccess,
} from "./Http"

interface IError extends IStatus {
  where: string | null
  lineNumber: number | null
  filePath: string | null
  isOperational: boolean
  uniqueIdentifire: string | null
  isProduction: boolean | null
  stack: string | null
}

interface IErrorPrototype extends IError {
  readonly setMessage: (message: string) => IErrorPrototype
  readonly setStatusCode: (statusCode: number) => IErrorPrototype
  readonly setWhere: (where: string) => IErrorPrototype
  readonly setLineNumber: (lineNumber: number) => IErrorPrototype
  readonly setFilePath: (filePath: string) => IErrorPrototype
  readonly setIsOperational: (isOperational?: boolean) => IErrorPrototype
  readonly setUniqueIdentifire: (uniqueIdentifire: string) => IErrorPrototype
  readonly setNoStack: () => IErrorPrototype
}

class Err extends Http implements IErrorPrototype {
  static #isProductionStatic: boolean | null = null
  isProduction: boolean | null = null
  declare isOperational: boolean
  declare where: string | null
  declare filePath: string | null
  declare lineNumber: number | null
  declare uniqueIdentifire: string | null
  declare stack: string | null

  constructor() {
    super()
    this.isProduction =
      Err.#isProductionStatic === null
        ? process.env.NODE_ENV?.toLowerCase() === "production"
        : Err.#isProductionStatic
    Err.#isProductionStatic = null
  }

  static readonly setStatus = (status: StatusTypes) => {
    const __proto__ = new Err()
    const statusObj = Object.create(__proto__) as IErrorPrototype
    statusObj.status = status
    statusObj.statusCode = safeEnumAccess(HttpStatuses, status) || 200
    statusObj.message = status
    statusObj.isProduction = __proto__.isProduction
    statusObj.isOperational = false
    statusObj.where = null
    statusObj.filePath = null
    statusObj.lineNumber = null
    statusObj.uniqueIdentifire = null
    statusObj.stack = !__proto__.isProduction ? new Error(status).stack! : null
    return statusObj
  }
  setMessage(message: string) {
    this.message = message
    this.stack = !this.isProduction ? new Error(message).stack! : null
    return this
  }
  setWhere(where: string) {
    this.where = !this.isProduction ? where : null
    return this
  }
  setLineNumber(lineNumber: number) {
    this.lineNumber = !this.isProduction ? lineNumber : null
    return this
  }
  setFilePath(filePath: string) {
    this.filePath = !this.isProduction ? filePath : null
    return this
  }
  setUniqueIdentifire(uniqueIdentifire: string) {
    this.uniqueIdentifire = !this.isProduction ? uniqueIdentifire : null
    return this
  }
  setNoStack() {
    this.stack = null
    return this
  }
  setIsOperational(isOperational: boolean = true) {
    this.isOperational = isOperational
    return this
  }
  static setProduction(isProduction: boolean = true) {
    this.#isProductionStatic = isProduction
    return { setStatus: this.setStatus }
  }
}

export default Err
