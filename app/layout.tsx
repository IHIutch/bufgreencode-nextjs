import ArticlesAccordion from '@/components/ArticlesAccordion'
import NavbarComponent from '@/components/NavbarComponent'
import SubnavComponent from '@/components/SubnavComponent'
import type { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="antialiased">
          <div className="fixed top-0 z-10 w-full">
            <NavbarComponent />
            <SubnavComponent>
              <ArticlesAccordion />
            </SubnavComponent>
          </div>
          <div className="mx-auto flex max-w-screen-2xl">
            <div className="fixed top-0 hidden h-full flex-shrink-0 pt-16 md:block md:w-72 2xl:w-80">
              <nav className="sticky h-full overflow-y-auto border-r">
                <div className="py-8">
                  <ArticlesAccordion />
                </div>
              </nav>
            </div>
            <div className="w-full pt-20 md:ml-72 md:pt-16 2xl:ml-80">
              <div className="position-absolute flex w-full transition-all duration-200">
                <main className="w-full">{children}</main>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
