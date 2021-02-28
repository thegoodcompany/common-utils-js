export declare function areIdenticalArrays<T>(array1: T[] | undefined, array2: T[] | undefined, equals?: (t1: T, t2: T) => boolean): boolean;
export declare function diffArray<T>(comparer: T[] | undefined, comparator: T[] | undefined, equals?: (t1: T, t2: T) => boolean): {
    added: T[];
    removed: T[];
};
