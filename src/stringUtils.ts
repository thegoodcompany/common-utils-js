export function removeCharAt(str: string, index: number): string {
    return str.slice(0, index).concat(str.slice(index + 1));
}

/**
 * Splits a string after each specified number to character
 *
 * @param count number of character to skip before splitting the string
 * @param str   the string to split
 * @return array of split strings
*/
export function splitAfterEach(count: number, str: string): string[] {
    const length = str.length;
    const arraySize = Math.ceil(length / count);

    const splitString = [];
    for (let i = 0, i2 = 0; i < arraySize; i++) {
        splitString[i] = str.substring(i2, ((i2 += count) >= length ? length : i2));
    }

    return splitString;
}

/**
 * Splits a string from end to start after each specified number of chars then
 * returns the splitted strings in original order (ergo, in the order they appear\
 * on the string)
 *
 * @param count number of character to skip before splitting the string
 * @param str   the string to split
 * @return array of split strings
*/
export function halfReverseSplitAfterEach(count: number, str: string): string[] {
    const length = str.length;
    const arraySize = Math.ceil(length / count);

    const splitString = [];
    for (let i = arraySize - 1, i2 = length; i >= 0; i--) {
        const end = i2;
        splitString[i] = str.substring((i2 -= count) < 0 ? 0 : i2, end);
    }

    return splitString;
}

/**
 * Splits a string from end to start after each specified number of chars
 *
 * @param count number of characters to skip before splitting the string
 * @param str   the string to split
 * @return array of splitted strings
*/
export function reverseSplitAfterEach(count: number, str: string): string[] {
    const length = str.length;
    const arraySize = Math.ceil(length / count);

    const splitString = [];
    for (let i = 0, i2 = length; i < arraySize; i++) {
        const end = i2;
        splitString[i] = str.substring((i2 -= count) < 0 ? 0 : i2, end);
    }

    return splitString;
}
