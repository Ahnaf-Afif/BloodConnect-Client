import {
  FaClipboardList,
  FaHandHoldingHeart,
  FaHome,
  FaPlusCircle,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export const dashboardLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: FaHome,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: FaUser,
  },
  {
    label: "Create Request",
    href: "/dashboard/create-donation-request",
    icon: FaPlusCircle,
    allowedRoles: ["donor", "volunteer", "admin"],
  },
  {
    label: "My Requests",
    href: "/dashboard/my-donation-requests",
    icon: FaClipboardList,
    donorOnly: true,
  },
  {
    label: "All Requests",
    href: "/dashboard/all-blood-donation-request",
    icon: FaHandHoldingHeart,
    volunteerOrAdmin: true,
  },
  {
    label: "All Users",
    href: "/dashboard/all-users",
    icon: FaUsers,
    adminOnly: true,
  },
];
