// Home for utils that are required by other util files, to avoid circular dependency issues.
// Also home for random utils that don't fit elsewhere.

//
// TYPEGUARDS / TYPE UTILS
//

export const isNumber = (val: any): val is number => Number.isFinite(val);

export const isDate = (val: any): val is Date =>
  val instanceof Date ||
  Object.prototype.toString.call(val) === "[object Date]";

export const isString = (val: any): val is string =>
  typeof val === "string" || val instanceof String;

export const isNullish = (val: any): val is null | undefined =>
  val === undefined || val === null;

export const isRegExp = (val: any): val is RegExp =>
  val instanceof RegExp ||
  Object.prototype.toString.call(val) === "[object RegExp]";

// https://stackoverflow.com/questions/47632622/typescript-and-filter-boolean
export const ExcludeFalsy = Boolean as any as <T>(x: T | Falsy) => x is T;

export const isFunc = (val: any): val is (...args: any[]) => any =>
  typeof val === "function";

export const isBoolean = (val: any): val is boolean => typeof val === "boolean";

export const isSymbol = (val: any): val is symbol => typeof val === "symbol";

//
//
//

const ty = (val: any) => typeof val;
type NativeTypes = ReturnType<typeof ty>;
/** Custom types returned in getType */
type GranularTypes = "array" | "date" | "regexp" | "map" | "set" | "null";
export type GetTypeTypes = NativeTypes | GranularTypes;
// Types to be used in conjunction with getType
type CompositeTypeLabel =
  | Extract<GetTypeTypes, "object" | "function">
  | Extract<GranularTypes, "array" | "date" | "regexp" | "map" | "set">;
type PrimitiveTypeLabel = Exclude<GetTypeTypes, CompositeTypeLabel>;
const primitiveTypes: PrimitiveTypeLabel[] = [
  "bigint",
  "boolean",
  "null",
  "number",
  "string",
  "symbol",
  "undefined",
];
export type PrimitiveType =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined;

/** Extended, more granular version of typeof */
export const getType = (el: any): GetTypeTypes => {
  if (el === null) return "null";
  if (Array.isArray(el)) return "array";
  if (isDate(el)) return "date";
  if (isString(el)) return "string";
  if (isRegExp(el)) return "regexp";
  if (el instanceof Map) return "map";
  if (el instanceof Set) return "set";
  return typeof el;
};
export const isPrimitiveType = (val: any): val is PrimitiveType =>
  primitiveTypes.includes(getType(val) as PrimitiveTypeLabel);
// const isCompositeType = (val: any): val is CompositeType =>
//   compositeTypes.includes(getType(val) as CompositeTypeLabel);

export const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

// ts-unused-exports:disable-next-line
export const objectFromEntries = <K extends string | number | symbol, V>(
  entries: [key: K, val: V][]
) => Object.fromEntries(entries) as Record<K, V>;

export type SegmentRules<RuleKey extends string, T> = Record<
  RuleKey,
  ((item: T) => boolean) | "UNMATCHED"
>;

export const getSegmentConsts = <RuleKey extends string, T>(
  segmentRules: SegmentRules<RuleKey, T>
) => {
  const segmentKeys = Object.keys(segmentRules) as RuleKey[];
  return {
    segmentKeys,
    unmatchedRuleKeys: segmentKeys.filter(k => segmentRules[k] === "UNMATCHED"),
    seed: objectFromEntries(segmentKeys.map(key => [key, [] as T[]])),
  };
};
