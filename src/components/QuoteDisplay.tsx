import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Share2, Twitter, Instagram, Copy, ExternalLink, Heart, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Quote {
  text: string;
  chapter: string;
  page: number;
  likes?: number;
  isLiked?: boolean;
}

export const quotes: Quote[] = [
  {
    text: "The goal is to be as present as possible in the making and allow the result to be what it wants to be.",
    chapter: "On Creating",
    page: 15,
    likes: 0,
    isLiked: false,
  },
  {
    text: "To create is to bring something into existence that wasn't there before. Whether it's a song, a piece of visual art, a cake, or a garden, each creative endeavor adds something new to our world.",
    chapter: "The Source",
    page: 23,
    likes: 0,
    isLiked: false,
  },
  {
    text: "The more we practice any skill, the less we have to think about its mechanics. This allows us to be more present in the moment of making.",
    chapter: "Practice",
    page: 45,
    likes: 0,
    isLiked: false,
  },
  {
    text: "A work of art is never finished. It's abandoned or delivered to a deadline.",
    chapter: "Completion",
    page: 78,
    likes: 0,
    isLiked: false,
  },
  {
    text: "The best ideas often come when we're not trying to come up with them.",
    chapter: "Flow State",
    page: 92,
    likes: 0,
    isLiked: false,
  },
];

const QuoteDisplay = () => {
  const [quotesState, setQuotesState] = useState<Quote[]>(quotes);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const chapters = Array.from(new Set(quotesState.map(quote => quote.chapter)));

  const filteredQuotes = selectedChapter
    ? quotesState.filter(quote => quote.chapter === selectedChapter)
    : quotesState;

  const nextQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentQuoteIndex((prev) => (prev + 1) % filteredQuotes.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toggleLike = () => {
    setQuotesState((prevQuotes) => {
      const newQuotes = [...prevQuotes];
      const currentQuote = newQuotes[currentQuoteIndex];
      currentQuote.isLiked = !currentQuote.isLiked;
      currentQuote.likes = currentQuote.isLiked ? (currentQuote.likes || 0) + 1 : (currentQuote.likes || 0) - 1;
      
      const message = currentQuote.isLiked ? "Quote added to favorites!" : "Quote removed from favorites";
      toast.success(message);
      
      return newQuotes;
    });
  };

  const getShareText = () => {
    const quote = filteredQuotes[currentQuoteIndex];
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

  const currentQuote = filteredQuotes[currentQuoteIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E6E1]">
      <div className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="mb-16 relative w-24 h-24">
          <div className="absolute inset-0 border-2 border-black rounded-full" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full" />
        </div>

        <div className="mb-8 flex items-center space-x-4">
          <BookOpen className="w-4 h-4 text-warm-600" />
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 text-sm text-warm-600 hover:text-warm-900 transition-colors">
              {selectedChapter || "All Chapters"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedChapter(null)}>
                All Chapters
              </DropdownMenuItem>
              {chapters.map((chapter) => (
                <DropdownMenuItem
                  key={chapter}
                  onClick={() => setSelectedChapter(chapter)}
                >
                  {chapter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center text-center space-y-8 max-w-2xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-warm-500 font-sans text-sm tracking-widest uppercase">
                Daily Wisdom
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-light text-warm-900 leading-relaxed">
                {currentQuote.text}
              </h1>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <span className="font-serif text-warm-600 text-lg">
                {currentQuote.chapter}
              </span>
              <span className="text-warm-400 text-sm">
                Page {currentQuote.page}
              </span>
            </div>

            <div className="flex items-center space-x-4 pt-8">
              <button
                onClick={nextQuote}
                disabled={isAnimating}
                className="group flex items-center space-x-2 px-6 py-3 bg-white/50 border border-black/10 rounded-full 
                         text-warm-900 hover:bg-white/70 transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-sans text-sm">Next Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={toggleLike}
                className={`group flex items-center space-x-2 px-6 py-3 bg-white/50 border border-black/10 rounded-full 
                         text-warm-900 hover:bg-white/70 transition-all duration-300`}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    currentQuote.isLiked
                      ? "fill-red-500 text-red-500"
                      : "fill-transparent"
                  }`}
                />
                <span className="font-sans text-sm">
                  {currentQuote.likes || 0}
                </span>
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
          </motion.div>
        </AnimatePresence>

        <a
          href="https://www.penguinrandomhouse.com/books/717356/the-creative-act-by-rick-rubin/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 group flex items-center space-x-2 text-warm-600 hover:text-warm-900 transition-colors"
        >
          <span className="text-sm">Get the book</span>
          <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default QuoteDisplay;
