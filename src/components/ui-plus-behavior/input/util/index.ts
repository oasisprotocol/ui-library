export * from './arrays'
export * from './coupledData'
export * from './decisions'
export * from './english'
export * from './validationMessages'

export const sleep = (time: number) => new Promise<string>(resolve => setTimeout(() => resolve(''), time))
