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
  CircleUserIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Heading } from "components/Heading";

const UserSidebarLayout = () => {
  const location = useLocation();

  return (
    <>
      <div>
        <Sidebar>
          <div>
            <div className="flex justify-center my-5">
              <CircleUserIcon className="w-[50px] h-[50px]"/>
            </div>
            <h4 className="text-[18px]">
              Welcome
            </h4>
          </div>

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
