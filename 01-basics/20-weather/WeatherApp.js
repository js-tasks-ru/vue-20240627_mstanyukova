import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  data() {
    return {
      weatherData: getWeatherData(),
    }
  },

  computed: {
    formattedWeatherData() {
      return this.weatherData.map(data => {
        const isNight = data.current.dt < data.current.sunrise || data.current.dt > data.current.sunset
        const celsiusTemperature = (data.current.temp - 273.15).toFixed(1)
        const pressureMMHg = (data.current.pressure * 0.75).toFixed(0)
        const weatherIcon = WeatherConditionIcons[data.current.weather.id]

        return {
          ...data,
          current: {
            ...data.current,
            isNight,
            celsiusTemperature,
            pressureMMHg,
            weatherIcon,
          },
        }
      })
    },
  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weather in formattedWeatherData" :class="['weather-card', { 'weather-card--night': weather.current.isNight }]">
        <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
            {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
            {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ weather.current.weatherIcon }}</div>
            <div class="weather-conditions__temp">{{ weather.current.celsiusTemperature }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ weather.current.pressureMMHg }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
