import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getRateData } from "src/services/rateServices";
import { formatData } from "src/utils/formatData";
import { formatXAxis } from "src/utils/formatXAxis";

export type TickData = {
  timestamp: Date;
  conversionRate: number;
};

export const RateChart: React.FC = () => {
  const [data, setData] = useState<TickData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [waitingForData, setWaitingForData] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const rateData = await getRateData();
      const formattedData: TickData[] = rateData.map((rate: TickData) => ({
        timestamp: new Date(rate.timestamp),
        conversionRate: rate.conversionRate,
      }));

      setData(formattedData);
      if (formattedData.length > 0) {
        setWaitingForData(false);
      }
    } catch (error) {
      console.error("Error fetching rate data:", error);
      setError("Failed to fetch rate data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (waitingForData) {
    return (
      <p>Waiting for the first data point, please wait a few seconds...</p>
    );
  }

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            tick={{
              fill: "#4B5563",
              fontSize: 12,
            }}
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis
            tickFormatter={(value) => formatData(value)}
            tick={{ fill: "#4B5563", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Legend />
          <Line type="monotone" dataKey="conversionRate" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        <b>Note:</b>
        <p>
          The total supply for this contract is currently 0. Therefore, we are
          hardcoding random values for total supply from the backend API to make
          the data visualization possible.
        </p>
        <p>
          Since there is no database, the backend uses an in-memory array which
          is populated by a cron job scheduled to run every 1 minute to collect
          new data.
        </p>
      </div>
    </div>
  );
};
