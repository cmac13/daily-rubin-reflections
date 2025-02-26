
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navigation = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 p-4 flex justify-end">
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
    </nav>
  );
};

export default Navigation;
