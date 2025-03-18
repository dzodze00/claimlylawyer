import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Tabs defaultValue="automated" className="space-y-4">
        <TabsList>
          <TabsTrigger value="automated">Automated Discovery</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="import">Batch Import</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-[250px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-[350px]" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-[120px]" />
                </div>
                <div className="grid gap-2 md:grid-cols-4">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-6 w-full" />
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[250px]" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-[300px]" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Skeleton className="h-full w-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-[180px]" />
                </CardTitle>
                <CardDescription>
                  <Skeleton className="h-4 w-[250px]" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[400px] w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

