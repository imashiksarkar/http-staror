"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const index_1 = require("../index");
const Http_1 = require("../Http");
const env_controll_1 = require("./utils/env-controll");
(0, vitest_1.describe)("Keys", () => {
    (0, vitest_1.it)("should have length of 66", () => {
        (0, vitest_1.expect)(Object.keys(index_1.Status)).toHaveLength(66);
    });
});
(0, vitest_1.describe)("status", () => {
    (0, vitest_1.it)("should return 200, given a vadid input", () => {
        const result = (0, Http_1.safeEnumAccess)(Http_1.HttpStatuses, "OK");
        (0, vitest_1.expect)(result).toBe(200);
    });
    (0, vitest_1.it)("should return null, given custom input", () => {
        const result = (0, Http_1.safeEnumAccess)(Http_1.HttpStatuses, "x-aa");
        (0, vitest_1.expect)(result).toBe(null);
    });
});
(0, vitest_1.describe)("env-controll", () => {
    (0, vitest_1.it)("should  call the given function", (t) => {
        const mock = vitest_1.vi.fn().mockImplementation(() => { });
        (0, env_controll_1.onlyDev)(mock);
        (0, vitest_1.expect)(mock).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)("should not call the given function", () => {
        const mock = vitest_1.vi.fn().mockImplementation(() => { });
        (0, env_controll_1.onlyProd)(mock);
        (0, vitest_1.expect)(mock).not.toHaveBeenCalled();
    });
    (0, env_controll_1.onlyProd)(() => {
        (0, vitest_1.describe)("set to prod by env", () => {
            (0, vitest_1.it)("should call the given function", () => {
                const mock = vitest_1.vi.fn().mockImplementation(() => { });
                (0, env_controll_1.onlyProd)(mock);
                (0, vitest_1.expect)(mock).toHaveBeenCalledTimes(1);
            });
        });
    });
});
