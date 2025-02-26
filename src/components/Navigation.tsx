
import { Info, Film, Podcast, DiscAlbum, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      href: "https://www.youtube.com/results?search_query=rick+rubin+interviews",
      icon: <Film className="w-4 h-4" />,
      label: "Videos",
    },
    {
      href: "https://podcasts.apple.com/us/podcast/wisdom-of-the-bard-by-rick-rubin/id1670193102",
      icon: <Podcast className="w-4 h-4" />,
      label: "Podcasts",
    },
    {
      href: "https://en.wikipedia.org/wiki/Rick_Rubin_production_discography",
      icon: <DiscAlbum className="w-4 h-4" />,
      label: "Discography",
    },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 p-4 flex justify-end">
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {menuItems.map((item) => (
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
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm">
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#E8E6E1]">
            <DialogHeader>
              <DialogTitle className="text-center font-serif text-2xl text-warm-900">About This Project</DialogTitle>
            </DialogHeader>
            <div className="text-warm-800 space-y-4 font-sans">
              <p>
                This project is a labor of love created by a fan of Rick Rubin&apos;s work,
                particularly his book &quot;The Creative Act: A Way of Being.&quot;
              </p>
              <p>
                While not officially associated with Rick Rubin, this app aims to
                share the wisdom found in his book with a broader audience who might
                not otherwise discover his insights.
              </p>
              <p>
                Each quote is carefully selected to inspire and encourage creativity
                in everyone&apos;s daily life.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
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
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <Info className="w-4 h-4" />
                    <span>About</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-[#E8E6E1]">
                  <DialogHeader>
                    <DialogTitle className="text-center font-serif text-2xl text-warm-900">About This Project</DialogTitle>
                  </DialogHeader>
                  <div className="text-warm-800 space-y-4 font-sans">
                    <p>
                      This project is a labor of love created by a fan of Rick Rubin&apos;s work,
                      particularly his book &quot;The Creative Act: A Way of Being.&quot;
                    </p>
                    <p>
                      While not officially associated with Rick Rubin, this app aims to
                      share the wisdom found in his book with a broader audience who might
                      not otherwise discover his insights.
                    </p>
                    <p>
                      Each quote is carefully selected to inspire and encourage creativity
                      in everyone&apos;s daily life.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navigation;

