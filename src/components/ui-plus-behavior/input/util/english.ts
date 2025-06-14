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
