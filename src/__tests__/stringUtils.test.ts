import { formatDate, halfReverseSplitAfterEach, removeCharAt, reverseSplitAfterEach, splitAfterEach, toCamelCase } from "../stringUtils";

test("test string remove char at index", () => {
    expect(removeCharAt("pottato", 2)).toBe("potato");
    expect(removeCharAt("", 2)).toBe("");
    expect(removeCharAt("ttomato", 0)).toBe("tomato");
    expect(removeCharAt("tomatoo", 6)).toBe("tomato");
})

test("test split after each", () => {
    expect(splitAfterEach(3, "potato tomato")).toStrictEqual(["pot", "ato", " to", "mat", "o"]);
    expect(splitAfterEach(6, "potatotomato")).toStrictEqual(["potato", "tomato"]);
    expect(splitAfterEach(2, "20211")).toStrictEqual(["20", "21", "1"]);
    expect(splitAfterEach(3, "")).toStrictEqual([]);
})

test("test reverse split", () => {
    expect(halfReverseSplitAfterEach(2, "20211")).toStrictEqual(["2", "02", "11"]);
    expect(reverseSplitAfterEach(2, "20211")).toStrictEqual(["11", "02", "2"]);
})

test("test to camel case", () => {
    expect(toCamelCase("ABC DEF")).toBe("AbcDef");
    expect(toCamelCase("ABC DEF", true)).toBe("Abc Def");
    expect(toCamelCase("ABC_DEF", true, "_")).toBe("Abc_Def");
})

test("test date format", () => {
    const date1 = new Date(2012, 5, 2, 14, 25, 20);
    const date2 = new Date(2012, 5, 2, 0, 25, 20);

    expect(formatDate(date1, "long", "year", "month", "day")).toBe("June 02, 2012");
    expect(formatDate(date1, "long", "year", "month", "day", "hour", "minute", "second")).toBe("June 02, 2012 at 02:25:20 PM");
    expect(formatDate(date1, "long", "year", "month", "day", "hour23", "minute")).toBe("June 02, 2012 at 14:25");
    expect(formatDate(date2, "long", "year", "month", "day", "hour23", "minute")).toBe("June 02, 2012 at 00:25");
})