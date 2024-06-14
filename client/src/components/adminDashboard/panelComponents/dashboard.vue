<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <div class="px-6 py-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Graphique 1</h3>
          <div ref="chart1" class="chart-container"></div>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">Graphique 2</h3>
          <div ref="chart2" class="chart-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { LineChart, BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, BarChart, CanvasRenderer]
);

export default {
  mounted() {
    this.renderChart1();
    this.renderChart2();
  },
  methods: {
    renderChart1() {
      const chart1 = echarts.init(this.$refs.chart1);
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [1500, 2200, 1800, 2500, 2000, 2800, 3000, 3200, 2800, 2400, 2100, 1900],
          type: 'line',
          itemStyle: {
            color: '#3182CE',
          },
        }],
      };
      chart1.setOption(options);
    },
    renderChart2() {
      const chart2 = echarts.init(this.$refs.chart2);
      const options = {
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [800, 1200, 900, 1500, 1100, 1400, 1600, 1700, 1400, 1300, 1000, 900],
          type: 'bar',
          itemStyle: {
            color: '#4A5568',
          },
        }],
      };
      chart2.setOption(options);
    },
  },
};
</script>

<style scoped>
.chart-container {
  height: 300px; /* Hauteur des graphiques */
}
</style>
