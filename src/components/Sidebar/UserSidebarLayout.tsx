import React, { useEffect } from "react";
import Sidebar, { SidebarItem } from ".";
import {
  LayoutDashboard,
  CalendarCheck2,
  UserRound,
  Mic2Icon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
import { initFlowbite } from "flowbite";

const UserSidebarLayout = () => {
  const location = useLocation();
  const { user }: any = useAuthContext();

  useEffect(() => {
    initFlowbite();
  }, [user]);

  return (
    <>
      {user && user.user_type === "student" && (
        <div>
          <Sidebar>
            <Link to={"/dashboard/profile"}>
              <SidebarItem
                icon={<UserRound size={20} />}
                text="Profile"
                active={location.pathname === "/dashboard/profile"}
              />
            </Link>
            <Link to={"/dashboard/user"}>
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                active={location.pathname === "/dashboard/user"}
              />
            </Link>
            <Link to={"/dashboard/myattendance"}>
              <SidebarItem
                icon={<CalendarCheck2 size={20} />}
                text="Attendance"
                active={location.pathname === "/dashboard/myattendance"}
              />
            </Link>
            <Link to={"/dashboard/myannouncement"}>
              <SidebarItem
                icon={<Mic2Icon size={20} />}
                text="Announcement"
                active={location.pathname === "/dashboard/myannouncement"}
              />
            </Link>
          </Sidebar>
        </div>
      )}
    </>
  );
};

export default UserSidebarLayout;
