import { getArticles } from '~/models/articles.server'

export const loader = async () => {
  const articles = await getArticles()
  if (!articles) {
    throw new Response('Not Found', {
      status: 404,
    })
  }

  const mappedArticles = articles.map((a) => {
    return `<url>
        <loc>https://bufgreencode.com/${a.slug}</loc>
      </url>`
  })

  const content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://bufgreencode.com</loc>
        <loc>https://bufgreencode.com/disclaimer</loc>
      </url>
      ${mappedArticles.join('')}
    </urlset>`

  // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      encoding: 'UTF-8',
      'Cache-Control': 'max-age=31536000, immutable',
    },
  })
}
