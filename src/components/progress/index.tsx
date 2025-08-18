import * as React from 'react'
import { Progress as BaseProgress } from '../ui/progress'
import { cn } from '../../lib/utils'

export const Progress = ({ className, ...props }: React.ComponentProps<typeof BaseProgress>) => {
  return <BaseProgress className={cn('h-4 bg-secondary', className)} {...props} />
}
