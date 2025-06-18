import { FieldArrayConfiguration, FieldMapConfiguration } from './validation.ts'
import { decapitalizeFirstLetter, getAsArray } from './util'

const getFieldArrayValues = (fields: Readonly<FieldArrayConfiguration>) => {
  // Get a flattened list of fields
  const allFields = fields.flatMap(config => getAsArray(config))

  const results: Record<string, unknown> = {}

  for (const field of allFields) {
    if (field.type === 'label') continue
    results[decapitalizeFirstLetter(field.name)] = field.value
  }
  return results
}

function getFieldMapValues<DataForm extends FieldMapConfiguration>(fields: DataForm): { [Key in keyof DataForm]: DataForm[Key]['value'] } {
  const results: Record<string, unknown> = {}
  Object.keys(fields).forEach(key => {
    const field = fields[key]
    const { type, value } = field
    if (type === 'label') return
    results[key] = value
  })
  return results as { [Key in keyof DataForm]: DataForm[Key]['value'] }
}

export function getFieldValues(fields: Readonly<FieldArrayConfiguration>) : Record<string, unknown>

export function getFieldValues<DataForm extends FieldMapConfiguration>(fields: DataForm): { [Key in keyof DataForm]: DataForm[Key]['value'] }

export function getFieldValues<DataForm extends FieldMapConfiguration>(fields: DataForm | Readonly<FieldArrayConfiguration>) {
  return Array.isArray(fields) ?  getFieldArrayValues(fields) : getFieldMapValues(fields as DataForm)
}