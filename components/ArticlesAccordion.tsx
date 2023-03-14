'use client'

import groupBy from 'lodash/groupBy'
import * as Accordion from '@radix-ui/react-accordion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { allArticles } from 'contentlayer/generated'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { type Route } from 'next'

export default function ArticlesAccordion() {
  const activeSlug = usePathname()
  const groupedArticles = groupBy(
    allArticles.sort(
      (a, b) =>
        a.article_number +
        a.section_number -
        (b.article_number + b.section_number)
    ),
    'article_number'
  )

  const activeArticle = allArticles.find((a) => a.slug === activeSlug)

  const defaultArticleIdx = Object.keys(groupedArticles).findIndex(
    (articleNum) => {
      return activeArticle?.article_number === Number(articleNum)
    }
  )

  const [activeIdx, setActiveIdx] = useState(
    defaultArticleIdx !== -1 ? [`content-${defaultArticleIdx}`] : []
  )

  return (
    <Accordion.Root
      asChild
      type="multiple"
      defaultValue={activeIdx}
      onValueChange={setActiveIdx}
    >
      <ul className="px-2 py-1 text-sm">
        {Object.keys(groupedArticles).map((articleNum, idx) => (
          <Accordion.Item asChild key={idx} value={`content-${idx}`}>
            <li className="px-2 pb-1">
              <Accordion.Trigger className="w-full text-left">
                <div className="flex w-full items-center text-gray-600 hover:text-gray-900">
                  <div className="grow px-2 py-1">
                    <span className="font-medium">
                      {groupedArticles[articleNum][0].article_number}.{' '}
                      {groupedArticles[articleNum][0].article}
                    </span>
                  </div>
                  <div>
                    <div
                      className={clsx(
                        'duration-200',
                        activeIdx.includes(`content-${idx}`)
                          ? 'rotate-180'
                          : 'rotate-0'
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Accordion.Trigger>
              <Accordion.Content
                className={clsx(
                  'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden transition-all',
                  'py-1 pl-3'
                )}
              >
                <ul
                  className={clsx(
                    'border-l border-gray-300 pb-1',
                    'transition-all duration-200',
                    activeIdx.includes(`content-${idx}`)
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-4 opacity-0'
                  )}
                >
                  {groupedArticles[articleNum].map((section, sIdx) => (
                    <li key={sIdx}>
                      <Link
                        className={clsx(
                          'block w-full truncate py-1.5 text-gray-600 hover:text-gray-900',
                          '-ml-px transition-all duration-200'
                        )}
                        href={`${section.slug}` as Route}
                      >
                        <div
                          className={clsx(
                            'border-l-2 px-2',
                            'transition-all duration-200',
                            activeSlug === section.slug
                              ? 'border-green-700'
                              : 'border-transparent'
                          )}
                        >
                          <span
                            className={clsx(
                              'truncate',
                              activeSlug === section.slug
                                ? 'text-green-700'
                                : ''
                            )}
                          >
                            {section.article_number}.{section.section_number}{' '}
                            {section.title}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </li>
          </Accordion.Item>
        ))}
      </ul>
    </Accordion.Root>
  )
}
