"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VlaXV0dHRlNHQyOXRpNW8wZHYzajNhOTB4OXB5anBlYWU4MzBicSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/DzeKll1HYxiYo/giphy.gif"
        alt="Loading…"
        className="w-20 h-20 object-contain"
      />
    </div>
  );
}
