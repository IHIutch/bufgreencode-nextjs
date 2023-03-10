import React from 'react'
import Markdoc from '@markdoc/markdoc'
import { allArticles } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { config as markdocConfig } from '@/markdoc/config'
import Heading from '@/components/content/Heading'
import PageToc from '@/components/PageToc'
import { getHeadings } from '@/utils/functions'
import TableSmall from '@/components/content/TableSmall'
import TableResponsive from '@/components/content/TableResponsive'
import FigureImg from '@/components/content/FigureImg'

const getArticle = (slug: string) => {
  const article = allArticles.find((post) => post.slug === slug)
  if (!article) {
    notFound()
  }

  const ast = Markdoc.parse(article.body.raw)
  const markdocContent = Markdoc.transform(ast, markdocConfig)

  const headings = getHeadings(markdocContent)

  return { article, markdocContent, headings }
}

export default async function Post({
  params,
}: {
  params: { slug: [string, string] }
}) {
  const { article, markdocContent, headings } = getArticle(
    `/${params.slug[0]}/${params.slug[1]}`
  )

  return (
    <div className="flex">
      <div className="my-12 w-full px-4 md:px-8 xl:w-[calc(100%-20rem)]">
        <div className="max-w-prose xl:mx-auto">
          <h1 className="mb-2 text-5xl font-medium leading-tight">
            {article?.title}
          </h1>
          {article?.lead ? (
            <p className="text-lg text-gray-700">{article.lead}</p>
          ) : null}
          <div className="page-content prose">
            {Markdoc.renderers.react(markdocContent, React, {
              components: {
                Heading,
                TableSmall,
                TableResponsive,
                FigureImg,
                Sup: (props: any) => <sup {...props} />,
              },
            })}
          </div>
        </div>
      </div>
      <aside className="hidden shrink-0 lg:w-80 xl:block">
        {headings?.length > 0 ? (
          <div className="fixed top-0 h-screen pt-16">
            <div className="h-full overflow-y-auto">
              <div className="my-12 pr-4">
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    On this Page
                  </span>
                </div>
                <PageToc headings={headings} />
              </div>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  )
}

export async function generateStaticParams() {
  return allArticles.map((a) => ({
    slug: [a.slug],
  }))
}
