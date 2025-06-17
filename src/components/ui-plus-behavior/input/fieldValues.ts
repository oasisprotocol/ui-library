import { FieldArrayConfiguration, FieldMapConfiguration } from './validation.ts'
import { decapitalizeFirstLetter, getAsArray } from './util'

/**
 * Go through a group of fields, and do full validation.
 *
 * Returns true if there was an error.
 */
export const getFieldArrayValues = (fields: Readonly<FieldArrayConfiguration>) => {
  // Get a flattened list of fields
  const allFields = fields.flatMap(config => getAsArray(config))

  const results: Record<string, unknown> = {}

  for (const field of allFields) {
    if (field.type === 'label') continue
    results[decapitalizeFirstLetter(field.name)] = field.value
  }
  return results
}

export function getFormMapValues<DataForm extends FieldMapConfiguration>(fields: DataForm) {
  const results: Record<string, unknown> = {}
  Object.keys(fields).forEach(key => {
    const field = fields[key]
    const { type, value } = field
    if (type === 'label') return
    results[key] = value
  })
  return results as { [Key in keyof DataForm]: DataForm[Key]['value'] }
}
