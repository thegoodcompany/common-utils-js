/**
 * Check whether {@code year} is a leap year or not
 * 
 * @param   year Year to check
 * @return  true if {@code year} is a leap year otherwise false
 * */
export function isLeapYear(year: number): boolean {
    return (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0));
}