import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/Dashboard/DashboardSidebar";

const RootDashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      {/* DashboardSidebar */}
      <DashboardSidebar />
      <div>
        {/* DashboardNavbar top */}
<DashboardNavbar/>
        {/* DashboardContent */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};
export default RootDashboardLayout;
