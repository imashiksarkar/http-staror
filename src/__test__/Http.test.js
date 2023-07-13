"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const Http_1 = __importStar(require("../Http"));
(0, vitest_1.describe)("Http", () => {
    (0, vitest_1.it)("should return http object correctly", () => {
        (0, vitest_1.expect)(Http_1.default.setStatus(Http_1.Status.Accepted)
            .setMessage("Hurrah, Successfull!")
            .setStatusCode(500)).toEqual({
            status: "Accepted",
            message: "Hurrah, Successfull!",
            statusCode: 500,
        });
    });
    (0, vitest_1.it)("should return true, if it is an instance on Http class", () => {
        const http = Http_1.default.setStatus(Http_1.Status.Accepted);
        (0, vitest_1.expect)(http instanceof Http_1.default).toBe(true);
    });
    (0, vitest_1.it)("should return status as mes if message is not given", () => {
        const http = Http_1.default.setStatus(Http_1.Status.OK);
        (0, vitest_1.expect)(http).toEqual({
            status: "OK",
            statusCode: 200,
            message: "OK",
        });
    });
    (0, vitest_1.it)("should return status code of 404", () => {
        const http = Http_1.default.setStatus("NotFound");
        (0, vitest_1.expect)(http).toEqual({
            status: "NotFound",
            statusCode: 404,
            message: "NotFound",
        });
    });
    (0, vitest_1.it)("should return status code of 200 if it is a custom status and status code is not set manually", () => {
        const http = Http_1.default.setStatus("x-custom");
        (0, vitest_1.expect)(http).toEqual({
            status: "x-custom",
            statusCode: 200,
            message: "x-custom",
        });
    });
    (0, vitest_1.it)("should return message as custom", () => {
        const http = Http_1.default.setStatus("x-custom").setMessage("custom");
        (0, vitest_1.expect)(http).toEqual({
            status: "x-custom",
            statusCode: 200,
            message: "custom",
        });
    });
    (0, vitest_1.it)("should return status code of 500", () => {
        const http = Http_1.default.setStatus("x-custom").setStatusCode(500);
        (0, vitest_1.expect)(http).toEqual({
            status: "x-custom",
            statusCode: 500,
            message: "x-custom",
        });
    });
});
