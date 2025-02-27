
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
import Discography from "./Discography";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showDiscography, setShowDiscography] = useState(false);

  const menuItems = [
    {
      icon: <Film className="w-4 h-4" />,
      label: "Videos",
      action: () => setShowVideos(true),
    },
    {
      href: "https://podcasts.apple.com/us/podcast/wisdom-of-the-bard-by-rick-rubin/id1670193102",
      icon: <Podcast className="w-4 h-4" />,
      label: "Podcasts",
    },
    {
      icon: <DiscAlbum className="w-4 h-4" />,
      label: "Discography",
      action: () => setShowDiscography(true),
    },
  ];

  const videos = [
    {
      title: "Rick Rubin on The Creative Act",
      embedId: "C1U5UY3k9j8",
    },
    {
      title: "Rick Rubin Interview with Anderson Cooper",
      embedId: "H_1XJH8J6jk",
    },
    {
      title: "Rick Rubin on Creativity, Authenticity and Flow",
      embedId: "ucFq0SK35O0",
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

      {/* Videos Dialog */}
      <Dialog open={showVideos} onOpenChange={setShowVideos}>
        <DialogContent className="sm:max-w-[800px] bg-[#E8E6E1]">
          <DialogHeader>
            <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Videos</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6">
            {videos.map((video) => (
              <div key={video.embedId} className="space-y-2">
                <h3 className="font-medium text-warm-900">{video.title}</h3>
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Discography Dialog */}
      <Dialog open={showDiscography} onOpenChange={setShowDiscography}>
        <Discography />
      </Dialog>

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
                      item.action();
                    }}
                    className="text-warm-600 hover:text-warm-900 transition-colors flex items-center space-x-2 text-sm"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )
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
