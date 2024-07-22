import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'
const TodayDate = defineComponent({
  name: 'TodayDate',
  setup() {
    const currentDate = new Date()
    const formatAsLocalDate = currentDate.toLocaleDateString(navigator.language, { dateStyle: 'long' })
    return {
      formatAsLocalDate,
    }
  },

  template: `
      <div>
        Сегодня {{ formatAsLocalDate }}
      </div>
    `,
})

createApp(TodayDate).mount('#app')
