import { describe, expect, it, vi } from "vitest"
import { Status } from "../index"

import { HttpStatuses, safeEnumAccess } from "../Http"
import { onlyDev, onlyProd } from "./utils/env-controll"

describe("Keys", () => {
  it("should have length of 66", () => {
    expect(Object.keys(Status)).toHaveLength(66)
  })
})

describe("status", () => {
  it("should return 200, given a vadid input", () => {
    const result = safeEnumAccess(HttpStatuses, "OK")
    expect(result).toBe(200)
  })
  it("should return null, given custom input", () => {
    const result = safeEnumAccess(HttpStatuses, "x-aa")
    expect(result).toBe(null)
  })
})

describe("env-controll", () => {
  it("should  call the given function", (t) => {
    const mock = vi.fn().mockImplementation(() => {})
    onlyDev(mock)
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it("should not call the given function", () => {
    const mock = vi.fn().mockImplementation(() => {})
    onlyProd(mock)
    expect(mock).not.toHaveBeenCalled()
  })
  onlyProd(() => {
    describe("set to prod by env", () => {
      it("should call the given function", () => {
        const mock = vi.fn().mockImplementation(() => {})
        onlyProd(mock)
        expect(mock).toHaveBeenCalledTimes(1)
      })
    })
  })
})
