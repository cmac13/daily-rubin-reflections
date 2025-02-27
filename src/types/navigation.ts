
import { ReactNode } from "react";

export type MenuItem = {
  icon: ReactNode;
  label: string;
  href?: string;
  action?: () => void;
};
