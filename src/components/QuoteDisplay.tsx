
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import BookCircle from "./BookCircle";
import ChapterSelector from "./ChapterSelector";
import QuoteActions from "./QuoteActions";
import CurrentQuote from "./CurrentQuote";
import DonationLink from "./DonationLink";
import { useQuotes } from "@/hooks/useQuotes";

// Lazy loaded component
const PurchaseLink = lazy(() => import("./PurchaseLink"));

const QuoteDisplay = () => {
  const {
    currentQuote,
    currentQuoteIndex,
    isAnimating,
    chapters,
    selectedChapter,
    nextQuote,
    setSelectedChapter
  } = useQuotes();
  
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
          <CurrentQuote 
            quote={currentQuote} 
            quoteIndex={currentQuoteIndex} 
          />
        </AnimatePresence>

        <QuoteActions
          quote={currentQuote}
          onNextQuote={nextQuote}
          isAnimating={isAnimating}
        />

        <DonationLink />

        <Suspense fallback={<div className="mt-8 text-sm text-warm-500">Loading...</div>}>
          <PurchaseLink />
        </Suspense>
      </div>
    </div>
  );
};

export default QuoteDisplay;
