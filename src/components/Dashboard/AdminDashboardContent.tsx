"use client";
import { getDashboardData } from "@/services/dashboard.services";
import { ApiResponse } from "@/types/api.type";
import { IAdminDashboardData } from "@/types/dashboard.type";
import { useQuery } from "@tanstack/react-query";
import StatsCard from "../shared/StatsCard";
import AppointmentBarChart from "../shared/AppointmentBarChart";
import AppointmentPieChart from "../shared/AppointmentPieChart";

const AdminDashboardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getDashboardData,
  });
  console.log(adminDashboardData);
  const { data } = adminDashboardData as ApiResponse<IAdminDashboardData>;
  return (
    <div>
      <StatsCard
        title="Total Appointments"
        value={data?.appointmentCount || 0}
        iconName="CalendarDays"
        description="Number of appointments scheduled"
      />
       <StatsCard
        title="Total Patients"
        value={data?.patientCount || 0}
        iconName="Users"
        description="Number of patients registered"
      />
<AppointmentBarChart data={data?.barChartData}/>
<AppointmentPieChart data={data?.pieChartData}/>
    </div>
  );
};
export default AdminDashboardContent;
