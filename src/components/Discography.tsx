
import { X } from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

type Album = {
  artist: string;
  title: string;
  year: number;
  notable?: boolean;
};

const Discography = () => {
  const [selectedDecade, setSelectedDecade] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const discographyByDecade: Record<string, Album[]> = {
    "1980s": [
      { artist: "Slayer", title: "Reign in Blood", year: 1986, notable: true },
      { artist: "Beastie Boys", title: "Licensed to Ill", year: 1986, notable: true },
      { artist: "Run-DMC", title: "Raising Hell", year: 1986, notable: true },
      { artist: "Public Enemy", title: "It Takes a Nation of Millions to Hold Us Back", year: 1988, notable: true },
      { artist: "Red Hot Chili Peppers", title: "Mother's Milk", year: 1989 },
    ],
    "1990s": [
      { artist: "Red Hot Chili Peppers", title: "Blood Sugar Sex Magik", year: 1991, notable: true },
      { artist: "Johnny Cash", title: "American Recordings", year: 1994, notable: true },
      { artist: "Mick Jagger", title: "Wandering Spirit", year: 1993 },
      { artist: "Tom Petty", title: "Wildflowers", year: 1994, notable: true },
      { artist: "Johnny Cash", title: "Unchained", year: 1996 },
      { artist: "System of a Down", title: "System of a Down", year: 1998 },
      { artist: "Red Hot Chili Peppers", title: "Californication", year: 1999, notable: true },
    ],
    "2000s": [
      { artist: "System of a Down", title: "Toxicity", year: 2001, notable: true },
      { artist: "Johnny Cash", title: "American III: Solitary Man", year: 2000 },
      { artist: "Johnny Cash", title: "American IV: The Man Comes Around", year: 2002, notable: true },
      { artist: "Jay-Z", title: "99 Problems (single)", year: 2003 },
      { artist: "Slipknot", title: "Vol. 3: The Subliminal Verses", year: 2004 },
      { artist: "Dixie Chicks", title: "Taking the Long Way", year: 2006, notable: true },
      { artist: "Metallica", title: "Death Magnetic", year: 2008 },
      { artist: "Linkin Park", title: "Minutes to Midnight", year: 2007 },
    ],
    "2010s": [
      { artist: "Adele", title: "21", year: 2011, notable: true },
      { artist: "Black Sabbath", title: "13", year: 2013 },
      { artist: "Kanye West", title: "Yeezus", year: 2013, notable: true },
      { artist: "Eminem", title: "The Marshall Mathers LP 2", year: 2013 },
      { artist: "Lady Gaga", title: "Joanne", year: 2016 },
      { artist: "Eminem", title: "Revival", year: 2017 },
      { artist: "Smashing Pumpkins", title: "Shiny and Oh So Bright", year: 2018 },
    ],
    "2020s": [
      { artist: "The Strokes", title: "The New Abnormal", year: 2020, notable: true },
      { artist: "Ozzy Osbourne", title: "Ordinary Man", year: 2020 },
      { artist: "Red Hot Chili Peppers", title: "Unlimited Love", year: 2022 },
      { artist: "Red Hot Chili Peppers", title: "Return of the Dream Canteen", year: 2022 },
      { artist: "Brandi Carlile", title: "In the Canyon Haze", year: 2022 },
    ],
  };

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

  return (
    <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-auto bg-[#E8E6E1]">
      <DialogHeader>
        <DialogTitle className="text-center font-serif text-2xl text-warm-900">Rick Rubin Discography</DialogTitle>
      </DialogHeader>
      
      <div className="w-full mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <button
              onClick={() => setSelectedDecade("all")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedDecade === "all" 
                  ? "bg-warm-600 text-white" 
                  : "bg-warm-200 text-warm-800 hover:bg-warm-300"
              }`}
            >
              All
            </button>
            {decades.map(decade => (
              <button
                key={decade}
                onClick={() => setSelectedDecade(decade)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedDecade === decade 
                    ? "bg-warm-600 text-white" 
                    : "bg-warm-200 text-warm-800 hover:bg-warm-300"
                }`}
              >
                {decade}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search artists or albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[250px] px-4 py-2 rounded-lg border border-warm-300 bg-warm-50 focus:outline-none focus:ring-2 focus:ring-warm-500"
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedAlbums.map((album, index) => (
          <div 
            key={`${album.artist}-${album.title}`}
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
        ))}
      </div>
      
      {sortedAlbums.length === 0 && (
        <div className="text-center py-8 text-warm-600">
          <p>No albums found matching your search.</p>
          <button 
            onClick={() => {
              setSearchTerm("");
              setSelectedDecade("all");
            }}
            className="mt-2 text-warm-800 underline"
          >
            Clear filters
          </button>
        </div>
      )}
      
      <div className="mt-6 text-sm text-warm-600 text-center">
        <p>This is a curated selection of Rick Rubin's extensive production work.</p>
        <p>For a complete list, visit <a href="https://en.wikipedia.org/wiki/Rick_Rubin_production_discography" target="_blank" rel="noopener noreferrer" className="underline">Wikipedia</a>.</p>
      </div>
    </DialogContent>
  );
};

export default Discography;
