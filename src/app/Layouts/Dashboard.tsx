import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons"
import LineChart from "../Components/Chart"

export default function page() {
  return (
    <ScrollArea className="w-full h-full">
      <div className="p-8">
        <Tabs defaultValue="overview" className="space-y-4 w-full">
          <TabsContent value="overview" className="mb-8">
            <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background border-blue-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">Balance</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path
                      className=""
                      d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-blue-500">231.890 DB</div>
                  <p className="text-xs text-muted-foreground"></p>
                </CardContent>
              </Card>
              <Card className="bg-background border-green-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    Total Incomes
                  </CardTitle>
                  <DoubleArrowUpIcon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-green-600">+ 512.234 BD</div>
                  <CardDescription className="mt-2 text-xs text-muted-foreground">
                    + 600.354 BD Considering the uncompleted transactions
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-background border-red-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    Total Expenses
                  </CardTitle>
                  <DoubleArrowDownIcon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl  text-red-600">- 350.326</div>
                  <CardDescription className="mt-2 text-xs text-muted-foreground">
                    - 200.354 BD Considering the uncompleted transactions
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <LineChart />
      </div>
    </ScrollArea>
  )
}
