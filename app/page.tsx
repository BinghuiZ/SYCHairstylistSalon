import Link from 'next/link'

export default function Home() {

  return (
    <>
      <nav>
        <h1><Link href='/calendar'>Calendar</Link></h1>
      </nav>
      <main>Hello World</main>
    </>
  )
}
