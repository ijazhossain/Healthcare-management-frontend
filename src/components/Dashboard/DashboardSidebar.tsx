import { getUserInfo } from "@/services/auth.services"
import DashboardSidebarContent from "./DashboardSidebarContent"
import { NavSection } from "@/types/dashboard.type";
import { getCommonNavItemsByRole } from "@/lib/navItems";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

const DashboardSidebar = async() => {
    const userInfo=await getUserInfo();
    console.log("userInfo",userInfo);
    const navItems:NavSection[]=getCommonNavItemsByRole(userInfo.role);
    const dashboardHome=getDefaultDashboardRoute(userInfo.role);
  return (
    <div>
        <DashboardSidebarContent userInfo={userInfo} navItems={navItems} dashboardHome={dashboardHome} />
    </div>
  )
}
export default DashboardSidebar