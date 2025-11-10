import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TrendChart({ data }) {
  if (!data || data.length === 0) return <p>No activity data yet.</p>;

  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <XAxis dataKey="minute" hide />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
