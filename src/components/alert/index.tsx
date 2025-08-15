import { FC } from 'react'
import { CircleAlert, Info, TriangleAlert } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Alert as BaseAlert, AlertDescription, AlertTitle } from '../ui/alert'

const alertVariants = cva('p-2 md:p-4 gap-1 rounded-lg border', {
  variants: {
    variant: {
      info: 'bg-background border-border',
      error: 'bg-background border-destructive dark:border-[#7F2424] text-destructive',
      warning: 'bg-background border-warning/50 text-warning',
      'error-filled': 'bg-destructive/10 border-destructive dark:border-[#7F2424] text-destructive',
      'warning-filled':
        'bg-yellow-50 border-warning/50 text-warning dark:bg-yellow-900/10 dark:border-yellow-900/50 dark:text-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

type AlertProps = {
  className?: string
  title?: string
  children?: React.ReactNode
  sticky?: boolean
} & VariantProps<typeof alertVariants>

export const Alert: FC<AlertProps> = ({ className, title, variant = 'info', sticky = false, children }) => {
  const iconMap = {
    info: Info,
    error: CircleAlert,
    warning: TriangleAlert,
    'error-filled': CircleAlert,
    'warning-filled': TriangleAlert,
  }
  const Icon = iconMap[variant || 'info']

  return (
    <BaseAlert
      className={cn(
        alertVariants({ variant }),
        {
          'sticky top-0 z-[1000] rounded-none border-0 flex justify-center items-center': sticky,
        },
        className
      )}
    >
      <Icon
        className={cn('w-4 h-4 min-w-4 min-h-4', {
          'mt-0.5': title,
          '-mt-1': !title && sticky,
        })}
      />
      <div className="flex flex-col gap-1">
        {title && <AlertTitle className="text-inherit text-base font-medium leading-6">{title}</AlertTitle>}
        <AlertDescription className="text-inherit text-sm font-normal leading-5">{children}</AlertDescription>
      </div>
    </BaseAlert>
  )
}
