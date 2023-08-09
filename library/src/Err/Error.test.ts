import { describe, expect, it } from "vitest"

import Err from "./Error"
import { onlyDev, onlyProd } from "../utils/__test__/control"
import { Status } from "../Http"

describe("Err", () => {
  it("should return status correctly", () => {
    expect(Err.setStatus(Status.Accepted).status).toBe("Accepted")
  })
  it("should return status code of 404", () => {
    expect(Err.setStatus(Status.NotFound).statusCode).toBe(404)
  })
  it("should return status code of 200, if custom status is provided and status code is not set explicitly", () => {
    expect(Err.setStatus("x-hii").statusCode).toBe(200)
  })
  onlyDev(() => {
    it("should return stack correctly", () => {
      expect(Err.setStatus(Status.Accepted).stack).not.toBe(null)
    })
  })
  it("should return stack as null", () => {
    expect(Err.setStatus(Status.Accepted).setNoStack().stack).toBe(null)
  })

  it("should return stack not be null", () => {
    expect(Err.setStatus(Status.Accepted).stack).not.toBe(null)
  })
  it("should return line no. 13", () => {
    expect(
      Err.setStatus(Status.Accepted).setNoStack().setLineNumber(13).lineNumber
    ).toBe(13)
  })
  it("should return line no. as null, if set to prod", () => {
    expect(
      Err.setProduction().setStatus(Status.Accepted).setLineNumber(13)
        .lineNumber
    ).toBe(null)
  })
  it("should return the correct file path", () => {
    expect(
      Err.setStatus(Status.Accepted).setFilePath(__filename).filePath
    ).toBe(__dirname + "/Error.test.ts")
  })
  it("should return where as null", () => {
    expect(Err.setStatus(Status.Accepted).where).toBe(null)
  })
  it("should have a value set to where", () => {
    expect(Err.setStatus(Status.Accepted).setWhere("here").where).toBe("here")
  })
  it("should return where as null, if implicitly set to prod", () => {
    expect(
      Err.setProduction().setStatus(Status.Accepted).setWhere("here").where
    ).toBe(null)
  })
  it("should return the correct unique identifier", () => {
    const identifier = "this is unique"
    expect(
      Err.setStatus(Status.Accepted).setUniqueIdentifier(identifier)
        .uniqueIdentifier
    ).toBe(identifier)
  })
  onlyDev(() => {
    it("should return err object correctly", () => {
      expect(
        Err.setStatus(Status.Ok)
          .setMessage("Ok..")
          .setStatusCode(201)
          .setIsOperational(true)
          .setWhere("Here")
          .setNoStack()
      ).toEqual({
        status: "Ok",
        message: "Ok..",
        statusCode: 201,
        isOperational: true,
        where: "Here",
        stack: null,
        filePath: null,
        isProduction: false,
        lineNumber: null,
        uniqueIdentifier: null,
      })
    })
  })

  describe("Production", () => {
    it("should return stack as null, while set to production", () => {
      expect(Err.setProduction().setStatus(Status.Ok).stack).toBe(null)
    })
    it("should return stack as null, even if setMessage is called while production is true", () => {
      expect(
        Err.setProduction().setStatus(Status.Ok).setMessage("Hii").stack
      ).toBe(null)
    })

    it("should return stack that contain message, if setMessage is called", () => {
      expect(
        Err.setProduction(false).setStatus(Status.Ok).setMessage("Hii").stack
      ).toMatch("Hii")
    })
    it("should return stack that contain status, if setMessage is called", () => {
      expect(Err.setProduction(false).setStatus(Status.Ok).stack).toMatch("Ok")
    })
  })

  describe("Explicit Production", () => {
    it("should return file path as null", () => {
      expect(
        Err.setProduction().setStatus(Status.Accepted).setFilePath(__filename)
          .filePath
      ).toBe(null)
    })
    it("should return unique identifier as null", () => {
      expect(
        Err.setProduction().setStatus(Status.Accepted).setUniqueIdentifier("a")
          .uniqueIdentifier
      ).toBe(null)
    })
  })

  onlyProd(() => {
    describe("Implicit Production", () => {
      it("should return null while env is set to production", () => {
        expect(Err.setStatus("Ok").stack).toBe(null)
        expect(Err.setStatus("Ok").setWhere("here").where).toBe(null)
        expect(Err.setStatus("Ok").isProduction).toBe(true)
      })
    })
  })
})
