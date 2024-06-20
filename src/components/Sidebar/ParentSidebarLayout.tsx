import React, { useEffect } from "react";
import Sidebar, { SidebarItem } from ".";
import {
  LayoutDashboard,
  CalendarCheck2,
  LibraryBig,
  UserRound
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
          <Link to={"/dashboard/reports"}>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="reports"
              active={location.pathname === "/dashboard/reports"}
            />
          </Link>
          <Link to={"/dashboard/mycourses"}>
            <SidebarItem
              icon={<LibraryBig size={20} />}
              text="Courses"
              active={location.pathname === "/dashboard/mycourses"}
            />
          </Link>
          <Link to={"/dashboard/myattendance"}>
            <SidebarItem
              icon={<CalendarCheck2 size={20} />}
              text="Attendance"
              active={location.pathname === "/dashboard/myattendance"}
            />
          </Link>
        </Sidebar>
      </div>
    </>
  );
};

export default ParentSidebarLayout;
