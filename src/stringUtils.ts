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

// todo: support RegEx for separator
export function toCamelCase(str: string, reserveSep?: boolean, sep?: string): string {
    const space = sep || " ";
    return str.split(space)
        .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
        .join(reserveSep ? space : "");
}

/**
 * Formats {@code date} into string.
 * # year, month, day
 *  - long: January 01, 2021
 *  - short: Jan 09, 2021
 *  - default: same as long
 * 
 * # year, month, day, hour/hour23, second
 *  - hour: Jan 01, 2021, 12:39 AM
 *  - hour23: Jan 01, 2021, 00:39
 * 
 * @param date the date to format
 * @param formatOption output type: long or short
 * @param include parameters to include
 * @returns a formatted date-string
 */
 export function formatDate(date: Date, formatOption?: "default" | "short" | "long", ...include: (IncludeOption)[]): string {
	const opt = !formatOption || formatOption === "default" ? "long" : formatOption;
	const inc = include.length ? include : ["year", "month", "day", "hour", "minute"];

	return new Intl.DateTimeFormat("en-us", {
		month: inc.includes("month") ? opt : undefined,
		day: inc.includes("day") ? "2-digit" : undefined,
		year: inc.includes("year") ? "numeric" : undefined,
        hour: inc.some(v => v === "hour" || v === "hour23") ? "2-digit" : undefined,
        minute: inc.includes("minute") ? "2-digit" : undefined,
        second: inc.includes("second") ? "2-digit" : undefined,
        hourCycle: inc.includes("hour23") ? "h23" : undefined,
	} as Intl.DateTimeFormatOptions & { hourCycle?: string }).format(date);
}

export type IncludeOption = "month" | "day" | "year" | "hour" | "hour23" | "minute" | "second";