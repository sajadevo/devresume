"use client";

// @components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// @utils
import { scaleSymlog } from "d3-scale";

const chartConfig = {
  commit: {
    label: "Commits",
    color: "hsl(var(--chart-1))",
  },
  pr: {
    label: "Pull Requests",
    color: "hsl(var(--chart-2))",
  },
  issue: {
    label: "Issues",
    color: "hsl(var(--chart-3))",
  },
  "code-review": {
    label: "Code Review",
    color: "hsl(var(--chart-4))",
  },
  repo: {
    label: "Repositories",
    color: "hsl(var(--chart-5))",
  },
  star: {
    label: "Stars",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function AnalyticsChart({
  data,
  dateRange,
}: {
  data: { name: string; value: number }[];
  dateRange: string;
}) {
  return (
    <Card>
      <CardHeader className="px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
        <CardTitle>My Github Activity</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-3 sm:pb-5">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart accessibilityLayer data={data} layout="vertical">
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="value" type="number" scale={scaleSymlog()} hide />
            <Bar dataKey="value" layout="vertical" radius={10}>
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={16}
                className="fill-primary-foreground"
                fontSize={14}
                formatter={(value: any) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <LabelList
                dataKey="value"
                position="insideRight"
                offset={16}
                className="fill-primary-foreground hidden sm:block"
                fontSize={14}
                formatter={(value: any) =>
                  new Intl.NumberFormat("en-US").format(value)
                }
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
