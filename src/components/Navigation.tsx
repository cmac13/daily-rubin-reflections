
import { Film, Podcast, DiscAlbum } from "lucide-react";
import { useState } from "react";
import AboutDialog from "./AboutDialog";
import MobileMenu from "./MobileMenu";
import Discography from "./Discography";
import { Dialog } from "@/components/ui/dialog";
import { MenuItem } from "../types/navigation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDiscography, setShowDiscography] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: <Film className="w-4 h-4" />,
      label: "Videos",
      href: "https://www.youtube.com/results?search_query=Rick+Rubin",
    },
    {
      icon: <Podcast className="w-4 h-4" />,
      label: "Podcasts",
      href: "https://podcasts.apple.com/us/search?term=rick%20rubin",
    },
    {
      icon: <DiscAlbum className="w-4 h-4" />,
      label: "Discography",
      action: () => setShowDiscography(true),
    },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 p-4 flex justify-end">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {menuItems.map((item) => (
          item.href ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        ))}
        <AboutDialog />
      </div>

      {/* Dialogs */}
      <Dialog open={showDiscography} onOpenChange={setShowDiscography}>
        <Discography />
      </Dialog>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} menuItems={menuItems} />
      </div>
    </nav>
  );
};

export default Navigation;
