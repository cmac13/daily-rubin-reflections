
import { ExternalLink } from "lucide-react";

const PurchaseLink = () => {
  return (
    <a
      href="https://www.penguinrandomhouse.com/books/717356/the-creative-act-by-rick-rubin/"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-16 group flex items-center space-x-2 text-warm-600 hover:text-warm-900 transition-colors"
    >
      <span className="text-sm">Get the book</span>
      <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
    </a>
  );
};

export default PurchaseLink;

