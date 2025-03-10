
import { Heart } from "lucide-react";

const DonationLink = () => {
  return (
    <div className="flex justify-center mt-8">
      <a
        href="https://www.charitynavigator.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-white/50 border border-black/10 rounded-full 
                 text-warm-900 hover:bg-white/70 transition-all duration-300 group"
      >
        <Heart className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
        <span className="font-sans text-sm">Support a Charity</span>
      </a>
    </div>
  );
};

export default DonationLink;
