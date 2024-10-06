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

const chartConfig = {
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
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income")
  const [chartData, setChartData] = React.useState<Transaction[]>([])

  React.useEffect(() => {
    async function loadData() {
      const data = await fetchCompletedTransactions()
      setChartData(data)
    }
    loadData()
  }, [])

  const total = React.useMemo(
    () => ({
      income: chartData
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0),
      expense: chartData
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0),
    }),
    [chartData]
  )

  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total transactions for the last 30 days
          </CardDescription>
        </div>
        <div className="flex">
          {(["income", "expense"] as const).map((key) => {
            const chart = key
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            <Bar dataKey="amount" fill={chartConfig[activeChart].color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
