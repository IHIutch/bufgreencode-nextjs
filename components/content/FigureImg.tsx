import type { ReactNode } from 'react'

export default function FigureImg({
  caption,
  children,
}: {
  caption?: string
  children: ReactNode
}) {
  return (
    <figure className="not-prose mb-4">
      <div className="inline-flex w-full rounded border p-1">{children}</div>
      {caption ? (
        <figcaption className="mt-1 text-sm text-gray-700">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
