import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function TrendingList() {
  const [trending, setTrending] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onmessage = (msg) => {
      try {
        const alert = JSON.parse(msg.data);
        const { product_id, current, timestamp } = alert;

        setTrending((prev) => {
          const product = prev[product_id] || { current: 0, history: [], details: null };
          const minute = new Date(timestamp * 1000).toLocaleTimeString();

          const updatedHistory = [...product.history, { minute, count: current }];
          if (updatedHistory.length > 20) updatedHistory.shift(); // longer history for modal

          return {
            ...prev,
            [product_id]: { ...product, current, history: updatedHistory },
          };
        });
      } catch (e) {
        console.error("Failed to parse WS message:", e);
      }
    };

    return () => ws.close();
  }, []);

  const productEntries = Object.entries(trending);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-2">Trending Now</h2>
      {productEntries.length === 0 ? (
        <p>No trending products yet...</p>
      ) : (
        productEntries.map(([pid, data]) => (
          <ProductCard
            key={pid}
            product_id={pid}
            current={data.current}
            history={data.history}
            onClick={(p) => setSelected(p)}
          />
        ))
      )}

      {/* Modal */}
      {selected && (
        <ProductModal product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
