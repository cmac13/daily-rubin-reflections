
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      youtubeUrl: "https://www.youtube.com/watch?v=H0I2PKiZDkQ",
    },
    {
      title: "Rick Rubin Interview with Anderson Cooper",
      youtubeUrl: "https://www.youtube.com/watch?v=19o6dJXSZKA",
    },
    {
      title: "Rick Rubin on Creativity, Authenticity and Flow",
      youtubeUrl: "https://www.youtube.com/watch?v=6klnH60RnkQ",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-[#E8E6E1]">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Videos</DialogTitle>
          <DialogDescription className="text-center text-warm-600">
            Watch interviews with Rick Rubin about creativity and his work
          </DialogDescription>
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
