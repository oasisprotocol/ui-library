/**
 * Sometimes we want to support providing some data in
 * either a simple or an extended form, and access them
 * in a consistent format.
 *
 * CoupledData supports makes this possible.
 */

export type CoupledData<FirstType = boolean, SecondType = string> = [FirstType, SecondType] | FirstType

export function expandCoupledData<FirstType, SecondType>(
  value: CoupledData<FirstType, SecondType> | undefined,
  fallback: [FirstType, SecondType]
): [FirstType, SecondType] {
  if (value === undefined) {
    return fallback
  } else if (Array.isArray(value)) {
    return value
  } else {
    return [value, fallback[1]]
  }
}
