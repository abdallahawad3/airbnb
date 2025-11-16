"use client";

import { useRouter } from "next/navigation";
import Heading from "./ui/Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showRest?: boolean;
}

const EmptyState = ({
  showRest,
  subtitle = "Try changing your search or filter to find what you're looking for.",
  title = "No exact matches found",
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subtitle} center={true} />
      <div className="w-48 mt-4">
        {showRest && (
          <button
            onClick={() => router.push("/")}
            className="px-4 cursor-pointer py-2 w-full text-center text-white bg-neutral-800 rounded-md hover:bg-neutral-900 transition"
          >
            Remove all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
