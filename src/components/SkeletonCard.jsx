export default function SkeletonCard() {
  return (
    <div className="animate-pulse border rounded p-4">
      <div className="h-40 bg-gray-200 mb-3"></div>
      <div className="h-4 bg-gray-200 mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-200 w-1/2"></div>
    </div>
  );
}