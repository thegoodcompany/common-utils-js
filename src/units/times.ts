export abstract class TimeUnit {
	protected static readonly DIVISOR_TO_NANOS = 1;
	protected static readonly DIVISOR_TO_MILLIS = 1000000 * TimeUnit.DIVISOR_TO_NANOS;
	protected static readonly DIVISOR_TO_SECONDS = 1000 * TimeUnit.DIVISOR_TO_MILLIS;
	protected static readonly DIVISOR_TO_MINUTES = 60 * TimeUnit.DIVISOR_TO_SECONDS;
	protected static readonly DIVISOR_TO_HOURS = 60 * TimeUnit.DIVISOR_TO_MINUTES;
	protected static readonly DIVISOR_TO_DAYS = 24 * TimeUnit.DIVISOR_TO_HOURS;

	private readonly factor;
	public readonly value;

	protected constructor(value: number, factorOfNanos: number) {
		this.value = value;
		this.factor = factorOfNanos;
	}

	private toBase() {
		return this.value * this.factor;
	}

	public toNanos(): Nanos {
		return new Nanos(this.toBase() / TimeUnit.DIVISOR_TO_NANOS);
	}

	public toMillis(): Millis {
		return new Millis(this.toBase() / TimeUnit.DIVISOR_TO_MILLIS);
	}

	public toSeconds(): Seconds {
		return new Seconds(this.toBase() / TimeUnit.DIVISOR_TO_SECONDS);
	}

	public toMinutes(): Minutes {
		return new Minutes(this.toBase() / TimeUnit.DIVISOR_TO_MINUTES);
	}

	public toHours(): Hours {
		return new Hours(this.toBase() / TimeUnit.DIVISOR_TO_HOURS);
	}

	public toDays(): Days {
		return new Days(this.toBase() / TimeUnit.DIVISOR_TO_DAYS);
	}

	public valueOf(): number {
		return this.toBase();
	}

	public equals(unit: TimeUnit): boolean {
		return this.valueOf() === unit.valueOf();
	}
}

export class Nanos extends TimeUnit {
	public constructor(value: number) {
		super(value, TimeUnit.DIVISOR_TO_NANOS);
	}
}

export class Millis extends TimeUnit {
	public constructor(value: number) {
		super(value, TimeUnit.DIVISOR_TO_MILLIS);
	}
}

export class Seconds extends TimeUnit {
	public constructor(value: number) {
		super(value, TimeUnit.DIVISOR_TO_SECONDS);
	}
}

export class Minutes extends TimeUnit {
	public constructor(value: number) {
		super(value, TimeUnit.DIVISOR_TO_MINUTES);
	}
}

export class Hours extends TimeUnit {
	public constructor(value: number) {
		super(value, TimeUnit.DIVISOR_TO_HOURS);
	}
}

export class Days extends TimeUnit {
	public constructor(value: number) {
		super(value, TimeUnit.DIVISOR_TO_DAYS);
	}
}