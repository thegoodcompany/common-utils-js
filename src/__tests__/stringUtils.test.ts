import { halfReverseSplitAfterEach, removeCharAt, reverseSplitAfterEach, splitAfterEach } from "../stringUtils";

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