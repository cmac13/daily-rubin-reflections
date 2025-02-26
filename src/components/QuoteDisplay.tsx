
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Share2 } from "lucide-react";
import { toast } from "sonner";

interface Quote {
  text: string;
  chapter: string;
  page: number;
}

export const quotes: Quote[] = [
  {
    text: "The goal is to be as present as possible in the making and allow the result to be what it wants to be.",
    chapter: "On Creating",
    page: 15,
  },
  {
    text: "To create is to bring something into existence that wasn't there before. Whether it's a song, a piece of visual art, a cake, or a garden, each creative endeavor adds something new to our world.",
    chapter: "The Source",
    page: 23,
  },
  {
    text: "The more we practice any skill, the less we have to think about its mechanics. This allows us to be more present in the moment of making.",
    chapter: "Practice",
    page: 45,
  },
  {
    text: "A work of art is never finished. It's abandoned or delivered to a deadline.",
    chapter: "Completion",
    page: 78,
  },
  {
    text: "The best ideas often come when we're not trying to come up with them.",
    chapter: "Flow State",
    page: 92,
  },
];

const QuoteDisplay = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const shareQuote = async () => {
    const quote = quotes[currentQuoteIndex];
    const shareText = `"${quote.text}"\n\n- From "${quote.chapter}", page ${quote.page}\nThe Creative Act by Rick Rubin`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
        });
        toast.success("Thanks for sharing!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Quote copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy quote");
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-warm-500 font-sans text-sm tracking-wide uppercase">
                Daily Wisdom
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-light text-warm-900 leading-tight">
                {quotes[currentQuoteIndex].text}
              </h1>
            </div>

            <div className="flex flex-col items-center space-y-1">
              <span className="font-serif text-warm-600 text-lg">
                {quotes[currentQuoteIndex].chapter}
              </span>
              <span className="text-warm-400 text-sm">
                Page {quotes[currentQuoteIndex].page}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={nextQuote}
                disabled={isAnimating}
                className="group flex items-center space-x-2 px-6 py-3 bg-warm-50 border border-warm-200 rounded-full 
                         text-warm-700 hover:bg-warm-100 transition-all duration-300 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-sans text-sm">Next Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={shareQuote}
                className="group flex items-center space-x-2 px-6 py-3 bg-warm-50 border border-warm-200 rounded-full 
                         text-warm-700 hover:bg-warm-100 transition-all duration-300"
              >
                <span className="font-sans text-sm">Share</span>
                <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuoteDisplay;
