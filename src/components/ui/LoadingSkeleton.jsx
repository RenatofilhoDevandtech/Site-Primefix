const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pr-black to-pr-gray-dark/30">
      {/* Hero Carousel Skeleton */}
      <div className="h-[56.25vw] min-h-[400px] max-h-[95vh] w-full bg-pr-border/10 animate-pulse"></div>
      
      {/* Content Skeleton */}
      <div className="py-12 space-y-12">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="h-8 w-48 bg-pr-border/10 rounded-lg ml-4 md:ml-6 lg:ml-8 animate-pulse"></div>
            <div className="flex space-x-4 px-4 md:px-6 lg:px-8 overflow-x-hidden">
              {[...Array(6)].map((_, cardIndex) => (
                <div key={cardIndex} className="flex-shrink-0 w-48 aspect-[2/3] bg-pr-border/10 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;