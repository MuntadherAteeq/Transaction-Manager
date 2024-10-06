"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DollarSign } from "lucide-react"
import { Transaction } from "@prisma/client"
import { fetchCompletedTransactions } from "./Table/table.actions"

export const description = "An interactive bar chart"

const chartConfig: ChartConfig = {
  views: {
    label: "Amount",
    icon: DollarSign,
  },
  balance: {
    label: "Balance",
  },
  income: {
    label: "Income",
    color: "var(--positive)",
  },
  expense: {
    label: "Expense",
    color: "var(--negative)",
  },
} satisfies ChartConfig





export function LineChart() {
  const [chartData, setChartData] = React.useState<Transaction[]>([])

  React.useEffect(() => {
    async function loadData() {
      const data = await fetchCompletedTransactions()
      setChartData(data)
    }
    loadData()
  }, [])

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total transactions for the last 30 days
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <IncomeBarChart data={chartData} />
        <ExpenseBarChart data={chartData} />
      </CardContent>
    </Card>
  )
}
