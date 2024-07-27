/**
 * Default comparison function to compare two elements. It can compare when elements are either numeric or string. 
 * In other cases, consider providing your own implementation.
 *
 * @template T - The type of elements to compare.
 * 
 * @param {T} t1 - The first element to compare.
 * @param {T} t2 - The second element to compare.
 * @returns {number} - Returns 0 if elements are equal, a negative number if the first element is less than the second, 
 * and a positive number if the first element is greater than the second.
 * 
 * @example
 * compareFunc(1, 2); // -1
 * compareFunc(2, 2); // 0
 * compareFunc(3, 2); // 1
 */
export function compareFunc<T>(t1: T, t2: T): number {
	if (t1 === t2) return 0;
	if (typeof t1 === "number" && typeof t2 === "number") {
		return t1 - t2;
	}

	return t1 < t2 ? -1 : 1;
}

/**
 * Determines if two arrays are identical, i.e., contain the same elements in any order.
 *
 * @template T - The type of elements in the arrays.
 * 
 * @param {T[] | undefined} array1 - The first array to compare.
 * @param {T[] | undefined} array2 - The second array to compare.
 * @param {(t1: T, t2: T) => number} [compare=compareFunc] - An optional comparator function used to compare elements in the arrays. The default function handles numeric and string comparisons.
 * 
 * @returns {boolean} - Returns true if both arrays are identical, otherwise false.
 * 
 * @example
 * // Basic usage with default comparator
 * const array1 = [1, 2, 3];
 * const array2 = [3, 2, 1];
 * const result = areIdenticalArrays(array1, array2);
 * // result is true
 * 
 * @example
 * // Using a custom comparator
 * const array1 = [{ id: 1 }, { id: 2 }];
 * const array2 = [{ id: 2 }, { id: 1 }];
 * const result = areIdenticalArrays(array1, array2, (a, b) => a.id - b.id);
 * // result is true
 */
export function areIdenticalArrays<T>(
	array1: T[] | undefined, 
	array2: T[] | undefined, 
	compare: (t1: T, t2: T) => number = compareFunc
): boolean {
    if (array1 === array2) return true;
    if (!(array1 && array2)) return false;

    const len = array1.length;
    if (len !== array2.length) return false;

    const sArray1 = [...array1].sort(compare);
    const sArray2 = [...array2].sort(compare);

    for (let i = 0; i < len; i++) {
        if (compare(sArray1[i], sArray2[i])) return false;
    }

    return true;
}

/**
 * Compares two arrays and identifies elements that are added, removed, or unchanged.
 *
 * @template T - The type of elements in the arrays.
 * 
 * @param {T[] | undefined} comparer - The first array to compare. Elements in this array but not in the second array 
 * will be marked as removed.
 * @param {T[] | undefined} comparator - The second array to compare. Elements in this array but not in the first array 
 * will be marked as added.
 * @param {(t1: T, t2: T) => number} [compare=compareFunc] - An optional comparator function used to compare elements 
 * in the arrays. The default function handles numeric and string comparisons.
 * 
 * @returns {DiffArrayResult<T>} An object containing three arrays: added, removed, and unchanged
 * 
 * @example
 * // Basic usage with default comparator
 * const comparer = [1, 2, 3];
 * const comparator = [2, 3, 4];
 * const result = diffArray(comparer, comparator);
 * // result is { added: [4], removed: [1], unchanged: [2, 3] }
 * 
 * @example
 * // Using a custom comparator
 * const comparer = [{ id: 1 }, { id: 2 }];
 * const comparator = [{ id: 2 }, { id: 3 }];
 * const result = diffArray(comparer, comparator, (a, b) => a.id - b.id);
 * // result is { added: [{ id: 3 }], removed: [{ id: 1 }], unchanged: [{ id: 2 }] }
 */
export function diffArray<T>(
	comparer: T[] | undefined, 
	comparator: T[] | undefined, 
	compare: (t1: T, t2: T) => number = compareFunc,
): DiffArrayResult<T> {
    const result: DiffArrayResult<T> = { added: [], removed: [], unchanged: [] };

    if (!comparator) {
        if (comparer) result.removed.push(...comparer);
        return result;
    }

    if (!comparer) {
        result.added.push(...comparator);
        return result;
    }

    const sComparer = [...comparer].sort(compare);
    const sComparator = [...comparator].sort(compare);

	let i = 0;
	let i2 = 0;
	const size = sComparer.length;
	const size2 = sComparator.length;
	
	while (i < size && i2 < size2) {
		const it = sComparer[i];
		const that = sComparator[i2];
		const comparison = compare(it, that);

		if (comparison === 0) {
			result.unchanged.push(it);
			i++;
			i2++;
		} else if (comparison > 0) {
			result.added.push(that);
			i2++;
		} else {
			result.removed.push(it);
			i++;
		}
	}

	result.removed.push(...sComparer.slice(i));
	result.added.push(...sComparator.slice(i2));

    return result;
}

export interface DiffArrayResult<T> { 
	added: T[], 
	removed: T[], 
	unchanged: T[],
}