'use client'

import clsx from 'clsx'
import { MouseEvent, useEffect, useState } from 'react'

export default function PageToc({
  headings,
}: {
  headings: { title: string; id: string }[]
}) {
  const [currentHeading, setCurrentHeading] = useState({
    slug: headings[0].id,
    text: headings[0].title,
  })

  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id } = entry.target
          // if (id === onThisPageID) continue
          setCurrentHeading({
            slug: entry.target.id,
            text: entry.target.textContent || '',
          })
          break
        }
      }
    }

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: '-100px 0% -66%',
      threshold: 1,
    }

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    )

    // Observe all the headings in the main page content.
    document
      .querySelectorAll('.page-content :is(h2,h3,h4,h5,h6)')
      .forEach((h) => headingsObserver.observe(h))

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect()
  }, [])

  const onLinkClick = (e: MouseEvent) => {
    setCurrentHeading({
      slug: e.currentTarget.getAttribute('href')!.replace('#', ''),
      text: e.currentTarget.textContent || '',
    })
  }

  return (
    <ul>
      {headings.map((heading, idx) => (
        <li key={idx} className="text-sm text-gray-600 hover:text-gray-900">
          <a
            href={`#${heading.id}`}
            className="block py-1.5"
            onClick={onLinkClick}
          >
            <div
              className={clsx(
                'border-l-2 transition-all duration-200',
                currentHeading.slug === heading.id
                  ? ' border-green-700'
                  : ' border-transparent'
              )}
            >
              <div
                className={clsx(
                  'transition-all duration-200',
                  currentHeading.slug === heading.id
                    ? 'translate-x-2'
                    : 'translate-x-0'
                )}
              >
                <span
                  className={clsx(
                    'font-medium',
                    currentHeading.slug === heading.id
                      ? 'text-green-700'
                      : 'text-gray-700'
                  )}
                >
                  {heading.title}
                </span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}
