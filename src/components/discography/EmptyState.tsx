
interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState = ({ onReset }: EmptyStateProps) => {
  return (
    <div className="text-center py-8 text-warm-600">
      <p>No albums found matching your search.</p>
      <button 
        onClick={onReset}
        className="mt-2 text-warm-800 underline"
      >
        Clear filters
      </button>
    </div>
  );
};

export default EmptyState;
