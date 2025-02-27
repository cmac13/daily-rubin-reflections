
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Film } from "lucide-react";

type VideosDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const VideosDialog = ({ isOpen, onOpenChange }: VideosDialogProps) => {
  const videos = [
    {
      title: "Rick Rubin on The Creative Act",
      embedId: "C1U5UY3k9j8",
    },
    {
      title: "Rick Rubin Interview with Anderson Cooper",
      embedId: "H_1XJH8J6jk",
    },
    {
      title: "Rick Rubin on Creativity, Authenticity and Flow",
      embedId: "ucFq0SK35O0",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-[#E8E6E1]">
        <DialogHeader>
          <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Videos</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {videos.map((video) => (
            <div key={video.embedId} className="space-y-2">
              <h3 className="font-medium text-warm-900">{video.title}</h3>
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.embedId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideosDialog;
