export const getTypeDescription = (data: Record<string, unknown>) =>
  Object.keys(data).reduce(
    (acc, key) => {
      acc[key] = typeof data[key]
      return acc
    },
    {} as Record<string, string>
  )
