import { FC, PropsWithChildren, ReactNode } from 'react'
import { SidebarProvider, SidebarTrigger } from './sidebar'
import { useIsMobile } from '../../hooks'
import { Separator } from './separator'

const Header: FC<PropsWithChildren> = ({ children }) => (
  <header className="mt-12 md:mt-0 sticky md:static z-50 top-0">
    <nav className="md:h-16 px-3 md:px-6 py-2.5 bg-background border-b border-border shadow-sm flex items-center">
      <div className="w-full max-w-[96rem] mx-auto flex">{children}</div>
    </nav>
  </header>
)

interface HeaderBreadcrumbsProps {
  hasSidebar?: boolean
}

const HeaderBreadcrumbs: FC<PropsWithChildren<HeaderBreadcrumbsProps>> = ({ children, hasSidebar }) => {
  const isMobile = useIsMobile()

  return (
    <div className="flex items-center h-12 px-3 border-b border-border">
      <div className="flex gap-2 items-center">
        {!isMobile && hasSidebar && (
          <>
            <SidebarTrigger />
            <div className="h-[15px] flex items-center">
              <Separator orientation="vertical" />
            </div>
          </>
        )}
        {children}
      </div>
    </div>
  )
}

const Footer: FC<PropsWithChildren> = ({ children }) => (
  <footer className="flex border-t border-border px-3 md:px-6 py-3 w-full">{children}</footer>
)

interface LayoutProps {
  headerContent?: ReactNode
  headerBreadcrumbsContent?: ReactNode
  footerContent?: ReactNode
  sidebar?: ReactNode
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  headerContent,
  headerBreadcrumbsContent,
  footerContent,
  sidebar,
}) => {
  const isMobile = useIsMobile()

  const layoutContent = (
    <div className="w-full max-w-[96rem] mx-auto flex flex-col min-h-[800px] md:max-h-dvh">
      {headerContent && <Header>{headerContent}</Header>}

      {isMobile && (
        <>
          {headerBreadcrumbsContent && (
            <HeaderBreadcrumbs hasSidebar={!!sidebar}>{headerBreadcrumbsContent}</HeaderBreadcrumbs>
          )}
          <main className="flex-1">{children}</main>
        </>
      )}

      {!isMobile && (
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {sidebar && sidebar}
            <div className="flex flex-col flex-1">
              {headerBreadcrumbsContent && (
                <HeaderBreadcrumbs hasSidebar={!!sidebar}>{headerBreadcrumbsContent}</HeaderBreadcrumbs>
              )}
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </div>
      )}

      {footerContent && <Footer>{footerContent}</Footer>}
    </div>
  )

  return sidebar ? <SidebarProvider>{layoutContent}</SidebarProvider> : layoutContent
}
