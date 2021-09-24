import { flattenObject, iterateProps, replaceProps } from "../common";

test("replace object props", () => {
	const testObj: ReplaceTestObjInterface = {
		a: 5,
		b: "xyz",
		c: new ReplaceTestClass(),
		d: {
			ca: 5,
			cb: "xyz",
			cc: new ReplaceTestClass(),
		},
		e: {
			ea: 5,
			eb: "xyz",
			ec: new ReplaceTestClass(),
			ed: {
				eda: 5,
				edb: "xyz",
				edc: new ReplaceTestClass(),
			}
		}
	}

	const testObj2 = undefined;
	const testObj3 = {};

	replaceProps(testObj, (prop) => typeof prop === "number" ? prop + 2 : prop);
	replaceProps(testObj2, (prop) => prop);
	replaceProps(testObj3, (prop) => prop);

	expect(JSON.stringify(testObj, undefined, 2)).toBe(JSON.stringify({
		a: 7,
		b: "xyz",
		c: {
			x: 7,
			y: "a string",
			readOnlyA: 7,
			readOnlyB: "a string",
		},
		d: {
			ca: 7,
			cb: "xyz",
			cc: {
				x: 7,
				y: "a string",
				readOnlyA: 7,
				readOnlyB: "a string",
			}
		},
		e: {
			ea: 7,
			eb: "xyz",
			ec: {
				x: 7,
				y: "a string",
				readOnlyA: 7,
				readOnlyB: "a string",
			},
			ed: {
				eda: 7,
				edb: "xyz",
				edc: {
					x: 7,
					y: "a string",
					readOnlyA: 7,
					readOnlyB: "a string",
				}
			}
		}
	} as ReplaceTestObjInterface, undefined, 2));

	expect(testObj2).toBe(undefined);
	expect(JSON.stringify(testObj3)).toBe(JSON.stringify({}));
})

test("flatten object", () => {
	const obj1 = {
		a: 5,
		b: "a string",
		c: {
			a: 6,
			b: "another string",
			c: {
				a: 7,
				b: "thats another" 
			}
		},
		d: {
			a: 6,
			b: "one other string",
		}
	};

	const flattened1 = flattenObject(obj1);

	expect(JSON.stringify(flattened1)).toBe(JSON.stringify({
		a: 5,
		b: "a string",
		"c.a": 6,
		"c.b": "another string",
		"d.a": 6,
		"d.b": "one other string",
		"c.c.a": 7,
		"c.c.b": "thats another",
	}));
});

test("iterate through object props (inc. nested)", () => {
	const obj1 = {
		a: 5,
		b: "a string",
		c: {
			a: 6,
			b: "another string",
			c: {
				a: 8,
				b: "thats another" 
			}
		},
		d: {
			a: 7,
			b: "one other string",
		}
	};

	const partialAbsClone: Record<string, unknown> = {};
	iterateProps(obj1, (_p, value, _k, absKey) => {
		partialAbsClone[absKey] = value;
		return value === 7;
	})

	expect(JSON.stringify(partialAbsClone)).toBe(JSON.stringify({
		a: 5,
		b: "a string",
		"c.a": 6,
		"c.b": "another string",
		"d.a": 7,
	}))

	const partialAbsClone2: Record<string, unknown> = {};
	iterateProps(obj1, (_p, value, _k, absKey) => {
		partialAbsClone2[absKey] = value;
		return value === 7;
	}, true)

	expect(JSON.stringify(partialAbsClone2, undefined, 2)).toBe(JSON.stringify({
		a: 5,
		b: "a string",
		c: {
			a: 6,
			b: "another string",
			c: {
				a: 8,
				b: "thats another" 
			}
		},
		d: {
			a: 7,
			b: "one other string",
		},
		"c.a": 6,
		"c.b": "another string",
		"c.c": {
			a: 8,
			b: "thats another" 
		},
		"d.a": 7,
	}, undefined, 2))
})

class ReplaceTestClass {
	x = 5;
	y = "a string";
	readonly readOnlyA: number = 5;
	readonly readOnlyB: string = "a string"
}

type ReplaceTestObjInterface = {
	[key in string | number]: unknown;
} & {
	a: number;
	b: "xyz";
	c: ReplaceTestClass;
	d: {
		ca: number;
		cb: "xyz";
		cc: ReplaceTestClass;
	};
	e: {
		ea: number;
		eb: "xyz";
		ec: ReplaceTestClass;
		ed: {
			eda: number;
			edb: "xyz";
			edc: ReplaceTestClass;
		};
	};
};