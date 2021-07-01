export const dot = ".";

/**
 * Replace properties (including nested props) of an object with {@code replacer()}
 * 
 * @param o         an object whose properties to replace
 * @param replacer  a replacer function called with current value, key, and absolute key (dot notation) of currently evaluating property
 */
export function replaceProps(o: object | undefined, replacer: (prop: unknown, key: string, absKey: string) => unknown): void {
	if (o === undefined) return;
	iterateProps(o, (parent, child, key, absKey) => parent[key] = replacer(child, key, absKey));
}

/**
 * Flatten an objects all properties. Basically turns an structured object into 1 dimensional flatten object.
 * Take this for instance,
 * <code>
 * {
 *  a: xyz,
 *  b: {
 *      a: ijk,
 *  }
 * }
 * </code>
 * passing this object into the {@code o} parameter returns an object that is equivalent to:
 * <code>
 * {
 *  a: xyz,
 *  b.a: ijk
 * }
 * </code>
 * 
 * @param o the object that is to flatten
 * @returns a new object with flattened properties; ergo, no nested objects
 */
export function flattenObject(o: object | undefined): Record<string, unknown> {
    if (!o) return {};
    const res: Record<string, unknown> = { };

    iterateProps(o, (_parent, child, _key, absKey) => res[absKey] = child);
    return res;
}

/**
 * Iterate and invokes {@code callbackFunc} on each property (inc. nested properties) of {@code o} object until either
 * {@code callbackFunc} returns true or until the end of all props.
 * 
 * @param o             the object to iterate through
 * @param callbackFunc  a callback function that will be called on each of the properties (including nested properties) of the object
 * @return true if {@code callbackFunc} ever returns true
 */
export function iterateProps(o: object, callbackFunc: (directParent: Record<string, unknown>, value: unknown, key: string, absKey: string) => unknown | boolean): boolean {
	const parents: IterateObjectContainer[] = [{ absKey: "", obj: o as Record<string, unknown>}];
    let len = parents.length;

    let separator = "";
    for (let i = 0; i < len; i++) {
        const container = parents[i];
        const parent = container.obj;

        if (Object.keys(parent).some((key) => {
            if (i === 1) separator = dot;

			const absKey = container.absKey + separator + key;
            const value = parent[key];

            if (value && typeof value === "object") {
                parents.push({ absKey: absKey, obj: value as Record<string, unknown>});
                len++;
            } else {
                // because predicate accepts any value that is coercible to the Boolean value true
                // as true; but we don't
                if (callbackFunc(parent, value, key, absKey) === true)
                    return true;
			}

            return false;
        })) {
            return true;
        }
    }

    return false;
}


interface IterateObjectContainer {
	absKey: string,
	obj: Record<string, unknown>,
}