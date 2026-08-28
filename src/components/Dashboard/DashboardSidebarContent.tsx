"use client";
import { NavSection } from "@/types/dashboard.type";
import { UserInfo } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import { getIconComponent } from "@/lib/iconMapper";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}
const DashboardSidebarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  return (
    //To do
    <div className="flex h-full  flex-col border-r bg-card overflow-y-auto">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b bg">
        <Link href={dashboardHome}>
          <span className="text-xl font-bold text-primary">Healthcare Hospital</span>
        </Link>
      </div>
      {/* Navigation area */}
      <ScrollArea>
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{section.title}</h4>}
              <div>
                {
                    section.items.map((item,id)=>{
                        const isActive=pathname===item.href;
                        //Icon Mapper 
                        const Icon=getIconComponent(item.icon);
                        return(
<Link key={id} href={item.href} className={cn("flex items-center gap-3 px-3 py-2 text-sm font-medium transition-all rounded-lg",isActive?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-accent hover:text-accent-foreground")}>
<Icon  className="w-4 h-4"/>
<span>{item.title}</span>
</Link>
                        )
                    })
                }
                {
                    sectionId<navItems.length-1 &&(
                        <Separator className="my-4"/>
                    )
                }
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
      {/* User info at bottom */}
      <div  className="border-t px-3 py-4">
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                    {userInfo.name.charAt(0).toUpperCase()}
                </span>
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{userInfo.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{userInfo.role.toLocaleLowerCase().replace("_"," ")}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardSidebarContent;
