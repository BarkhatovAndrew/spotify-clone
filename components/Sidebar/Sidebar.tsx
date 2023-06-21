"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar = (props: SidebarProps) => {
  const { children } = props;
  const pathname = usePathname();

  return <div>{children}</div>;
};
