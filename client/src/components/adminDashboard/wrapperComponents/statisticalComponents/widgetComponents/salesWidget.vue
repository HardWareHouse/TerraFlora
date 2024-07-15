<template>
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Ventes Mensuelles</h3>
        
        <div ref="chartContainer" class="chart-container"></div>
      </div>
    </div>
</template>
  
<script>
  import * as echarts from 'echarts/core';
  import { LineChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
  } from 'echarts/components';
  import { CanvasRenderer } from 'echarts/renderers';
  
  echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
  );
  
  export default {
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const chart = echarts.init(this.$refs.chartContainer);
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
        chart.setOption(options);
      },
    },
  };
</script>
  
<style scoped>
  .chart-container {
    height: 300px;
  }
</style>
  