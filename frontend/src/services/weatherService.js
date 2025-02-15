import API_KEY from "../constants/weatherApiKey"

const fetch_weather = async location => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
    const data = await response.json()

    if (response.ok) {
      return {
        condition: data.current.condition.text,
        temperature: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph,
        sunrise: data.forecast.forecastday[0].astro.sunrise,
        sunset: data.forecast.forecastday[0].astro.sunset,
        location: `${data.location.name}/${data.location.country}`
      }
    }
    else if (response.status === 400){
      throw new Error(data.error.message)
    }
    else {
      throw new Error(data.error.message || 'Failed to fetch weather')
    }
  }
  catch (error) {
    throw error
  }
}

export default fetch_weather
