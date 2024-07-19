<template>
  <div class="stock-chart-container">
    <div class="filter-container">
      <div class="date-picker">
        <label for="startDate">Date de début:</label>
        <input type="date" id="startDate" v-model="startDate" @change="fetchStockHistory" />
      </div>
      <div class="date-picker">
        <label for="endDate">Date de fin:</label>
        <input type="date" id="endDate" v-model="endDate" @change="fetchStockHistory" />
      </div>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  props: {
    produitId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      startDate: '',
      endDate: '',
    };
  },
  async mounted() {
    this.chart = echarts.init(this.$refs.chart);
    await this.fetchStockHistory();
  },
  watch: {
    produitId: 'fetchStockHistory'
  },
  methods: {
    async fetchStockHistory() {
      try {
        const params = {};
        if (this.startDate) {
          params.startDate = this.startDate;
        }
        if (this.endDate) {
          params.endDate = this.endDate;
        }

        const response = await axios.get(`http://localhost:8000/product/${this.produitId}/history`, { params });
        const history = response.data;

        const dates = history.map(entry => new Date(entry.date).toLocaleString());
        const stocks = history.map(entry => entry.stock);

        this.chart.setOption({
          title: {
            text: 'Évolution des stocks',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: dates,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: stocks,
              type: 'line',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching stock history:', error);
      }
    },
  },
};
</script>

<style scoped>
.stock-chart-container {
  width: 100%;
  margin-top: 20px;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.date-picker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 10px;
}

.date-picker label {
  margin-bottom: 5px;
  font-weight: bold;
}

.chart {
  width: 100%;
  height: 400px;
}
</style>
