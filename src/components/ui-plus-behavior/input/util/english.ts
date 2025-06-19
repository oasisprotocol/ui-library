export const thereIsOnly = (amount: number) => {
  if (!amount) {
    return 'there is none'
  } else if (amount == 1) {
    return 'there is only one'
  } else {
    return `there are only ${amount}`
  }
}

export const atLeastXItems = (amount: number): string => {
  if (amount > 1) {
    return `at least ${amount} items`
  } else if (amount === 1) {
    return `at least one item`
  } else {
    throw new Error(`What do you mean by 'at least ${amount} items??'`)
  }
}

export const capitalizeFirstLetter = (input: string) =>
  input.length > 0 && /[a-zA-Z]/.test(input[0]) ? input[0].toUpperCase() + input.slice(1) : input

export const decapitalizeFirstLetter = (input: string) =>
  input.length > 0 && /[a-zA-Z]/.test(input[0]) ? input[0].toLowerCase() + input.slice(1) : input

export const camelToTitleCase = (camelStr: string): string => {
  // Handle empty or invalid input
  if (!camelStr) {
    return ''
  }

  // Split camelCase into words
  const words = camelStr
    // Add space before any uppercase letter
    .replace(/([A-Z])/g, ' $1')
    // Split by spaces and filter out empty strings
    .split(' ')
    .filter(word => word.length > 0)

  // Capitalize first word, lowercase others
  return words
    .map((word, index) => {
      const lowerWord = word.toLowerCase()
      return index === 0 ? lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1) : lowerWord
    })
    .join(' ')
}
