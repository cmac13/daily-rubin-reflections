
import { ArrowRight, Share2, Twitter, Instagram, Copy } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Quote } from "@/types/quote";

interface QuoteActionsProps {
  quote: Quote;
  onNextQuote: () => void;
  isAnimating: boolean;
}

const QuoteActions = ({
  quote,
  onNextQuote,
  isAnimating,
}: QuoteActionsProps) => {
  const getShareText = () => {
    return `"${quote.text}"\n\n- From "${quote.chapter}", page ${quote.page}\nThe Creative Act by Rick Rubin`;
  };

  const copyToClipboard = async () => {
    const text = getShareText();
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Quote copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy quote");
    }
  };

  const shareToX = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    toast.success("Opening X (Twitter)...");
  };

  const shareToInstagram = () => {
    toast.info("Opening Instagram. Copy and paste the quote to share!", {
      duration: 4000,
    });
    window.location.href = "instagram://";
  };

  const shareToTikTok = () => {
    toast.info("Opening TikTok. Copy and paste the quote to share!", {
      duration: 4000,
    });
    window.location.href = "tiktok://";
  };

  return (
    <div className="flex flex-col items-center space-y-4 pt-8 w-full sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-4">
      <button
        onClick={onNextQuote}
        disabled={isAnimating}
        className="w-full sm:w-auto group flex items-center justify-center space-x-2 px-6 py-3 bg-white/50 border border-black/10 rounded-full 
                 text-warm-900 hover:bg-white/70 transition-all duration-300 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="font-sans text-sm">Next Quote</span>
        <ArrowRight className="w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger className="group flex items-center space-x-2 px-6 py-3 bg-white/50 border border-black/10 rounded-full 
                                      text-warm-900 hover:bg-white/70 transition-all duration-300">
          <span className="font-sans text-sm">Share</span>
          <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={shareToX} className="cursor-pointer">
            <Twitter className="mr-2 h-4 w-4" />
            <span>Share on X</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToInstagram} className="cursor-pointer">
            <Instagram className="mr-2 h-4 w-4" />
            <span>Share on Instagram</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToTikTok} className="cursor-pointer">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>Share on TikTok</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy to Clipboard</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default QuoteActions;
