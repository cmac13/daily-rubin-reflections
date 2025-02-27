
interface DecadeFilterProps {
  decades: string[];
  selectedDecade: string;
  onDecadeChange: (decade: string) => void;
}

const DecadeFilter = ({ decades, selectedDecade, onDecadeChange }: DecadeFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-2">
      <button
        onClick={() => onDecadeChange("all")}
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
          onClick={() => onDecadeChange(decade)}
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
  );
};

export default DecadeFilter;
