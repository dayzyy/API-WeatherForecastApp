import API_KEY from "../constants/weatherApiKey"

const fetch_weather = async location => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`)
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      return data
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
