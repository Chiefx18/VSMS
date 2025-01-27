import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import constants from '../../../constants';
import './revenue.css';

export default function Revenue() {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch revenue data
  useEffect(() => {
    const fetchDailyRevenue = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(constants.API_ROUTES.OPERATIONS.REVENUE, {
          headers: { Authorization: token },
        });
        setRevenueData(response.data.revenue); // Assuming revenue data is in `data.data`
        setLoading(false);
        console.log(response);
      } catch (err) {
        console.error('Error fetching revenue data:', err);
        setError('Failed to load revenue data');
        setLoading(false);
      }
    };

    fetchDailyRevenue();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="revenue-container">
      <h2 className="revenue-title">Daily Revenue Overview</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={revenueData}
          margin={{
            top: 20, // Reduced to prevent grid from overlapping
            right: 20,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" horizontal vertical={false} /> {/* Grid below chart */}
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: "#fff" }} 
            stroke="#fff"
            padding={{ left: 10, right: 10 }} 
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#fff" }}
            stroke="#fff" 
            allowDecimals={false} 
            domain={[0, 10000]} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#333", borderColor: "#666" }} 
            itemStyle={{ color: "#fff" }} 
          />
          <Line 
            type="monotone" 
            dataKey="totalRevenue" 
            stroke="#ffffff" 
            strokeWidth={2}
            dot={{ fill: "#82ca9d", r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
