export function partOne(input: string[]) {
  const result = input.map((number) => parseSnafu(number)).reduce(
    (a, b) => a + b,
    0,
  );
  return toSnafu(result);
}

export function parseSnafu(value: string) {
  const digits = value.length - 1;
  return Array.from(value).reduceRight(
    (acc, digit, digitIndex) =>
      acc + Math.pow(5, digits - digitIndex) * parseSnafuDigit(digit),
    0,
  );
}

export function parseSnafuDigit(value: string) {
  switch (value) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "-":
      return -1;
    case "=":
      return -2;
    default:
      throw new Error(`unknown digit value [digit=${value}]`);
  }
}

export function toSnafu(givenValue: number) {
  let value = givenValue;
  const maxDigits = Math.ceil(Math.pow(value, 1 / 5));
  const digits = new Map<number, number>(
    new Array(0).fill(0).map((_, i) => [Math.pow(5, i), 0]),
  );
  for (let digitIndex = 0; digitIndex < maxDigits; digitIndex++) {
    const currentPower = Math.floor(Math.pow(5, maxDigits - digitIndex - 1));
    if (currentPower > value) {
      digits.set(currentPower, 0);
      continue;
    }
    const quotient = Math.floor(value / currentPower);
    value %= currentPower;
    digits.set(currentPower, quotient);
  }
  for (let i = 0; i < digits.size; i++) {
    const currentPower = Math.floor(Math.pow(5, i));
    const quotient = digits.get(currentPower) ?? 0;
    if (quotient <= 2) {
      continue;
    }
    const rest = quotient % 5;
    const nextPower = Math.floor(Math.pow(5, i + 1));
    const nextQuotient = digits.get(nextPower) ?? 0;
    digits.set(nextPower, nextQuotient + Math.floor((quotient + 2) / 5));
    digits.set(currentPower, rest <= 2 ? rest : rest - 5);
  }
  return Array.from(digits.keys()).sort((a, b) => b - a).map((power) => {
    const digit = digits.get(power) ?? 0;
    return digit >= 0 ? `${digit}` : digit === -1 ? "-" : "=";
  }).join("").replace(/^0+/, "");
}
