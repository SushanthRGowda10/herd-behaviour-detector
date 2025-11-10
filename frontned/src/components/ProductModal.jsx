import React from "react";
import TrendChart from "./TrendChart";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <div className="flex space-x-6">
          {/* Product image */}
          <img
            src={product.details?.images?.[0]}
            alt={product.details?.title}
            className="w-48 h-48 object-cover rounded"
          />

          {/* Product info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{product.details?.title}</h2>
            <p className="text-gray-600 mb-2">#{product.product_id}</p>
            <p className="mb-2">{product.details?.description}</p>
            <p className="text-lg font-semibold text-green-600">
              ${product.details?.price}
            </p>
            <p className="text-red-600 font-bold mt-2">
              {product.current} views/min
            </p>
          </div>
        </div>

        {/* Bigger chart */}
        <div className="mt-6 h-64">
          <TrendChart data={product.history} />
        </div>
      </div>
    </div>
  );
}
