<template>
  <div class="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow">
    <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Score Statistics by Subject</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, type ChartOptions } from 'chart.js';
import { ref, onMounted } from 'vue';
import api from '@/services/api';

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartData = ref<ChartData>({
  labels: [],
  datasets: [],
});

// ✅ Định nghĩa options chuẩn type
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // không phải string tự do nữa
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true },
  },
};

onMounted(async () => {
  const res = await api.get('/report/chart-data');
  // Backend returns { data: { subjectScoreLevels: [...] } }
  const levels = res.data.data.subjectScoreLevels;

  // Map backend levels to chart ranges
  const levelToRange: Record<string, string> = {
    EXCELLENT: '>=8',
    GOOD: '6-8',
    AVERAGE: '4-6',
    POOR: '<4',
  };
  const ranges = [">=8", "6-8", "4-6", "<4"];
  const colors: Record<string, string> = {
    ">=8": "#3b82f6",
    "6-8": "#10b981",
    "4-6": "#f59e0b",
    "<4": "#ef4444",
  };

  // Get all unique subjects
  const subjects: string[] = Array.from(new Set(levels.map((item: any) => item.subjectName)));

  // Build a map: subject -> { range -> count }
  const subjectMap: Record<string, Record<string, number>> = {};
  for (const item of levels) {
    const subject = item.subjectName;
    const range = levelToRange[item.level];
    if (!subjectMap[subject]) subjectMap[subject] = {};
    subjectMap[subject][range] = item.count;
  }

  chartData.value = {
    labels: subjects,
    datasets: ranges.map((range) => ({
      label: range,
      data: subjects.map((subject: string) => subjectMap[subject]?.[range] ?? 0),
      backgroundColor: colors[range],
    })),
  };
});
</script>
