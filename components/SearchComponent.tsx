'use client'

import { type ReactNode, useState } from 'react'
import { DocSearchModal } from '@docsearch/react'
import { Search } from 'lucide-react'
import type {
  InternalDocSearchHit,
  StoredDocSearchHit,
} from '@docsearch/react/dist/esm/types'
import Link from 'next/link'
import { type Route } from 'next'

export default function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="h-full w-full">
      <button
        className="h-full w-full rounded-lg border bg-gray-100 px-4 py-2 text-left text-gray-500 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center">
          <Search className="h-4 w-4" />
          <span className="ml-2">Search the code...</span>
        </div>
      </button>
      {isOpen ? (
        <DocSearchModal
          initialScrollY={window.scrollY}
          appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''}
          apiKey={process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ''}
          onClose={() => setIsOpen(false)}
          placeholder="Search the docs..."
          hitComponent={Hit}
          transformItems={(items) => {
            return items.map((item, index) => {
              const a = document.createElement('a')
              a.href = item.url

              if (item.hierarchy?.lvl0) {
                item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(/&amp;/g, '&')
              }

              if (item._highlightResult?.hierarchy?.lvl0?.value) {
                item._highlightResult.hierarchy.lvl0.value =
                  item._highlightResult.hierarchy.lvl0.value.replace(
                    /&amp;/g,
                    '&'
                  )
              }

              return {
                ...item,
                url: `${a.pathname}${a.hash}`,
                __is_result: () => true,
                // __is_parent: () =>
                //   item.type === 'lvl1' && items.length > 1 && index === 0,
                // __is_child: () =>
                //   item.type !== 'lvl1' &&
                //   items.length > 1 &&
                //   items[0].type === 'lvl1' &&
                //   index !== 0,
                __is_first: () => index === 1,
                __is_last: () => index === items.length - 1 && index !== 0,
              }
            })
          }}
        />
      ) : null}
    </div>
  )
}

const Hit = ({
  hit,
  children,
}: {
  hit: InternalDocSearchHit | StoredDocSearchHit
  children: ReactNode
}) => {
  return (
    <Link
      href={hit.url as Route}
      // className={clsx({
      //   'DocSearch-Hit--Result': hit?.__is_result?.(),
      //   // 'DocSearch-Hit--Parent': hit.__is_parent?.(),
      //   // 'DocSearch-Hit--Child': hit.__is_child?.(),
      //   'DocSearch-Hit--FirstChild': hit.__is_first?.(),
      //   'DocSearch-Hit--LastChild': hit.__is_last?.(),
      // })}
    >
      {children}
    </Link>
  )
}
