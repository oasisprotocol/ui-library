import { FieldConfiguration } from './validation.ts'
import { decapitalizeFirstLetter, getAsArray } from './util'

/**
 * Go through a group of fields, and do full validation.
 *
 * Returns true if there was an error.
 */
export const getFieldValues = (fields: Readonly<FieldConfiguration>) => {
  // Get a flattened list of fields
  const allFields = fields.flatMap(config => getAsArray(config))

  const results: Record<string, unknown> = {}

  for (const field of allFields) {
    if (field.type === 'label') continue
    results[decapitalizeFirstLetter(field.name)] = field.value
  }
  return results
}
