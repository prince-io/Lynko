"use client";

import {
  HomeIcon,
  UserIcon,
  LinkIcon,
  PaletteIcon,
  AnalyticsIcon,
} from "@/components/icons";

const menuItems = [
  {
    id: "Home",
    label: "Home",
    icon: <HomeIcon w={20} h={20} className="stroke-current" />,
  },
  {
    id: "Profile",
    label: "Profile",
    icon: <UserIcon w={20} h={20} className="stroke-current" />,
  },
  {
    id: "Links",
    label: "Links",
    icon: <LinkIcon w={20} h={20} className="stroke-current" />,
  },
  {
    id: "Appearance",
    label: "Appearance",
    icon: <PaletteIcon w={20} h={20} className="stroke-current" />,
  },
  {
    id: "Analytics",
    label: "Analytics",
    icon: <AnalyticsIcon w={20} h={20} className="stroke-current" />,
  },
];

export default function Menu({ activeTab, setActiveTab, className = "" }) {
  return (
    <ul className={className}>
      {menuItems.map((item) => (
        <li key={item.id}>
          <a
            onClick={() => setActiveTab(item.id)}
            className={
              activeTab === item.id
                ? "active bg-primary text-primary-content"
                : ""
            }
          >
            {item.icon}
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
