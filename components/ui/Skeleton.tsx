import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200';
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white overflow-hidden group">
      <div className="relative aspect-[3/4] bg-gray-200 animate-pulse" />
      
      <div className="p-6 space-y-3">
        <Skeleton variant="text" className="h-6 w-3/4" />
        <Skeleton variant="text" className="h-4 w-1/2" />
        <Skeleton variant="text" className="h-5 w-1/4" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex gap-2">
          <Skeleton variant="text" className="h-4 w-32" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
              <Skeleton className="aspect-square" />
            </div>
          </div>

          {/* Details Skeleton */}
          <div className="space-y-6">
            <Skeleton variant="text" className="h-10 w-3/4" />
            <Skeleton variant="text" className="h-6 w-1/4" />
            <Skeleton variant="text" className="h-4 w-full" />
            <Skeleton variant="text" className="h-4 w-5/6" />
            
            <div className="space-y-4">
              <Skeleton variant="text" className="h-5 w-32" />
              <div className="flex gap-3">
                <Skeleton variant="circular" width={48} height={48} />
                <Skeleton variant="circular" width={48} height={48} />
                <Skeleton variant="circular" width={48} height={48} />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton variant="text" className="h-5 w-24" />
              <div className="flex gap-3">
                <Skeleton className="h-12 w-20" />
                <Skeleton className="h-12 w-20" />
                <Skeleton className="h-12 w-20" />
              </div>
            </div>

            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopPageSkeleton() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
          <Skeleton variant="text" className="h-12 w-48 mb-4" />
          <Skeleton variant="text" className="h-5 w-96" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <Skeleton variant="text" className="h-5 w-40" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
