
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AboutDialog from "./AboutDialog";
import { MenuItem } from "../types/navigation";

type MobileMenuProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: MenuItem[];
};

const MobileMenu = ({ isOpen, setIsOpen, menuItems }: MobileMenuProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-warm-600 hover:text-warm-900 transition-colors p-2">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[240px] bg-[#E8E6E1]">
        <SheetHeader>
          <SheetTitle className="text-warm-900 text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-col space-y-4">
          {menuItems.map((item) => (
            item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  setIsOpen(false);
                  item.action && item.action();
                }}
                className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            )
          ))}
          <AboutDialog />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
