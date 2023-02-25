import type { ReactNode } from 'react'

export default function TableResponsive({ children }: { children: ReactNode }) {
  return (
    <div className="table-scroll table-bordered mb-4 -mt-2 max-w-full overflow-x-auto">
      {children}
    </div>
  )
}
