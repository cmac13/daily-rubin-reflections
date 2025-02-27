
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

type VideosDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const VideosDialog = ({ isOpen, onOpenChange }: VideosDialogProps) => {
  const videos = [
    {
      title: "Rick Rubin on The Creative Act",
      youtubeUrl: "https://www.youtube.com/watch?v=C1U5UY3k9j8",
    },
    {
      title: "Rick Rubin Interview with Anderson Cooper",
      youtubeUrl: "https://www.youtube.com/watch?v=H_1XJH8J6jk",
    },
    {
      title: "Rick Rubin on Creativity, Authenticity and Flow",
      youtubeUrl: "https://www.youtube.com/watch?v=ucFq0SK35O0",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#E8E6E1]">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Videos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {videos.map((video) => (
            <a 
              key={video.youtubeUrl}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white/70 rounded-lg hover:bg-white transition-colors"
            >
              <span className="font-medium text-warm-900">{video.title}</span>
              <ExternalLink className="h-5 w-5 text-warm-600" />
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideosDialog;
