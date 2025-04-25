import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface MiniChartProps {
  data: number[];
  priceChange: number;
  height?: number;
  width?: number;
}

const MiniChart: React.FC<MiniChartProps> = ({
  data,
  priceChange,
  height = 50,
  width = 120,
}) => {
  const lineColor = priceChange >= 0 ? 'rgba(34, 197, 94, 1)' : 'rgba(239, 68, 68, 1)';
  const gradientColor = priceChange >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  
  const chartData = {
    labels: Array(data.length).fill(''),
    datasets: [
      {
        data,
        borderColor: lineColor,
        borderWidth: 2,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, height);
          gradient.addColorStop(0, gradientColor);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          return gradient;
        },
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        }
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
        min: Math.min(...data) * 0.999,
        max: Math.max(...data) * 1.001,
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 0,
      },
      line: {
        borderWidth: 1,
        capBezierPoints: true,
      }
    },
  };
  
  return (
    <div className="w-full h-full min-w-[120px]">
      <Line data={chartData} options={options} height={height} width={width} />
    </div>
  );
};

export default MiniChart