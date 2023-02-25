export function headers() {
  return {
    'Cache-Control': 'max-age=31536000, immutable',
  }
}

export default function Disclaimer() {
  return (
    <div className="my-12 w-full px-4 md:px-8 xl:w-3/4">
      <div className="mx-auto w-full max-w-prose">
        <h1 className="mb-6 text-5xl font-medium leading-tight">Disclaimer</h1>
        <div className="prose">
          <p className="lead">
            This site is an <span className="font-semibold">unofficial</span>{' '}
            digitisation for the Buffalo Green Code. This is an open source
            project and is not affiliated with the City of Buffalo.
          </p>
          <p>
            The official Green Code can be found on the{' '}
            <a
              href="https://www.buffalony.gov/1224/Using-the-Unified-Development-Ordinance"
              target="_blank"
              rel="noreferrer"
            >
              City of Buffalo's website.
            </a>
          </p>
          <p>
            We've done our best to make this site as accurate as possible in
            order to make it easier to search and find important information.
            Any inaccurate or or out of date information is completely
            unintentional.
          </p>
          <p>
            If you find any errors or inaccuracies,{' '}
            <a
              href="https://forms.reform.app/szenkB/buffalo-green-code/sxml6n"
              target="_blank"
              rel="noreferrer"
            >
              please let us know
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
