import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import StatisticsRow from "../components/StatisticsRow";
import Loading from "../components/Loading";
import WeatherCard from "../components/WeatherCard";

import fetch_weather from "../services/weatherService";

import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import { IoCloudOffline } from "react-icons/io5";
import WEATHER_ICONS from "../constants/weatherIcons";

export default function WeatherInfoPage() {
  const { location } = useParams()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')
  const [pageTracker, setPageTracker] = useState(-1)
  const [days, setDays] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(_ => {
    const get_weather = async _ => {
      try {
        const data = await fetch_weather(location, days)
        setInfo(data)
        if (loading) setLoading(false)
      }
      catch (err) {
        setError(err.message)
      }
    }

    get_weather()
  }, [location, days])
  
  let forecastDays = null
  if (info && info.forecast.forecastday.length > 1) {
    forecastDays = [...info.forecast.forecastday]
    forecastDays.shift()
  }

  return (
    <div className="relative flex flex-col gap-4">
      {!info &&
        <div className="rounded-[20px] md:w-[300px] md:h-[300px] md:py-4 md:px-12 md:bg-[var(--color-bg-secondary)] grid place-items-center gap-10">
          <p className="text-[var(--color-text-primary)] font-bold" style={{fontSize: "var(--text-heading-secondary)"}}>{location}</p>
          {!error && <Loading/>}
          {error && <p className="text-[var(--color-text-secondary)]" style={{fontSize: "var(--text-body-primary)"}}>{error}</p>}
        </div>
      }

      {info && 
        <WeatherCard
          location={`${info.location.country}/${info.location.name}`}
          date={`Today, ${new Date(info.forecast.forecastday[0].date).toLocaleString('en-US', {weekday: 'long'})}`}
          icon={WEATHER_ICONS[info.current.condition.text.toLowerCase()] || <IoCloudOffline/>}
          main_rows={[
            <StatisticsRow asset='Condition' value={info.current.condition.text}/>,
            <StatisticsRow asset='Temprture' value={`${info.current.temp_c}°`}/>,
            <StatisticsRow asset='Feels like' value={`${info.current.feelslike_c}°`}/>
          ]}
          additional_rows={[
            <StatisticsRow asset='Humidity' value={info.current.humidity}/>,
            <StatisticsRow asset='Wind speed' value={`${info.current.wind_kph} km/h`}/>,
            <StatisticsRow asset='Sun rise/set' value={`${info.forecast.forecastday[0].astro.sunrise}/${info.forecast.forecastday[0].astro.sunset}`}/>
          ]}
          focused={pageTracker === -1}
        />
      }

      {forecastDays &&
        forecastDays.map((fr, index) => {
          return (
            <WeatherCard 
              key={fr.date}
              location={`${info.location.country}/${info.location.name}`}
              date={`${forecastDays[index].date}, ${new Date(forecastDays[index].date).toLocaleString('en-US', {weekday: 'long'})}`}
              icon={WEATHER_ICONS[fr.day.condition.text.toLowerCase()] || <IoCloudOffline/>}
              main_rows={[
                <StatisticsRow asset='Condition' value={fr.day.condition.text}/>,
                <StatisticsRow asset='Tempreture' value={`${fr.day.avgtemp_c}°`}/>,
              ]}
              additional_rows={[
                <StatisticsRow asset='Humidity' value={fr.day.avghumidity}/>,
                <StatisticsRow asset='Wind speed' value={`${fr.day.maxwind_kph} km/h`}/>,
                <StatisticsRow asset='Sun rise/set' value={`${info.forecast.forecastday[index].astro.sunrise}/${info.forecast.forecastday[index].astro.sunset}`}/>
              ]}
              focused={pageTracker === index}
            />
          )
        })
      }

      {info && info.forecast.forecastday.length <= 1 &&
        <button className="text-[var(--color-text-primary)] border border-[#6B6B6B] p-2 rounded-2xl self-end cursor-pointer hover:bg-[var(--color-bg-secondary)]"
          style={{fontSize: 'var(--text-body-secondary)'}}
          onClick={_ => {setLoading(true), setDays(7)}}
        >
          {!loading && 'this week'}
          {loading && <Loading/>}
        </button>
      }

      {info && info.forecast.forecastday.length > 1 &&
        <div className="self-center flex gap-5">
          {pageTracker != -1 && <MdNavigateBefore onClick={_ => setPageTracker(prev => prev - 1)} className="text-[3rem] text-[var(--color-text-secondary)] cursor-pointer"/>}
          {pageTracker != 5 && <MdNavigateNext onClick={_ => setPageTracker(prev => prev + 1)} className="text-[3rem] text-[var(--color-text-secondary)] cursor-pointer"/>}
        </div>
      }
    </div>
  )
}
