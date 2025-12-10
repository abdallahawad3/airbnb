"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect, type FC } from "react";

interface ErrorProps {
  error: Error;
}

const ErrorState: FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Uh oh! Something went wrong!"
      subtitle="Please try again later."
    />
  );
};

export default ErrorState;
