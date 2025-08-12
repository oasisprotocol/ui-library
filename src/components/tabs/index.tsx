import * as React from 'react'
import {
  Tabs as BaseTabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent,
} from '../ui/tabs'
import { cn } from '../../lib/utils'

type TabsProps = React.ComponentProps<typeof BaseTabs>

export const Tabs = ({ className, children, ...props }: TabsProps) => (
  <BaseTabs className={cn('w-full gap-0', className)} {...props}>
    {children}
  </BaseTabs>
)

type TabsListProps = React.ComponentProps<typeof BaseTabsList>

export const TabsList = ({ className, children, ...props }: TabsListProps) => (
  <BaseTabsList className={cn('p-1 h-10 bg-muted radius-lg', className)} {...props}>
    {children}
  </BaseTabsList>
)

type TabsTriggerProps = React.ComponentProps<typeof BaseTabsTrigger>

export const TabsTrigger = ({ className, children, ...props }: TabsTriggerProps) => (
  <BaseTabsTrigger
    className={cn(
      'flex justify-center items-center px-3 py-1.5 text-sm font-medium leading-5 rounded-sm text-muted-foreground data-[state=active]:text-foreground dark:data-[state=active]:bg-background border-0',
      className
    )}
    {...props}
  >
    {children}
  </BaseTabsTrigger>
)

type TabsContentProps = React.ComponentProps<typeof BaseTabsContent>

export const TabsContent = ({ className, children, ...props }: TabsContentProps) => (
  <BaseTabsContent className={cn('flex-1 outline-none', className)} {...props}>
    {children}
  </BaseTabsContent>
)
