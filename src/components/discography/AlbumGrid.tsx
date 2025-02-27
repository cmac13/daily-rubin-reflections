
import AlbumCard from "./AlbumCard";
import EmptyState from "./EmptyState";
import { Album } from "./types";

interface AlbumGridProps {
  albums: Album[];
  onReset: () => void;
}

const AlbumGrid = ({ albums, onReset }: AlbumGridProps) => {
  if (albums.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {albums.map((album, index) => (
        <AlbumCard 
          key={`${album.artist}-${album.title}`} 
          album={album} 
          index={index} 
        />
      ))}
    </div>
  );
};

export default AlbumGrid;
