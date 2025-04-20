import { cn } from "@/lib/utils";
import React from "react";

type SkeletonProps = {
  className?: string;
};

const CommonSkeleton = ({ className }: SkeletonProps) => {
  return (
    <div className={cn("animate-pulse bg-mutetColor rounded-md", className)} />
  );
};
export default CommonSkeleton;
