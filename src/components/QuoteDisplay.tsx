
import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, quotes } from "@/types/quote";
import BookCircle from "./BookCircle";
import ChapterSelector from "./ChapterSelector";
import QuoteActions from "./QuoteActions";
import { toast } from "sonner";

// Lazy loaded component
const PurchaseLink = lazy(() => import("./PurchaseLink"));

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
      const quoteIndex = newQuotes.findIndex(q => q.text === filteredQuotes[currentQuoteIndex].text);
      if (quoteIndex !== -1) {
        const currentQuote = newQuotes[quoteIndex];
        currentQuote.isLiked = !currentQuote.isLiked;
        currentQuote.likes = currentQuote.isLiked ? (currentQuote.likes || 0) + 1 : (currentQuote.likes || 0) - 1;
        
        const message = currentQuote.isLiked ? "Quote added to favorites!" : "Quote removed from favorites";
        toast.success(message);
      }
      return newQuotes;
    });
  };

  const currentQuote = filteredQuotes[currentQuoteIndex];
  
  if (!currentQuote) {
    return <div className="min-h-screen flex items-center justify-center bg-[#E8E6E1]">Loading quotes...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8E6E1]">
      <div className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <BookCircle />

        <ChapterSelector
          chapters={chapters}
          selectedChapter={selectedChapter}
          onChapterSelect={setSelectedChapter}
        />

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

            <QuoteActions
              quote={currentQuote}
              onNextQuote={nextQuote}
              onToggleLike={toggleLike}
              isAnimating={isAnimating}
            />
          </motion.div>
        </AnimatePresence>

        <Suspense fallback={<div className="mt-8 text-sm text-warm-500">Loading...</div>}>
          <PurchaseLink />
        </Suspense>
      </div>
    </div>
  );
};

export default QuoteDisplay;
