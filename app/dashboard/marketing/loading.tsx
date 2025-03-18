import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-[350px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      <Skeleton className="h-4 w-[100px]" />
                    </CardTitle>
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-[80px]" />
                    <Skeleton className="mt-1 h-3 w-[120px]" />
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[150px]" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-[250px]" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-[100px] w-full" />
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[180px]" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-[220px]" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-[80px] w-full" />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

