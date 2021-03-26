const dot = ".";

export function replaceProps(o: object | undefined, replacer: (prop: unknown, key: string, absKey: string) => unknown): void {
	if (o === undefined) return;

	const objects: ReplaceObjectContainer[] = [{ absKey: "", obj: o as Record<string, unknown>}];
    let len = objects.length;

    for (let i = 0; i < len; i++) {
        const objContainer = objects[i];
        const obj = objContainer.obj;

        Object.keys(obj).forEach((key) => {
			const absKey = objContainer.absKey + dot + key;
            const value = obj[key];

            if (value && typeof value === "object") {
                objects.push({ absKey: absKey, obj: value as Record<string, unknown>});
                len++;
            } else {
				obj[key] = replacer(value, key, absKey);
			}
        })
    }
}

interface ReplaceObjectContainer {
	absKey: string,
	obj: Record<string, unknown>,
}