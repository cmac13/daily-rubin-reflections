
interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <div className="w-full md:w-auto">
      <input
        type="text"
        placeholder="Search artists or albums..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full md:w-[250px] px-4 py-2 rounded-lg border border-warm-300 bg-warm-50 focus:outline-none focus:ring-2 focus:ring-warm-500"
      />
    </div>
  );
};

export default SearchBar;
