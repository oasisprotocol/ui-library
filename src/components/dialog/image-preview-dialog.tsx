import { FC } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Dialog, DialogPortal, DialogOverlay, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog'

type ImagePreviewDialogProps = {
  className?: string
  onClose: () => void
  open: boolean
  src: string
  title?: string
}

export const ImagePreviewDialog: FC<ImagePreviewDialogProps> = ({ className, onClose, open, src, title }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="z-9999 bg-black/90" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 z-9999',
            className
          )}
        >
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-md md:text-2xl font-bold text-white">{title}</DialogTitle>
            <DialogClose className="opacity-80 transition-opacity hover:opacity-100 text-white">
              <XIcon />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <img src={src} alt={title} className="max-w-[80dvw] max-h-[80dvh] object-contain" />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
