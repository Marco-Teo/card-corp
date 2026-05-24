"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div
        className="h-14 w-14 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700"
        role="status"
        aria-label="Caricamento"
      />
    </div>
  );
}
