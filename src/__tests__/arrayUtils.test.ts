import { areIdenticalArrays, diffArray } from "../arrayUtils";

describe("identical check is valid", () => {
	test("handle identical", () => {
		expect(areIdenticalArrays([5, 7, 6], [7, 5, 6])).toBe(true);
		expect(areIdenticalArrays(["b", "c", "d"], ["c", "d", "b"])).toBe(true);
		expect(areIdenticalArrays([{ a: 1 }, { a: 2 }], [{ a: 2 }, { a: 1 }], (a, b) => a.a - b.a)).toBe(true);
	});

	test("handle non-identical", () => {
		expect(areIdenticalArrays([5, 7, 6], [4, 5, 3])).toBe(false);
		expect(areIdenticalArrays([5, 7, 6], [7, 6])).toBe(false);
		expect(areIdenticalArrays(["b", "c", "d"], ["a", "d", "b"])).toBe(false);
		expect(areIdenticalArrays([{ a: 1 }, { a: 3 }], [{ a: 1 }, { a: 2 }], (a, b) => a.a - b.a)).toBe(false);
	})
});

describe("produce difference is valid", () => {
	test("handle alteration of basic array", () => {
		const diff = diffArray([5, 6, 4, 8, 7], [6, 3, 9, 4, 8]); // 4 5 6 7 8; 3 4 6 8 9
		expect(diff).toEqual({
			added: [3, 9],
			removed: [5, 7],
			unchanged: [4, 6, 8],
		});
	});

	test("handle all added", () => {
		const diff = diffArray(undefined, [2, 4, 6]);
		expect(diff).toEqual({
			added: [2, 4, 6],
			removed: [],
			unchanged: [],
		});
	});

	test("handle all removed", () => {
		const diff = diffArray([2, 4, 6], undefined);
		expect(diff).toEqual({
			added: [],
			removed: [2, 4, 6],
			unchanged: [],
		});
	});

	describe("handle identical", () => {
		test("when both undefined", () => {
			expect(diffArray(undefined, undefined)).toEqual({
				added: [],
				removed: [],
				unchanged: [],
			});
		});

		test("when both empty", () => {
			expect(diffArray([], [])).toEqual({
				added: [],
				removed: [],
				unchanged: [],
			});
		});

		test("when same elements", () => {
			expect(diffArray([4, 5, 2], [5, 2, 4])).toEqual({
				added: [],
				removed: [],
				unchanged: [2, 4, 5],
			});
		});
	});

	test("handle duplicate", () => {
		const diff = diffArray([2, 4, 5, 4, 6], [2, 4, 5, 6]);
		expect(diff).toEqual({
			added: [],
			removed: [4],
			unchanged: [2, 4, 5, 6],
		});
	});
});