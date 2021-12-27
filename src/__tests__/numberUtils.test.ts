import { getRand } from "..";
import { extractNumbers, readModes, toWord } from "../numberUtils";

test("extract numbers from string", () => {
    expect(extractNumbers("5264.25")).toBe(5264.25);
    expect(extractNumbers("5b26.42")).toBe(526.42);
    expect(extractNumbers("52c4.54c.36")).toBe(524.5436);
    expect(extractNumbers("52c4")).toBe(524);
})

test("convert number to word as digits", () => {
    expect(toWord("5", readModes.DIGIT, " ")).toBe("Five");
    expect(toWord("-5", readModes.DIGIT, " ")).toBe("Minus five");
    expect(toWord(".5", readModes.DIGIT, " ")).toBe("Point five");
    expect(toWord("-.5", readModes.DIGIT, " ")).toBe("Minus point five");
    expect(toWord("555", readModes.DIGIT, " ")).toBe("Five five five");
    expect(toWord("-555", readModes.DIGIT, " ")).toBe("Minus five five five");
    expect(toWord(".555", readModes.DIGIT, " ")).toBe("Point five five five");
    expect(toWord("-.555", readModes.DIGIT, " ")).toBe("Minus point five five five");
    expect(toWord("5.55", readModes.DIGIT, " ")).toBe("Five point five five");
    expect(toWord("-5.55", readModes.DIGIT, " ")).toBe("Minus five point five five");
})

test("convert number to words", () => {
    expect(toWord("5", readModes.NUMBER)).toBe("Five");
    expect(toWord("55", readModes.NUMBER)).toBe("Fifty five");
    expect(toWord("50", readModes.NUMBER)).toBe("Fifty");
    expect(toWord(".5", readModes.NUMBER)).toBe("Point five");
    expect(toWord("0.5", readModes.NUMBER)).toBe("Point five");
    expect(toWord("505", readModes.NUMBER)).toBe("Five hundred five");
    expect(toWord("555", readModes.NUMBER)).toBe("Five hundred fifty five");
    expect(toWord("2021", readModes.NUMBER, "")).toBe("Twothousandtwentyone");
    expect(toWord("555.55", readModes.NUMBER)).toBe("Five hundred fifty five point five five");
    expect(toWord("555.50", readModes.NUMBER)).toBe("Five hundred fifty five point five zero");
    expect(toWord("5000000", readModes.NUMBER)).toBe("Five million");
    expect(toWord("5000001", readModes.NUMBER)).toBe("Five million one");
    expect(toWord("5000010", readModes.NUMBER)).toBe("Five million ten");
})

test("rand generator", () => {
    const between = (actual: number, from: number, to: number) => {
        expect(actual).toBeLessThanOrEqual(to);
        expect(actual).toBeGreaterThanOrEqual(from);
    }

    between(getRand(0, 1), 0, 1);
    between(getRand(.5, 1), .5, 1);
    between(getRand(1, .5), .5, 1);
    between(getRand(1, 1), 1, 1);
    between(getRand(.3, .7), .3, .7);
})