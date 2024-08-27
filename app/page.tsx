import prisma from '@/prisma/client'
import { Booking } from '@prisma/client'
import { Container, Flex } from '@radix-ui/themes'
import IncomeBarChart from './components/IncomeBarChart'

export default async function Home() {
  const getTodayBookings = async () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const response: Booking[] = await prisma.booking.findMany({
      where: {
        startDateTime: {
          gte: today,
          lt: tomorrow,
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
    <Container>
      <Flex direction='column' gap='4'>
        {todayBookings.map((booking) => (
          <div key={booking.id}>{booking.title}</div>
        ))}
        <IncomeBarChart
          currentWeekIncome={currentWeekIncome}
          currentMonthIncome={currentMonthIncome}
        />
      </Flex>
    </Container>
  )
}
