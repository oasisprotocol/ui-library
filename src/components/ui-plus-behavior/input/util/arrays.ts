/**
 * Flatten a multi-dimensional array
 */
export function flatten<Data>(array: Data[][]): Data[] {
  const result: Data[] = []
  array.forEach(a => a.forEach(i => result.push(i)))
  return result
}

/**
 * Get the indices of duplicate elements in an array
 */
export const findDuplicates = (
  values: string[],
  normalize?: (value: string) => string
): [number[], number[]] => {
  const matches: Record<string, number> = {}
  const hasDuplicates = new Set<number>()
  const duplicates = new Set<number>()
  values.forEach((value, index) => {
    const key = normalize ? normalize(value) : value
    if (matches[key] !== undefined) {
      hasDuplicates.add(matches[value])
      duplicates.add(index)
    } else {
      matches[key] = index
    }
  })
  return [Array.from(hasDuplicates.values()), Array.from(duplicates.values())]
}

/**
 * Sometimes we want to support providing data
 * either as a single data or as an array, but
 * we still want to access them in a uniform format.
 *
 * SingleOrArray makes this possible.
 */
export type SingleOrArray<Data> = Data | Data[]

/**
 * Potentially wrap a value into an array
 */
export function getAsArray<Data>(data: SingleOrArray<Data>): Data[] {
  return Array.isArray(data) ? data : [data]
}
