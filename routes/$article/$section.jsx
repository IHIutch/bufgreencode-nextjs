import React, { createElement, useState } from 'react'
import { getArticle } from '~/models/articles.server'
import { getMetaTags } from '~/utils'
import PageToc from '~/components/PageToc'
import Markdoc from '@markdoc/markdoc'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import * as Tooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { Link as LinkIcon } from 'lucide-react'
import TableSmall from '~/components/TableSmall'
import FigureImg from '~/components/FigureImg'
import TableResponsive from '~/components/TableResponsive'

export default function Post() {
  const { content, frontmatter } = useLoaderData()

  return (
    <div className="flex">
      <div className="my-12 w-full px-4 md:px-8 xl:w-3/4">
        <div className="max-w-prose xl:mx-auto">
          <h1 className="mb-2 text-5xl font-medium leading-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.lead ? (
            <p className="text-lg text-gray-700">{frontmatter.lead}</p>
          ) : null}
          <div className="page-content prose">
            {Markdoc.renderers.react(content, React, {
              components: {
                Heading,
                TableSmall,
                FigureImg,
                TableResponsive,
                Sup: ({ children }) => <sup>{children}</sup>,
              },
            })}
          </div>
        </div>
      </div>
      <PageToc />
    </div>
  )
}

const Heading = ({ id, level, children }) => {
  const [isToolTipVisible, setIsToolTipVisible] = useState(false)
  const headingEl = createElement(
    `h${level}`,
    { id, className: 'mt-0' },
    children
  )
  const copyLinkToClipboard = () => {
    setIsToolTipVisible(true)
    navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}#${id}`
    )

    setTimeout(() => {
      setIsToolTipVisible(false)
    }, 800)
  }

  return (
    <div className="mt-[2em]">
      <Tooltip.Provider>
        <Tooltip.Root open={isToolTipVisible}>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              className="mb-1 flex items-center text-sm font-semibold text-green-600 underline transition-colors hover:text-green-700"
              onClick={copyLinkToClipboard}
            >
              <LinkIcon strokeWidth="3" className="h-[0.875rem] w-[0.875rem]" />
              <div>
                <span className="ml-1">Share Section</span>
              </div>
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content
            className={clsx(
              'rdx-tooltip',
              'inline-flex items-center rounded-md px-2 py-1',
              'bg-gray-800 text-xs text-white'
            )}
          >
            Copied to clipboard
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
      {headingEl}
    </div>
  )
}

export function meta({ data, location }) {
  const pageTitle = data?.frontmatter?.title || ''
  const pathname = location?.pathname || ''
  const metaTags = getMetaTags({
    pageTitle,
    pathname,
  })

  return { ...metaTags }
}

export function headers() {
  return {
    'Cache-Control': 'max-age=31536000, immutable',
  }
}

export const loader = async ({ params }) => {
  const { article, section } = params
  const content = await getArticle({ article, section })

  if (!content) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  return json(content)
}
