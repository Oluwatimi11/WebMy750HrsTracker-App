import { RxDashboard } from "react-icons/rx";
import { TbDeviceAnalytics, TbSettings } from "react-icons/tb";
import { HiOutlineBuildingLibrary, HiOutlineUserGroup } from "react-icons/hi2";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuCalendarPlus } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { BsHeadset } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

export const sideBarTop = [
  {
    id: 0,
    name: "Main Dashboard",
    route: "/",
    icon: <RxDashboard />,
    component: "MainDashboard"
  },
  {
    id: 1,
    name: "Logs",
    route: "/logs",
    icon: <TbDeviceAnalytics />,
    component: "Logs"
  },
  {
    id: 2,
    name: "Properties",
    route: "/properties",
    icon: <HiOutlineBuildingLibrary />,
    component: "Properties"
  },
  {
    id: 3,
    name: "Record Time",
    route: "/record-time",
    icon: <IoAddCircleOutline />,
    component: "RecordTime"
  },
  {
    id: 4,
    name: "Import Hours",
    route: "/import-hours",
    icon: <LuCalendarPlus />,
    component: "ImportHours"
  },
  {
    id: 5,
    name: "Team Members",
    route: "/team-members",
    icon: <AiOutlineTeam />,
    component: "TeamMembers"
  },
];


export const sideBarBottom = [
  {
    id: 0,
    name: "Support",
    route: "/support",
    icon: <BsHeadset />,
  },
  {
    id: 1,
    name: "Settings",
    route: "/settings",
    icon: <TbSettings />,
  },
  {
    id: 2,
    name: "Tips",
    route: "/tips",
    icon: <RiErrorWarningLine />,
  },
  {
    id: 3,
    name: "Members group",
    route: "/members-group",
    icon: <HiOutlineUserGroup />,
  }
];


export const memberNav = [
  {
    id: 0,
    name: "Home",
    navroute: "/"
  },
  {
    id: 1,
    name: "Pricing",
    navroute: "#"
  },
  {
    id: 2,
    name: "FAQs",
    navroute: "#"
  },
  {
    id: 3,
    name: "About Us",
    navroute: "#"
  }
];