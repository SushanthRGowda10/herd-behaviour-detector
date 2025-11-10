import React, { useEffect, useState } from "react";
import TrendChart from "./TrendChart";

export default function ProductCard({ product_id, current, history, onClick }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const resp = await fetch(`https://api.escuelajs.co/api/v1/products/${product_id}`);
        const data = await resp.json();
        setDetails(data);
      } catch (e) {
        console.error("Failed to fetch product details:", e);
      }
    }
    fetchDetails();
  }, [product_id]);

  return (
    <div
      onClick={() => onClick({ product_id, current, history, details })}
      className="bg-white rounded-xl shadow p-4 space-y-3 cursor-pointer hover:shadow-lg transition"
    >
      {details ? (
        <div className="flex items-center space-x-4">
          <img
            src={details.images?.[0]}
            alt={details.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{details.title}</h3>
            <p className="text-sm text-gray-600">#{product_id}</p>
          </div>
          <span className="ml-auto text-red-600 font-bold">
            {current} views/min
          </span>
        </div>
      ) : (
        <p>Loading product #{product_id}...</p>
      )}

      {/* Small chart */}
      <TrendChart data={history} />
    </div>
  );
}
