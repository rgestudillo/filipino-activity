"use client"

import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Demographics() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/demographics")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  if (!data) return <div>Loading...</div>

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Demographics",
      },
    },
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Demographics of Participants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Age Distribution</h3>
          <Bar options={options} data={data.ageData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Gender Distribution</h3>
          <Bar options={options} data={data.genderData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Education Level</h3>
          <Bar options={options} data={data.educationData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Top Schools</h3>
          <Bar options={options} data={data.schoolData} />
        </div>
      </div>
    </div>
  )
}

