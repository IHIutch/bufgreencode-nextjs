import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import SearchComponent from './SearchComponent'
import '../styles/main.css'
import Link from 'next/link'

export default function NavbarComponent() {
  return (
    <nav className="relative inset-x-0 z-20 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
      <div className="relative mx-auto w-full max-w-screen-2xl">
        <div className="flex h-full items-center">
          <div className="h-full w-16 flex-shrink-0 pl-4 md:w-40 lg:w-72 2xl:w-80">
            <div className="flex h-full items-center">
              <Link href="/" className="block h-full w-full py-2 lg:mr-4">
                <img
                  src="/meta/bufgreencode-icon.svg"
                  alt="Buffalo Green Code"
                  className="h-full w-auto md:hidden"
                />
                <img
                  src="/meta/bufgreencode-logo.svg"
                  alt="Buffalo Green Code"
                  className="hidden h-full w-auto md:block"
                />
              </Link>
            </div>
          </div>
          <div className="h-full w-full flex-1 px-4 md:block md:px-8 xl:w-3/4">
            <div className="flex h-full w-full items-center py-2">
              <SearchComponent />
            </div>
          </div>
          <div className="hidden h-full flex-shrink-0 items-center pr-4 text-sm font-medium md:flex lg:w-72 2xl:w-80">
            <Link
              href="/disclaimer"
              className="py-1 px-2 text-gray-700 hover:text-gray-900"
            >
              Disclaimer
            </Link>
            <a
              className="flex items-center py-1 px-2 text-gray-700 hover:text-gray-900"
              href="https://github.com/IHIutch/bufgreencode_v2"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-1">Source Code</span>
              <span>
                <ExternalLink className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
