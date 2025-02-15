import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaSun, FaCloud, FaSmog, FaCloudShowersHeavy, FaSnowflake, FaBolt } from "react-icons/fa";
import { IoMdRainy, IoMdThunderstorm } from "react-icons/io";
import { MdCloudQueue } from "react-icons/md";
import { WiDayRainMix, WiRaindrops, WiSnowflakeCold, WiDust, WiSandstorm } from "react-icons/wi";

import { IoCloudOffline } from "react-icons/io5";

import StatisticsRow from "../components/StatisticsRow";
import Loading from "../components/Loading";

export default function WeatherInfoPage() {
  const { location } = useParams()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')

  const API_KEY = '42347113b25445f7a10134438251402'

  useEffect(_ => {
    const fetchWeather = async _ => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
        const data = await response.json()
        console.log(data)

        if (response.ok) {
          const weather_info = {
            condition: data.current.condition.text,
            temperature: data.current.temp_c,
            feels_like: data.current.feelslike_c,
            humidity: data.current.humidity,
            wind_speed: data.current.wind_kph,
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            sunset: data.forecast.forecastday[0].astro.sunset,
            location: `${data.location.name}/${data.location.country}`
          }
          setInfo(weather_info)
        }
        else if (response.status === 400){
          setError(data.error.message)
        }
        else {
          throw new Error(data.error.message || 'Failed to fetch weather')
        }
        }
      catch (error) {
        console.error(error)
      }
    }

    fetchWeather()
  }, [location])

  const weather_icons = {
      "sunny": <FaSun />, 
      "clear": <FaSun />, 
      "partly cloudy": <FaCloud />, 
      "cloudy": <FaCloud />, 
      "overcast": <MdCloudQueue />, 
      "mist": <FaSmog />, 
      "patchy rain possible": <WiDayRainMix />, 
      "light rain": <IoMdRainy />, 
      "moderate rain": <IoMdRainy />, 
      "heavy rain": <FaCloudShowersHeavy />, 
      "torrential rain shower": <FaCloudShowersHeavy />, 
      "patchy light drizzle": <WiRaindrops />, 
      "light drizzle": <WiRaindrops />, 
      "freezing drizzle": <WiRaindrops />, 
      "heavy freezing drizzle": <WiRaindrops />, 
      "patchy light rain": <IoMdRainy />, 
      "light rain shower": <IoMdRainy />, 
      "moderate or heavy rain shower": <FaCloudShowersHeavy />, 
      "patchy light rain with thunder": <IoMdThunderstorm />, 
      "moderate or heavy rain with thunder": <IoMdThunderstorm />, 
      "patchy snow possible": <FaSnowflake />, 
      "light snow": <WiSnowflakeCold />, 
      "moderate snow": <WiSnowflakeCold />, 
      "heavy snow": <WiSnowflakeCold />, 
      "blizzard": <WiSnowflakeCold />, 
      "blowing snow": <WiSnowflakeCold />, 
      "patchy sleet possible": <FaSnowflake />, 
      "light sleet": <FaSnowflake />, 
      "moderate or heavy sleet": <FaSnowflake />, 
      "ice pellets": <FaSnowflake />, 
      "light sleet showers": <FaSnowflake />, 
      "moderate or heavy sleet showers": <FaSnowflake />, 
      "light snow showers": <WiSnowflakeCold />, 
      "moderate or heavy snow showers": <WiSnowflakeCold />, 
      "light showers of ice pellets": <FaSnowflake />, 
      "moderate or heavy showers of ice pellets": <FaSnowflake />, 
      "thundery outbreaks possible": <IoMdThunderstorm />, 
      "fog": <FaSmog />, 
      "freezing fog": <FaSmog />, 
      "dust": <WiDust />, 
      "sand": <WiSandstorm />, 
      "windy": <FaBolt />
  }

  return (
    <div className= "rounded-[20px] md:py-4 md:px-12 md:bg-[var(--color-bg-secondary)] flex flex-col items-center gap-10">
      <p className="text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>{info ? info.location : location}</p>

      {error && <p className="text-[var(--color-text-secondary)]" style={{fontSize: "var(--text-body-primary)"}}>{error}</p>}

      {!info && !error &&
        <div className="w-full flex-grow grid place-items-center">
          <Loading/>
        </div>
      }

      {info &&
        <div className="flex flex-col gap-10">
            <div className="w-fit flex gap-10">
              <div className="text-[8rem] text-white">
                {weather_icons[info.condition.toLowerCase()] || <IoCloudOffline/>}
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <StatisticsRow asset='Condition' value={info.condition}/>
                <StatisticsRow asset='Tempreture' value={`${info.temperature}°`}/>
                <StatisticsRow asset='Feels like' value={`${info.feels_like}°`}/>
              </div>
            </div>

            <div className="self-start flex flex-col gap-2 justify-center">
              <StatisticsRow asset='Humidity' value={info.humidity}/>
              <StatisticsRow asset='Wind speed' value={`${info.wind_speed} km/h`}/>
              <StatisticsRow asset='Sun rise/set' value={`${info.sunrise} / ${info.sunset}`}/>
            </div>
        </div>
      }
    </div>
  )
}
