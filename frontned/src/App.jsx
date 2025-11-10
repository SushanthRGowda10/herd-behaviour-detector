import React from "react";
import TrendingList from "./components/TrendingList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Herd Behavior Dashboard
      </header>
      <main className="p-6">
        <TrendingList />
      </main>
    </div>
  );
}

export default App;
