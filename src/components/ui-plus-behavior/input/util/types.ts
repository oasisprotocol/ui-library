export const getTypeDescription = (data: any) =>
  Object.keys(data).reduce(
    (acc, key) => {
      acc[key] = typeof data[key]
      return acc
    },
    {} as Record<string, any>
  )
