import { Line, mixins } from 'vue-chartjs'

export default Line.extend({
  name: 'LineChart',

  mixins: [mixins.reactiveProp],

  props: {
    chartData: {
      type: Object,
      // required: true,
      // TODO: Remove demo data
      default () {
        return {
          labels: ['label 1', 'label 2', 'label 3'],
          datasets: [
            {
              data: [300, 500, 1500]
            }
          ]
        }
      },
      validator (data) {
        return data.hasOwnProperty('labels') &&
          data.hasOwnProperty('datasets') &&
          Array.isArray(data.labels) &&
          Array.isArray(data.datasets)
      }
    },
    options: {
      type: Object
      // required: true
    }
  },

  mounted () {
    // default options to make chart easy to style
    const chartoption = Object.assign({
      // make chart adapt to container element
      responsive: true,
      maintainAspectRatio: false,
      // remove labels of datasets
      legend: {
        display: false
      },
      // simplify tooltips string when cursor hover on chart point
      tooltips: {
        callbacks: {
          label (tooltipItem) {
            return tooltipItem.yLabel
          }
        }
      }
    }, this.options)
    this.renderChart(this.chartData, chartoption)
  }
})
