"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Error_1 = __importDefault(require("../Error"));
const Http_1 = require("../Http");
const env_controll_1 = require("./utils/env-controll");
(0, vitest_1.describe)("Err", () => {
    (0, vitest_1.it)("should return status correctly", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).status).toBe("Accepted");
    });
    (0, vitest_1.it)("should return status code of 404", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.NotFound).statusCode).toBe(404);
    });
    (0, vitest_1.it)("should return status code of 200, if custom satatus is provided and status code is not set explicitely", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus("x-hii").statusCode).toBe(200);
    });
    (0, env_controll_1.onlyDev)(() => {
        (0, vitest_1.it)("should return stack correctly", () => {
            (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).stack).not.toBe(null);
        });
    });
    (0, vitest_1.it)("should return stack as null", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).setNoStack().stack).toBe(null);
    });
    (0, vitest_1.it)("should return stack not be null", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).stack).not.toBe(null);
    });
    (0, vitest_1.it)("should return line no. 13", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).setNoStack().setLineNumber(13).lineNumber).toBe(13);
    });
    (0, vitest_1.it)("should return line no. as null, if set to prod", () => {
        (0, vitest_1.expect)(Error_1.default.setProduction().setStatus(Http_1.Status.Accepted).setLineNumber(13)
            .lineNumber).toBe(null);
    });
    (0, vitest_1.it)("should return the correct file path", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).setFilePath(__filename).filePath).toBe(__dirname + "/Error.test.ts");
    });
    (0, vitest_1.it)("should return where as null", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).where).toBe(null);
    });
    (0, vitest_1.it)("should have a value set to where", () => {
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).setWhere("here").where).toBe("here");
    });
    (0, vitest_1.it)("should return where as null, if implecitely set to prod", () => {
        (0, vitest_1.expect)(Error_1.default.setProduction().setStatus(Http_1.Status.Accepted).setWhere("here").where).toBe(null);
    });
    (0, vitest_1.it)("should return the correct unique identifire", () => {
        const identifire = "this is unique";
        (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.Accepted).setUniqueIdentifire(identifire)
            .uniqueIdentifire).toBe(identifire);
    });
    (0, env_controll_1.onlyDev)(() => {
        (0, vitest_1.it)("should return err object correctly", () => {
            (0, vitest_1.expect)(Error_1.default.setStatus(Http_1.Status.OK)
                .setMessage("OK..")
                .setStatusCode(201)
                .setIsOperational(true)
                .setWhere("Here")
                .setNoStack()).toEqual({
                status: "OK",
                message: "OK..",
                statusCode: 201,
                isOperational: true,
                where: "Here",
                stack: null,
                filePath: null,
                isProduction: false,
                lineNumber: null,
                uniqueIdentifire: null,
            });
        });
    });
    (0, vitest_1.describe)("Production", () => {
        (0, vitest_1.it)("should return stack as null, while set to production", () => {
            (0, vitest_1.expect)(Error_1.default.setProduction().setStatus(Http_1.Status.OK).stack).toBe(null);
        });
        (0, vitest_1.it)("should return stack as null, even if setMessage is called while production is true", () => {
            (0, vitest_1.expect)(Error_1.default.setProduction().setStatus(Http_1.Status.OK).setMessage("Hii").stack).toBe(null);
        });
        (0, vitest_1.it)("should return stack that contain message, if setMessage is called", () => {
            (0, vitest_1.expect)(Error_1.default.setProduction(false).setStatus(Http_1.Status.OK).setMessage("Hii").stack).toMatch("Hii");
        });
        (0, vitest_1.it)("should return stack that contain staus, if setMessage is called", () => {
            (0, vitest_1.expect)(Error_1.default.setProduction(false).setStatus(Http_1.Status.OK).stack).toMatch("OK");
        });
    });
    (0, vitest_1.describe)("Explecite Production", () => {
        (0, vitest_1.it)("should return file path as null", () => {
            (0, vitest_1.expect)(Error_1.default.setProduction().setStatus(Http_1.Status.Accepted).setFilePath(__filename)
                .filePath).toBe(null);
        });
        (0, vitest_1.it)("should return unique identifire as null", () => {
            (0, vitest_1.expect)(Error_1.default.setProduction().setStatus(Http_1.Status.Accepted).setUniqueIdentifire("a")
                .uniqueIdentifire).toBe(null);
        });
    });
    (0, env_controll_1.onlyProd)(() => {
        (0, vitest_1.describe)("Implecite Production", () => {
            (0, vitest_1.it)("should return null while env is set to production", () => {
                (0, vitest_1.expect)(Error_1.default.setStatus("OK").stack).toBe(null);
                (0, vitest_1.expect)(Error_1.default.setStatus("OK").setWhere("here").where).toBe(null);
                (0, vitest_1.expect)(Error_1.default.setStatus("OK").isProduction).toBe(true);
            });
        });
    });
});
