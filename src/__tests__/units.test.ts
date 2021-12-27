import { Days, Hours, Millis, Minutes, Nanos, Seconds } from "../units/times";

test("time conversion is okay", () => {
	const testNanos = new Nanos(1000000);
	expect(testNanos.toMillis().value).toBe(1);

	const testMillis = new Millis(1000);
	expect(testMillis.toNanos().value).toBe(1000 * 1000000);
	expect(testMillis.toSeconds().value).toBe(1);

	const testSeconds = new Seconds(60);
	expect(testSeconds.toMillis().value).toBe(60 * 1000);
	expect(testSeconds.toMinutes().value).toBe(1);

	const testMinutes = new Minutes(60);
	expect(testMinutes.toSeconds().value).toBe(60 * 60);
	expect(testMinutes.toHours().value).toBe(1);

	const testHours = new Hours(24);
	expect(testHours.toMinutes().value).toBe(24 * 60);
	expect(testHours.toDays().value).toBe(1);

	const testDays = new Days(365);
	expect(testDays.toHours().value).toBe(365 * 24);

	const eMillis = new Millis(7.6032e+9);
	expect(eMillis.toDays().value).toBe(88);
	expect(eMillis.toHours().value).toBe(2112);
	expect(eMillis.toMinutes().value).toBe(126720);
	expect(eMillis.toSeconds().value).toBe(7.6032e+6);
	expect(eMillis.toMillis().value).toBe(7.6032e+9);
	expect(eMillis.toNanos().value).toBe(7.6032e+15);

	expect(new Days(1).equals(new Hours(24))).toBe(true);
	expect(new Days(2).equals(new Hours(47))).toBe(false);

	expect(new Minutes(70) < new Hours(2)).toBe(true);
	expect(new Minutes(70) > new Hours(1)).toBe(true);

	expect(new Nanos(100) < new Millis(1)).toBe(true);
	expect(new Nanos(1200000) > new Millis(1)).toBe(true);
	expect(new Nanos(100) < new Nanos(200)).toBe(true);
})