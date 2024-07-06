'use client'

import { TabNav } from '@radix-ui/themes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const currentPath = usePathname()

  const links = [
    { href: '/', text: 'Dashboard' },
    { href: '/calendar', text: 'Calendar' },
    { href: '/clients', text: 'Clients' },
  ]

  return (
    <TabNav.Root>
      {links.map(({ href, text }) => (
        <TabNav.Link key={href} active={currentPath === href}>
          <Link href={href}>{text}</Link>
        </TabNav.Link>
      ))}
    </TabNav.Root>
  )
}

export default NavBar
