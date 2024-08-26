import prisma from '@/prisma/client'
import { Booking } from '@prisma/client'

export default async function Home() {
  const getTodayBookings = async () => {
    const response: Booking[] = await prisma.booking.findMany({
      where: {
        startDateTime: {
          gte: new Date(),
          lt: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
      },
    })
    return response
  }

  const getCurrentWeekIncome = async () => {
    const today = new Date()
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    )
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 7)

    const response = await prisma.booking.findMany({
      where: {
        startDateTime: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
      },
    })
    return response
  }

  const getCurrentMonthIncome = async () => {
    const response = await prisma.booking.findMany({
      where: {
        startDateTime: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    })
    return response
  }

  const todayBookings = await getTodayBookings()
  const currentWeekIncome = await (
    await getCurrentWeekIncome()
  ).map((booking) => booking.amount)
  const currentMonthIncome = await (
    await getCurrentMonthIncome()
  ).map((booking) => booking.amount)

  return (
    <>
      <main>
        {todayBookings.map((booking) => (
          <div key={booking.id}>{booking.title}</div>
        ))}
        <div>
          <h2>Current Week Income</h2>
          <p>{currentWeekIncome.reduce((acc, curr) => acc + curr, 0)}</p>
        </div>
        <div>
          <h2>Current Month Income</h2>
          <p>{currentMonthIncome.reduce((acc, curr) => acc + curr, 0)}</p>
        </div>
      </main>
    </>
  )
}
