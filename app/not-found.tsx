import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex">
      <div className="my-12 w-full px-4 md:px-8 xl:w-3/4">
        <div className="max-w-prose xl:mx-auto">
          <h1 className="mb-2 text-5xl font-medium leading-tight">404</h1>
          <p className="mb-8 text-lg text-gray-700">
            Looks like you found a page that doesn&apos;t exist.
          </p>
          <div className="prose">
            <Link href="/">Back to Home Page</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
