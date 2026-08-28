import { BarChartData } from "@/types/dashboard.type"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ResponsiveContainer, AreaChart, ReferenceLine, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar } from 'recharts';
interface AppointmentBarChartProps{
    data:BarChartData[]
}
const AppointmentBarChart = ({data}: AppointmentBarChartProps) => {
 
    {
        if(!data || !Array.isArray(data)){
            return(
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Appointment Trends</CardTitle>
                        <CardDescription>Monthly Appointment</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-75">
                        <p className="text-sm text-muted-foreground">

                        Invalid data Provided
                        </p>
                        </CardContent>
                </Card>
            )
        }
    }
    const formattedData=data.map((item)=>({
        month:typeof item.month==='string'?format(new Date(item.month),"MMM yyyy"):format(item.month,"MMM yyyy"),
        appointments:Number(item.count)
    }))
    return(
        <Card>
            <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>Monthly Appointment Statistics</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={formattedData} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tickLine={false} axisLine={false} dataKey="month"/>
                        <YAxis tickLine={false} axisLine={false} allowDecimals={false}/> 
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="appointments"
                fill="oklch(0.646 0.222 41.116)"
                radius={[4, 4, 0, 0]}
                maxBarSize={60} />                  </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
  
}
export default AppointmentBarChart