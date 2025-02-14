import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaSun, FaCloudSun, FaCloud, FaCloudShowersHeavy, FaBolt, FaSnowflake, FaSmog } from 'react-icons/fa';
import { MdCloudQueue } from 'react-icons/md';
import { IoMdRainy, IoMdThunderstorm } from 'react-icons/io';
import { WiDust } from 'react-icons/wi';
import { IoCloudOffline } from "react-icons/io5";

import StatisticsRow from "../components/StatisticsRow";
import Loading from "../components/Loading";

export default function WeatherInfoPage() {
  const { location } = useParams()
  const [info, setInfo] = useState(null)

  const API_KEY = '42347113b25445f7a10134438251402'

  useEffect(_ => {
    const fetchWeather = async _ => {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=1&aqi=no&alerts=no`)
        const data = await response.json()
        console.log(data)

        if (response.ok) {
          const weather_info = {
            temperature: data.current.temp_c,
            feels_like: data.current.feelslike_c,
            humidity: data.current.humidity,
            wind_speed: data.current.wind_kph,
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            sunset: data.forecast.forecastday[0].astro.sunset,
            condition: data.forecast.forecastday[0].day.condition.text,
            condition_icon: data.forecast.forecastday[0].day.condition.icon,
            location: `${data.location.name}/${data.location.country}`
          }
          setInfo(weather_info)
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
    "Clear": <FaSun />,                  // Sun for clear
    "Partly cloudy": <FaCloudSun />,     // Cloud with sun for partly cloudy
    "Cloudy": <FaCloud />,              // Cloud for cloudy
    "Overcast": <MdCloudQueue />,        // Overcast cloud
    "Mist": <FaSmog />,                 // Mist for foggy weather
    "Fog": <FaSmog />,                  // Fog also has a smog icon
    "Patchy rain possible": <IoMdRainy />,  // Light rain
    "Light rain shower": <IoMdRainy />,  // Light rain shower
    "Moderate rain": <IoMdRainy />,     // Moderate rain
    "Heavy rain": <FaCloudShowersHeavy />,  // Heavy rain cloud
    "Thunderstorm": <IoMdThunderstorm />,  // Thunderstorm icon
    "Snow": <FaSnowflake />,            // Snowflake for snow
    "Sleet": <FaSnowflake />,           // Sleet can also use snowflake
    "Hail": <FaSnowflake />,            // Hail also uses snowflake for the icon
    "Dust": <WiDust />,              // Dust storm icon
    "Sand": <WiDust />,              // Sand storm
    "Windy": <FaBolt />,                // Wind can be associated with a bolt
    "Foggy": <FaSmog />,                // Fog can also be depicted with smog
    "Drizzle": <IoMdRainy />,           // Light rain, drizzle
    "Freezing drizzle": <IoMdRainy />,  // Freezing drizzle also uses rain icon
    "Showers of rain": <FaCloudShowersHeavy />,  // Showers of rain
  }

  return (
    <div className= "rounded-[20px] md:py-4 md:px-12 md:bg-[var(--color-bg-secondary)] flex flex-col items-center gap-10">
      <p className="text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>{info ? info.location : location}</p>

      {!info && 
        <div className="w-full flex-grow grid place-items-center">
          <Loading/>
        </div>
      }

      {info &&
        <div className="flex flex-col gap-10">
            <div className="w-fit flex gap-10">
              <div className="text-[8rem] text-white">
                {weather_icons[info.condition] || <IoCloudOffline/>}
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
