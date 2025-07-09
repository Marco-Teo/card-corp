"use client";

import CardList from "./CardList";

export default function Main() {
  return (
    <div className="bg-white">
      <div className="container mx-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CardList />
      </div>
    </div>
  );
}
