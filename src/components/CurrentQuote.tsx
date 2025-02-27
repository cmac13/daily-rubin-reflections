
import { motion } from "framer-motion";
import { Quote } from "@/types/quote";

interface CurrentQuoteProps {
  quote: Quote;
  quoteIndex: number;
}

const CurrentQuote = ({ quote, quoteIndex }: CurrentQuoteProps) => {
  return (
    <motion.div
      key={quoteIndex}
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
          {quote.text}
        </h1>
      </div>

      <div className="flex flex-col items-center space-y-1">
        <span className="font-serif text-warm-600 text-lg">
          {quote.chapter}
        </span>
        <span className="text-warm-400 text-sm">
          Page {quote.page}
        </span>
      </div>
    </motion.div>
  );
};

export default CurrentQuote;
