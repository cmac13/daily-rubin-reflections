
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import DecadeFilter from "./discography/DecadeFilter";
import SearchBar from "./discography/SearchBar";
import AlbumGrid from "./discography/AlbumGrid";
import Footer from "./discography/Footer";
import { discographyByDecade } from "./discography/DiscographyData";

const Discography = () => {
  const [selectedDecade, setSelectedDecade] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const decades = Object.keys(discographyByDecade);

  const filteredAlbums = selectedDecade === "all"
    ? Object.values(discographyByDecade).flat()
    : discographyByDecade[selectedDecade] || [];

  const searchedAlbums = searchTerm
    ? filteredAlbums.filter(album => 
        album.artist.toLowerCase().includes(searchTerm.toLowerCase()) || 
        album.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredAlbums;
  
  const sortedAlbums = [...searchedAlbums].sort((a, b) => b.year - a.year);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDecade("all");
  };

  return (
    <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-auto bg-[#E8E6E1]">
      <DialogHeader>
        <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Discography</DialogTitle>
      </DialogHeader>
      
      <div className="w-full mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <DecadeFilter 
            decades={decades} 
            selectedDecade={selectedDecade} 
            onDecadeChange={setSelectedDecade} 
          />
          
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
      </div>
      
      <AlbumGrid albums={sortedAlbums} onReset={resetFilters} />
      
      <Footer />
    </DialogContent>
  );
};

export default Discography;
