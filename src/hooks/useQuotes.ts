import { useState, useEffect, useCallback } from "react";
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
  const [viewedQuoteIds, setViewedQuoteIds] = useState<Set<string>>(new Set());

  const chapters = Array.from(new Set(quotesState.map(quote => quote.chapter)));

  const filteredQuotes = selectedChapter
    ? quotesState.filter(quote => quote.chapter === selectedChapter)
    : quotesState;

  // Create a unique ID for a quote to track which ones we've seen
  const getQuoteId = useCallback((quote: Quote): string => {
    return `${quote.text.substring(0, 20)}-${quote.page}`;
  }, []);

  // Add current quote to viewed set
  useEffect(() => {
    if (filteredQuotes.length > 0 && currentQuoteIndex >= 0 && currentQuoteIndex < filteredQuotes.length) {
      const quoteId = getQuoteId(filteredQuotes[currentQuoteIndex]);
      setViewedQuoteIds(prev => new Set(prev).add(quoteId));
    }
  }, [currentQuoteIndex, filteredQuotes, getQuoteId]);

  // Function to load more quotes only when explicitly needed (like reaching the end)
  const loadMoreQuotes = async () => {
    if (isLoadingMore) return;
    
    // Calculate how many quotes we haven't viewed yet
    const unseenQuotes = filteredQuotes.filter(quote => 
      !viewedQuoteIds.has(getQuoteId(quote))
    ).length;
    
    // If we've seen most quotes, load more
    if (unseenQuotes < 3) {
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

  // Get a random quote that we haven't seen recently, if possible
  const getRandomQuoteIndex = (): number => {
    // If we have seen all quotes, pick any random one
    if (viewedQuoteIds.size >= filteredQuotes.length) {
      return Math.floor(Math.random() * filteredQuotes.length);
    }
    
    // Otherwise try to find one we haven't seen yet
    const unseenIndices = filteredQuotes
      .map((quote, index) => ({ quote, index }))
      .filter(({ quote }) => !viewedQuoteIds.has(getQuoteId(quote)))
      .map(({ index }) => index);
    
    // Pick a random unseen quote
    return unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
  };

  const nextQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Get a random quote index
    const randomIndex = getRandomQuoteIndex();
    setCurrentQuoteIndex(randomIndex);
    
    // Check if we need to load more quotes
    loadMoreQuotes();
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return {
    quotesState,
    currentQuoteIndex,
    isAnimating,
    selectedChapter,
    filteredQuotes,
    chapters,
    nextQuote,
    setSelectedChapter,
    currentQuote: filteredQuotes[currentQuoteIndex]
  };
};
