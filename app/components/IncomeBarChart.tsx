'use client'

import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface IncomeBarChartProps {
  currentWeekIncome: number[]
  currentMonthIncome: number[]
}

const IncomeBarChart = ({ currentWeekIncome, currentMonthIncome }: IncomeBarChartProps) => {
  const weekIncome = currentWeekIncome.reduce((acc, curr) => acc + curr, 0)
  const monthIncome = currentMonthIncome.reduce((acc, curr) => acc + curr, 0)

  return (
    <Bar
      data={{
        labels: ['Week', 'Month'],
        datasets: [
          {
            label: 'Income',
            data: [weekIncome, monthIncome],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
          },
        ],
      }}
    />
  )
}

export default IncomeBarChart