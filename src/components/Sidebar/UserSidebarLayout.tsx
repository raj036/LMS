import React from "react";
import Sidebar, { SidebarItem } from ".";
import {
  LayoutDashboard,
  User,
  BadgeInfo,
  Presentation,
  GraduationCap,
  CalendarCheck2,
  LibraryBig,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const UserSidebarLayout = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Sidebar>
          <Link to={"/dashboard/user"}>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active={location.pathname === "/dashboard/user"}
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

export default UserSidebarLayout;
