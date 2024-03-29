export function areIdenticalArrays<T>(array1: T[] | undefined, array2: T[] | undefined, equals?: (t1: T, t2: T) => boolean): boolean {
    let _equals: (t1: T, t2: T) => boolean;
    if (!equals) _equals = (t1: T, t2: T) => t1 === t2;
    else _equals = equals;

    if (array1 === array2) return true;
    if (!(array1 && array2)) return false;

    const len = array1.length;
    if (len !== array2.length) return false;

    array1.sort();
    array2.sort();

    for (let i = 0; i < len; i++) {
        if (!_equals(array1[i], array2[i])) return false;
    }

    return true;
}

export function diffArray<T>(comparer: T[] | undefined, comparator: T[] | undefined, equals?: (t1: T, t2: T) => boolean): { added: T[], removed: T[] } {
    let _equals: (t1: T, t2: T) => boolean;
    if (!equals) _equals = (t1: T, t2: T) => t1 === t2;
    else _equals = equals;

    const result: { added: T[], removed: T[] } = { added: [], removed: [] }

    if (!comparator) {
        if (comparer) result.removed.push(...comparer);
        return result;
    }

    if (!comparer) {
        result.added.push(...comparator);
        return result;
    }

    comparer.sort();
    comparator.sort();

    const comparerLen = comparer.length;
    const comparatorLen = comparator.length;

    main:
    for (let i = 0, i2 = 0; ; i++) {
        if (i < comparerLen && i2 < comparatorLen) {
            if (_equals(comparer[i], comparator[i2])) {
                i2++;
                continue;
            }

            for (let i3 = i2 + 1; i3 < comparatorLen; i3++) {
                if (_equals(comparer[i], comparator[i3])) {
                    const sliced = comparator.slice(i2, i3);
                    if (sliced) result.added.push(...sliced);

                    i2 = i3 + 1;
                    continue main;
                }
            }
    
            result.removed.push(comparer[i]);
            continue;
        }

        const removedRemainings = comparer.slice(i);
        if (removedRemainings) result.removed.push(...removedRemainings);

        const addedRemainings = comparator.slice(i2);
        if (addedRemainings) result.added.push(...addedRemainings);
    
        break;
    }

    return result;
}