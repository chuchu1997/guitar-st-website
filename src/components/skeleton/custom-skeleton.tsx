import { Skeleton } from "@/components/ui/skeleton";


interface SkeletonProps {
  loading: boolean;
  option: 'article' | 'image';
}

const CustomSkeleton: React.FC<SkeletonProps> = ({ loading, option }) => {
  if (!loading) return null;

  return (
    <div className="space-y-4 h-full">
      {option === 'image' ? (
        <div className="relative w-full h-64">
          <Skeleton className="absolute inset-0 w-full h-full" /> 12321
        </div>
      ) : (
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
    </div>
  );
};

export default CustomSkeleton;