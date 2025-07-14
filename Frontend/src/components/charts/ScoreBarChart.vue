<template>
  <Bar v-if="data" :data="data" :options="options" />
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

defineProps<{
  data: any,
  options: ChartOptions<'bar'>
}>();
</script>
