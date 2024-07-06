'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { href: '/', text: 'Dashboard' },
    { href: '/calendar', text: 'Calendar' },
    { href: '/clients', text: 'Clients' },
  ]

  return (
    <nav className='border-b px-4 py-2'>
      <ul>
        {links.map(({ href, text }) => (
          <li key={href} className='inline-block mr-4'>
            <Link
              href={href}
              className={classnames({
                'nav-link': true,
                'block py-2 px-3 text-blue-600':
                  currentPath === href,
              })}
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
