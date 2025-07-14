<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow p-6 text-center">
        <div class="text-3xl font-bold text-blue-600">{{ stats.totalStudents ?? '...' }}</div>
        <div class="text-gray-600 mt-2">Total Students</div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Score Levels</h3>
        <ScoreBarChart v-if="chartData" :data="chartData" :options="chartOptions" />
      </div>
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><router-link to="/search" class="text-blue-600 hover:underline">Search Scores</router-link></li>
          <li><router-link to="/report" class="text-blue-600 hover:underline">Reports</router-link></li>
          <li><router-link to="/top10" class="text-blue-600 hover:underline">Top 10 Group A</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/services/api';
import { onMounted, ref } from 'vue';
import ScoreBarChart from '@/components/charts/ScoreBarChart.vue';
import type { ChartOptions } from 'chart.js';

const stats = ref<{ totalStudents: number | null }>(
  { totalStudents: null }
);

const chartData = ref<any>(null);
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true, beginAtZero: true },
  },
};

onMounted(async () => {
  // Get total students
  const overviewRes = await api.get('/report/overview')
  stats.value.totalStudents = overviewRes.data.data.totalStudents

  // Get score level stats
  const levelRes = await api.get('/report/score-level')
  const levels = levelRes.data.data;
  chartData.value = {
    labels: ['Excellent (>=8)', 'Good (6-8)', 'Average (4-6)', 'Poor (<4)'],
    datasets: [
      {
        label: 'Students',
        data: [levels.excellentCount, levels.goodCount, levels.averageCount, levels.poorCount],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      },
    ],
  };
});
</script>
