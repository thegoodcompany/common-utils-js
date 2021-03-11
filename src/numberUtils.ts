import * as strUtils from "./stringUtils";

const defaultSeperator = " ";
const numbers: NumberInterface[] = [
    {
        intValue: 0,
        ones: "zero",
        tens: "",
        teens: "",
    },
    {
        intValue: 1,
        ones: "one",
        tens: "ten",
        teens: "eleven",
    },
    {
        intValue: 2,
        ones: "two",
        tens: "twenty",
        teens: "twelve",
    },
    {
        intValue: 3,
        ones: "three",
        tens: "thirty",
        teens: "thirteen",
    },
    {
        intValue: 4,
        ones: "four",
        tens: "forty",
        teens: "fourteen",
    },
    {
        intValue: 5,
        ones: "five",
        tens: "fifty",
        teens: "fifteen",
    },
    {
        intValue: 6,
        ones: "six",
        tens: "sixty",
        teens: "sixteen",
    },
    {
        intValue: 7,
        ones: "seven",
        tens: "seventy",
        teens: "seventeen",
    },
    {
        intValue: 8,
        ones: "eight",
        tens: "eighty",
        teens: "eighteen",
    },
    {
        intValue: 9,
        ones: "nine",
        tens: "ninty",
        teens: "ninteen",
    },
]

const suffixes: string[] = [
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
];

export const enum readModes {
    DIGIT, NUMBER
}

export function isNumber(number: number | string): boolean {
    return !Number.isNaN(+number);
}

export function extractNumbers(str: string, fallback?: number): number {
    const _fallback: number = fallback ? fallback : 0;
    let _str: string = str;

    let hasProcessedDot = false;
    for (let i = 0, len = _str.length; i < len; ) {
        const c = _str.charAt(i);
        if (isNumber(c)) {
            i++;
            continue;
        }

        if (c === "." && !hasProcessedDot) {
            hasProcessedDot = true;
            i++;
            continue;
        }

        _str = strUtils.removeCharAt(_str, i);
        len--;
    }

    if (_str.length === 1 && _str.charAt(0) === ".") return _fallback;
    if (_str.length > 0) return +_str;
    return _fallback;
}

function toWordInternal(number: string, mode: ReadMode, seperator?: string): string {
    if (number.length === 0) return "";

    // eslint-disable-next-line eqeqeq
    const _seperator = seperator == null ? defaultSeperator : seperator;
    let _number = number;
    let wordBuilder = "";

    if (number.charAt(0) === "-") {
        wordBuilder += "minus" + _seperator;
        _number = strUtils.removeCharAt(_number, 0);
    }

    const length = _number.length;
    switch (mode) {
        case readModes.DIGIT: {
            const charDigits: string[] = Array.from(_number);
            for (let i = 0; ; ) {
                const charDigit = charDigits[i];
                
                if (charDigit === ".") wordBuilder += "point";
                else wordBuilder += numbers[+charDigit].ones;
    
                if (++i < length) wordBuilder += _seperator;
                else break;
            }
            break;
        }
        case readModes.NUMBER: {
            const pointIndex = _number.indexOf(".");
            const parts: string[] = strUtils.halfReverseSplitAfterEach(suffixes.length * 3, pointIndex !== -1 ? _number.substring(0, pointIndex) : _number);
            const partsCount = parts.length;

            let encounteredNonZero = false;
            for (let partIndex = 0; partIndex < partsCount; partIndex++) {
                if (encounteredNonZero) wordBuilder += _seperator + suffixes[suffixes.length - 1];

                const periods: string[] = strUtils.halfReverseSplitAfterEach(3, parts[partIndex]);
                const periodCount = periods.length;

                let partEncounteredNonZero = false;
                let periodEncounteredNonZero = false;
                for (let periodIndex = 0; periodIndex < periodCount; periodIndex++) {
                    if (periodEncounteredNonZero) wordBuilder += _seperator + suffixes[periodCount - 1 - periodIndex];

                    periodEncounteredNonZero = false;
                    const period = periods[periodIndex];
                    const periodLength = period.length;
                    for (let i = 0, place = periodLength - 1; i < periodLength; i++, place--) {
                        const c = period.charAt(i);
                        if (c === "0") continue;
                        if (i > 0 || partEncounteredNonZero || (encounteredNonZero && periodIndex === 0)) wordBuilder += _seperator;
                        
                        let nextIndexednumber;
                        if (c === "1" && place === 1 && (nextIndexednumber = +_number.charAt(++i)) !== 0) wordBuilder += numbers[nextIndexednumber].teens;
                        else wordBuilder += toWordAtOffset(+c, place);

                        if (!periodEncounteredNonZero) {
                            periodEncounteredNonZero = true;
                            partEncounteredNonZero = true;
                            encounteredNonZero = true;
                        }
                    }
                }

            }
            break;
        }
        default:
            break;
    }

    return wordBuilder;
}

/**
 * Converts any given number to word
 *  
 * @param number the number to transform into words 
 * @param mode whether to read each digit individually or as whole
 * @return the converted string
*/
export function toWord(number: string, mode: ReadMode, seperator?: string): string {
    let result;
    if (mode === readModes.DIGIT) {
        result = toWordInternal(number, readModes.DIGIT, seperator);
    } else {
        const periodIndex = number.indexOf(".");
        if (periodIndex !== -1) {
            result = toWordInternal(number.substring(0, periodIndex), readModes.NUMBER, seperator);
            // eslint-disable-next-line eqeqeq
            if (result.length > 0) result += seperator == null ? defaultSeperator : seperator;
            result += toWordInternal(number.substring(periodIndex), readModes.DIGIT, seperator);
        } else {
            result = toWordInternal(number, readModes.NUMBER, seperator);
        }
    }

    const firstC = result.charAt(0);
    result = strUtils.removeCharAt(result, 0);
    result = firstC.toUpperCase() + result;
    
    return result;
}

function toWordAtOffset(number: number, offset: number): string {
    const _num: NumberInterface = numbers[number];
    if (offset === 0) return _num.ones;
    if (offset === 1) return _num.tens;
    if (offset === 2) return _num.ones + " hundred";
    return _num.ones + " " + suffixes[offset - 3];
}

export type ReadMode = readModes;

interface NumberInterface {
    intValue: number,
    ones: string,
    tens: string,
    teens: string,
}