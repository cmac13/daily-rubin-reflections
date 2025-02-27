
import { useState, useEffect } from "react";
import { Quote, initialQuotes, loadQuoteChunk, totalChunks } from "@/types/quote";
import { toast } from "sonner";

export const useQuotes = () => {
  // Start with just 5 quotes
  const [quotesState, setQuotesState] = useState<Quote[]>(() => initialQuotes.slice(0, 5));
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [loadedChunks, setLoadedChunks] = useState<number[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const chapters = Array.from(new Set(quotesState.map(quote => quote.chapter)));

  const filteredQuotes = selectedChapter
    ? quotesState.filter(quote => quote.chapter === selectedChapter)
    : quotesState;

  // Function to load more quotes only when explicitly needed (like reaching the end)
  const loadMoreQuotes = async () => {
    if (isLoadingMore) return;
    
    // Only load more if we're near the end of our current quotes
    const remainingQuotes = filteredQuotes.length - (currentQuoteIndex + 1);
    
    if (remainingQuotes < 3) {
      setIsLoadingMore(true);
      
      try {
        // First check if we need to load the rest of chunk 1
        if (!loadedChunks.includes(1)) {
          const remainingFirstChunk = initialQuotes.slice(5);
          setQuotesState(prev => [...prev, ...remainingFirstChunk]);
          setLoadedChunks(prev => [...prev, 1]);
          toast.success("Loaded more quotes");
        } 
        // Then try to load chunk 2 if needed
        else if (!loadedChunks.includes(2)) {
          const chunk2 = await loadQuoteChunk(2);
          setQuotesState(prev => [...prev, ...chunk2]);
          setLoadedChunks(prev => [...prev, 2]);
          toast.success("Loaded more quotes");
        }
        // Finally try chunk 3 if needed
        else if (!loadedChunks.includes(3)) {
          const chunk3 = await loadQuoteChunk(3);
          setQuotesState(prev => [...prev, ...chunk3]);
          setLoadedChunks(prev => [...prev, 3]);
          toast.success("Loaded more quotes");
        }
      } catch (error) {
        console.error("Failed to load more quotes:", error);
        toast.error("Failed to load more quotes");
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const nextQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // If we're at the last quote, go back to the first one
    if (currentQuoteIndex === filteredQuotes.length - 1) {
      setCurrentQuoteIndex(0);
    } else {
      setCurrentQuoteIndex(prev => prev + 1);
    }
    
    // Check if we need to load more quotes
    loadMoreQuotes();
    
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

  return {
    quotesState,
    currentQuoteIndex,
    isAnimating,
    selectedChapter,
    filteredQuotes,
    chapters,
    nextQuote,
    toggleLike,
    setSelectedChapter,
    currentQuote: filteredQuotes[currentQuoteIndex]
  };
};
