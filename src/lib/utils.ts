import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Stricter than `ClassValue` from clsx
export type ClassValueStrict = ClassArrayStrict | ClassDictionaryStrict | string | null | false | undefined
export type ClassDictionaryStrict = Record<string, boolean | null | undefined>
export type ClassArrayStrict = ClassValueStrict[]

export function cn(...inputs: ClassValueStrict[]) {
  return twMerge(clsx(inputs))
}

{
  // Type-only test:
  const condition = false
  // `clsx` is not strict enough
  clsx('class1', 2, condition && 'no3', { class4: true, class5: 5, class6: [{ why: '?' }] })
  // @ts-expect-error `cn` should be stricter and disallow this
  cn('class1', 2, condition && 'no3', { class4: true, class5: 5, class6: [{ why: '?' }] })
  // @ts-expect-error `cn` should be stricter and disallow this
  cn('class1', 2)
  // @ts-expect-error `cn` should be stricter and disallow this
  cn('class1', true, 'class3')
  // @ts-expect-error `cn` should be stricter and disallow this
  cn('class1', { class5: 5 })
  // @ts-expect-error `cn` should be stricter and disallow this
  cn('class1', { class6: [{ why: '?' }] })
  // Valid
  cn('class1', condition && 'no3', { class4: true })
}
