import * as React from 'react'
import { TableHead as BaseTableHead, TableCell as BaseTableCell } from '../ui/table'
import { cn } from '../../lib/utils'
export { Table, TableBody, TableCaption, TableFooter, TableHeader, TableRow } from '../ui/table'

type TableHeadProps = React.ComponentProps<typeof BaseTableHead>

export const TableHead = ({ className, children, ...props }: TableHeadProps) => (
  <BaseTableHead
    className={cn(
      'h-12 px-4 flex-1 self-stretch justify-center text-muted-foreground text-sm font-medium leading-tight',
      className
    )}
    {...props}
  >
    {children}
  </BaseTableHead>
)

type TableCellProps = React.ComponentProps<typeof BaseTableCell>

export const TableCell = ({ className, children, ...props }: TableCellProps) => (
  <BaseTableCell
    className={cn(
      'p-4 self-stretch justify-center text-foreground text-sm font-medium leading-none',
      className
    )}
    {...props}
  >
    {children}
  </BaseTableCell>
)
