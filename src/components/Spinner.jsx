import React from "react";

export const Spinner = () => {
  return (
    <div role="status" className="flex justify-center items-center py-10">
      <svg
        aria-hidden="true"
        className="w-8 h-8 sm:w-10 sm:h-10 text-blue-200 animate-spin fill-blue-400"
        viewBox="0 0 100 101"
        fill="none"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591..."
          fill="currentColor"
        />
        <path d="M93.9676 39.0409C96.393 38.4038..." fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
