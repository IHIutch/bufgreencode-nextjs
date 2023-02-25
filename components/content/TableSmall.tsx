import type { ReactNode } from 'react'

export default function TableSmall({ children }: { children: ReactNode }) {
  return (
    <div className="table-bordered table-hidden-thead mb-4 -mt-2">
      {children}
    </div>
  )
}
