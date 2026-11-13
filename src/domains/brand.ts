declare const brand: unique symbol;
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type Minutes = Brand<number, "Minutes">;
export type SessionId = Brand<string, "SessionId">;

export function minutes(n: number): Minutes {
  if (Number.isInteger(n) && n > 0 && n <= 600) {
    return n as Minutes;
  }

  throw new RangeError("n is not in range of 1 to 600");
}

export function sessionId(raw: string): SessionId {
  const regex = /^[a-z0-9-]+$/;
  const isValid = regex.test(raw);

  if (isValid) {
    return raw as SessionId;
  }

  throw new Error(`Invalid session id: "${raw}"`);
}