
import { useState, lazy, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, initialQuotes, loadQuoteChunk, totalChunks, totalQuotes } from "@/types/quote";
import BookCircle from "./BookCircle";
import ChapterSelector from "./ChapterSelector";
import QuoteActions from "./QuoteActions";
import { toast } from "sonner";

// Lazy loaded component
const PurchaseLink = lazy(() => import("./PurchaseLink"));

const QuoteDisplay = () => {
  // Start with only the first 5 quotes from initialQuotes
  const [quotesState, setQuotesState] = useState<Quote[]>(() => initialQuotes.slice(0, 5));
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [loadedChunks, setLoadedChunks] = useState<number[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  const chapters = Array.from(new Set(quotesState.map(quote => quote.chapter)));

  const filteredQuotes = selectedChapter
    ? quotesState.filter(quote => quote.chapter === selectedChapter)
    : quotesState;

  // Function to load the remaining quotes from chunk 1 and other chunks
  const loadRemainingQuotes = async () => {
    if (!isInitialLoadComplete && !isLoadingMore) {
      setIsLoadingMore(true);
      
      try {
        // First, load the remaining quotes from chunk 1
        const remainingFirstChunk = initialQuotes.slice(5);
        
        // Update state with the remaining quotes from chunk 1
        setQuotesState(prev => [...prev, ...remainingFirstChunk]);
        setLoadedChunks(prev => [...prev, 1]);
        
        // Mark initial load as complete
        setIsInitialLoadComplete(true);
        
        // Now load chunk 2 in the background after a slight delay
        setTimeout(async () => {
          try {
            const chunk2 = await loadQuoteChunk(2);
            setQuotesState(prev => [...prev, ...chunk2]);
            setLoadedChunks(prev => [...prev, 2]);
            
            // Load chunk 3 after another delay
            setTimeout(async () => {
              try {
                const chunk3 = await loadQuoteChunk(3);
                setQuotesState(prev => [...prev, ...chunk3]);
                setLoadedChunks(prev => [...prev, 3]);
              } catch (error) {
                console.error("Failed to load chunk 3:", error);
              }
            }, 2000);
            
          } catch (error) {
            console.error("Failed to load chunk 2:", error);
          }
        }, 1000);
        
      } catch (error) {
        console.error("Failed to load remaining quotes:", error);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  // Function to load more quotes if needed during navigation
  const loadMoreQuotes = async () => {
    // If we're approaching the end of our loaded quotes, ensure all chunks are loaded
    const remainingQuotes = quotesState.length - (currentQuoteIndex + 1);
    const shouldLoadMore = remainingQuotes < 5 && loadedChunks.length < totalChunks;
    
    if (shouldLoadMore && !isLoadingMore) {
      setIsLoadingMore(true);
      
      // Determine which chunk to load next
      const chunksToLoad = [];
      for (let i = 1; i <= totalChunks; i++) {
        if (!loadedChunks.includes(i)) {
          chunksToLoad.push(i);
        }
      }
      
      if (chunksToLoad.length > 0) {
        try {
          const nextChunkNumber = chunksToLoad[0];
          const newQuotes = await loadQuoteChunk(nextChunkNumber);
          setQuotesState(prev => [...prev, ...newQuotes]);
          setLoadedChunks(prev => [...prev, nextChunkNumber]);
        } catch (error) {
          console.error("Failed to load more quotes:", error);
        } finally {
          setIsLoadingMore(false);
        }
      } else {
        setIsLoadingMore(false);
      }
    }
  };

  // Start loading the remaining quotes immediately after mounting
  useEffect(() => {
    loadRemainingQuotes();
  }, []);

  // Load more quotes when needed during navigation
  useEffect(() => {
    loadMoreQuotes();
  }, [currentQuoteIndex]);

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
