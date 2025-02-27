
import { Album } from "./types";

interface AlbumCardProps {
  album: Album;
  index: number;
}

const AlbumCard = ({ album, index }: AlbumCardProps) => {
  return (
    <div 
      className={`p-4 rounded-lg ${album.notable ? 'bg-warm-200' : 'bg-warm-100'} transition-transform duration-200 hover:scale-[1.02] animate-fade-up`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col h-full">
        <h3 className="font-serif text-lg font-medium text-warm-900 line-clamp-2">{album.title}</h3>
        <p className="text-warm-700">{album.artist}</p>
        <div className="mt-auto pt-2 flex justify-between items-center">
          <span className="text-warm-600 text-sm">{album.year}</span>
          {album.notable && (
            <span className="text-xs px-2 py-1 bg-warm-300 rounded-full text-warm-800">
              Notable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
