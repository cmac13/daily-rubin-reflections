
import { BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChapterSelectorProps {
  chapters: string[];
  selectedChapter: string | null;
  onChapterSelect: (chapter: string | null) => void;
}

const ChapterSelector = ({
  chapters,
  selectedChapter,
  onChapterSelect,
}: ChapterSelectorProps) => {
  return (
    <div className="mb-8 flex items-center space-x-4">
      <BookOpen className="w-4 h-4 text-warm-600" />
      <DropdownMenu>
        <DropdownMenuTrigger className="px-4 py-2 text-sm text-warm-600 hover:text-warm-900 transition-colors">
          {selectedChapter || "All Chapters"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onChapterSelect(null)}>
            All Chapters
          </DropdownMenuItem>
          {chapters.map((chapter) => (
            <DropdownMenuItem
              key={chapter}
              onClick={() => onChapterSelect(chapter)}
            >
              {chapter}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChapterSelector;

