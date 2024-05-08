import {beforeAll, describe, expect, test, vi} from "vitest"

describe("Sample test", () => {
    beforeAll(() => {
        vi.resetModules();
    });

    test("Test something", () => {
        expect(true).toBe(true);
    });
});