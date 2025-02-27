
export interface Quote {
  text: string;
  chapter: string;
  page: number;
  likes?: number;
  isLiked?: boolean;
}

// Import individual quote chunk files
import { quotesChunk1 } from "./quotesData/quotesChunk1";
import { quotesChunk2 } from "./quotesData/quotesChunk2";
import { quotesChunk3 } from "./quotesData/quotesChunk3";

// Export initial quotes chunk and metadata
export const initialQuotes = quotesChunk1;
export const totalQuotes = quotesChunk1.length + quotesChunk2.length + quotesChunk3.length;
export const totalChunks = 3;

// Function to load additional quote chunks
export const loadQuoteChunk = async (chunkNumber: number): Promise<Quote[]> => {
  // Simulate network delay for more realistic loading
  await new Promise(resolve => setTimeout(resolve, 300));
  
  switch (chunkNumber) {
    case 1:
      return quotesChunk1;
    case 2:
      return quotesChunk2;
    case 3:
      return quotesChunk3;
    default:
      return [];
  }
};
