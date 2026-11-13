import { describe, it, expect, expectTypeOf } from "vitest";
import { minutes, sessionId, type Minutes, type SessionId } from "./brand.js";

describe("branded types", () => {
  it("accepts valid values", () => {
    expect(minutes(25)).toBe(25);
    expect(sessionId("s-20261027-1")).toBe("s-20261027-1");
  });

  it("rejects invalid values", () => {
    expect(() => minutes(0)).toThrow(RangeError);
    expect(() => minutes(1.5)).toThrow(RangeError);
    expect(() => minutes(601)).toThrow(RangeError);
    expect(() => sessionId("")).toThrow();
    expect(() => sessionId("Has Spaces")).toThrow();
  });

  it("plain values and other brands are not accepted", () => {
    expectTypeOf<number>().not.toEqualTypeOf<Minutes>();
    expectTypeOf<Minutes>().toExtend<number>();
    // @ts-expect-error a plain number is not Minutes
    const m: Minutes = 25;
    const id: SessionId = sessionId("abc");
    // @ts-expect-error a SessionId is not Minutes
    const wrong: Minutes = id;
    expect([m, wrong]).toEqual([25, "abc"]);
  });
});