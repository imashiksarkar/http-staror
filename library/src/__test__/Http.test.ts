import { describe, expect, it } from "vitest";
import { Http, Status } from "../index";

describe("Http", () => {
  it("should return http object correctly", () => {
    expect(
      Http.setStatus(Status.Accepted)
        .setMessage("Hurrah, Successfull!")
        .setStatusCode(500),
    ).toEqual({
      status: "Accepted",
      message: "Hurrah, Successfull!",
      statusCode: 500,
    });
  });
  it("should return true, if it is an instance on Http class", () => {
    const http = Http.setStatus(Status.Accepted);
    expect(http instanceof Http).toBe(true);
  });
  it("should return status as mes if message is not given", () => {
    const http = Http.setStatus(Status.OK);
    expect(http).toEqual({
      status: "OK",
      statusCode: 200,
      message: "OK",
    });
  });
  it("should return status code of 404", () => {
    const http = Http.setStatus("NotFound");
    expect(http).toEqual({
      status: "NotFound",
      statusCode: 404,
      message: "NotFound",
    });
  });
  it("should return status code of 200 if it is a custom status and status code is not set manually", () => {
    const http = Http.setStatus("x-custom");
    expect(http).toEqual({
      status: "custom",
      statusCode: 200,
      message: "custom",
    });
  });
  it("should return message as custom", () => {
    const http = Http.setStatus("x-custom").setMessage("custom");
    expect(http).toEqual({
      status: "custom",
      statusCode: 200,
      message: "custom",
    });
  });
  it("should return status code of 500", () => {
    const http = Http.setStatus("x-custom").setStatusCode(500);
    expect(http).toEqual({
      status: "custom",
      statusCode: 500,
      message: "custom",
    });
  });
});
