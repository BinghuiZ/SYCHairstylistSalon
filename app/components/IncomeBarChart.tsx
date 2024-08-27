'use client'

import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface IncomeBarChartProps {
  currentWeekIncome: number[]
  currentMonthIncome: number[]
}

const IncomeBarChart = ({ currentWeekIncome, currentMonthIncome }: IncomeBarChartProps) => {
  return (
    <Bar
      data={{
        labels: ['Week', 'Month'],
        datasets: [
          {
            label: 'Income',
            data: [currentWeekIncome, currentMonthIncome],
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