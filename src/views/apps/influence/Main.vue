<template>
  <section id="apps-influence">
    <influence-list />
  </section>
</template>

<script>
// import { BRow, BCol } from 'bootstrap-vue'

// import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
import InfluenceList from '@/views/apps/influence/List.vue'
// import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
// import AnalyticsAvgSessions from './AnalyticsAvgSessions.vue'
// import AnalyticsSupportTracker from './AnalyticsSupportTracker.vue'
// import AnalyticsTimeline from './AnalyticsTimeline.vue'
// import AnalyticsSalesRadarChart from './AnalyticsSalesRadarChart.vue'
// import AnalyticsAppDesign from './AnalyticsAppDesign.vue'

export default {
  components: {
    // BRow,
    // BCol,
    // AnalyticsCongratulation,
    // AnalyticsAvgSessions,
    // StatisticCardWithAreaChart,
    // AnalyticsSupportTracker,
    // AnalyticsTimeline,
    // AnalyticsSalesRadarChart,
    // AnalyticsAppDesign,
    InfluenceList,
  },
  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/analytics/data')
      .then(response => { this.data = response.data })
  },
  methods: {
    kFormatter,
  },
}
</script>
