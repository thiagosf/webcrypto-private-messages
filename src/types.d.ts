type ToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${ToSnakeCase<U>}`
  : S

type ConvertKeysToSnakeCase<T> = {
  [K in keyof T as ToSnakeCase<Extract<K, string>>]: T[K]
}
