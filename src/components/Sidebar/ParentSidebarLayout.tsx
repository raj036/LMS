import React, { useEffect } from "react";
import Sidebar, { SidebarItem } from ".";
import {
  LayoutDashboard,
  CalendarCheck2,
  LibraryBig,
  UserRound,
  MicVocal,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "hooks/useAuthContext";
import { initFlowbite } from "flowbite";

const ParentSidebarLayout = () => {
  const location = useLocation();
  const { user }: any = useAuthContext();

  useEffect(() => {
    initFlowbite();
  }, [user]);

  return (
    <>
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
          <Link to={"/dashboard/reports"}>
            <SidebarItem
              icon={<LibraryBig size={20} />}
              text="Reports"
              active={location.pathname === "/dashboard/reports"}
            />
          </Link>
          <Link to={"/dashboard/attendance"}>
            <SidebarItem
              icon={<CalendarCheck2 size={20} />}
              text="Attendance"
              active={location.pathname === "/dashboard/attendance"}
            />
          </Link>
          <Link to={"/dashboard/announcements"}>
            <SidebarItem
              icon={<MicVocal size={20} />}
              text="Announcements"
              active={location.pathname === "/dashboard/announcements"}
            />
          </Link>
        </Sidebar>
      </div>
    </>
  );
};

export default ParentSidebarLayout;
