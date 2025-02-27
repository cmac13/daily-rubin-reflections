
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

type PodcastsDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const PodcastsDialog = ({ isOpen, onOpenChange }: PodcastsDialogProps) => {
  const podcasts = [
    {
      title: "Wisdom of the Bard by Rick Rubin",
      url: "https://podcasts.apple.com/us/podcast/wisdom-of-the-bard-by-rick-rubin/id1670193102",
    },
    {
      title: "Tetragrammaton with Rick Rubin",
      url: "https://podcasts.apple.com/us/podcast/tetragrammaton-with-rick-rubin/id1669938969",
    },
    {
      title: "Broken Record with Rick Rubin",
      url: "https://podcasts.apple.com/us/podcast/broken-record-with-rick-rubin/id1311004083",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#E8E6E1]">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Podcasts</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {podcasts.map((podcast) => (
            <a 
              key={podcast.url}
              href={podcast.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/70 rounded-lg hover:bg-white transition-colors"
            >
              <span className="font-medium text-warm-900">{podcast.title}</span>
              <ExternalLink className="h-5 w-5 text-warm-600" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PodcastsDialog;
