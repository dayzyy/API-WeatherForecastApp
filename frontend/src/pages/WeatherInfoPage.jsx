import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import StatisticsRow from "../components/StatisticsRow";
import Loading from "../components/Loading";

import WEATHER_ICONS from "../constants/weatherIcons";
import fetch_weather from "../services/weatherService";

import { IoMdArrowBack, IoMdArrowRoundBack } from "react-icons/io";
import { FaBackspace } from "react-icons/fa";
import { IoIosBackspace } from "react-icons/io";
import { IoCloudOffline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

export default function WeatherInfoPage() {
  const { location } = useParams()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')
  const [pageTracker, setPageTracker] = useState(0)
  const navigate = useNavigate()

  useEffect(_ => {
    const get_weatcher = async _ => {
      try {
        const data = await fetch_weather(location)
        setInfo(data)
      }
      catch (err) {
        setError(err.message)
      }
    }

    get_weatcher()
  }, [location])


  return (
    <div className="flex flex-col gap-5">
      <div className= "rounded-[20px] md:py-4 md:px-12 md:bg-[var(--color-bg-secondary)] flex flex-col items-center gap-10">
        <div className="w-full flex flex-col">
          <FaBackspace onClick={_ => navigate('/')} className="self-start text-[2.5rem] text-[var(--color-text-secondary)] cursor-pointer"/>

          <p className="self-center text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>
            {info ? `${info.location.country}/${info.location.name}` : location}
          </p>
          {info && (pageTracker === 0
            ? <p className="self-center text-[var(--color-text-primary)]">Today</p> 
            : <p className="self-center text-[var(--color-text-primary)]">{info.forecast.forecastday[pageTracker].date}</p>)}
        </div>

        {error && <p className="text-[var(--color-text-secondary)]" style={{fontSize: "var(--text-body-primary)"}}>{error}</p>}

        {!info && !error &&
          <div className="w-full flex-grow grid place-items-center">
            <Loading/>
          </div>
        }

        {info && info.forecast.forecastday.map((forecast, index) => {
            if (index == 0) {
              return (
                <div key={forecast.date} className={`flex flex-col gap-10 ${pageTracker != index && 'absolute -z-10'}`}>
                    <div className="w-fit flex gap-10">
                      <div className="text-[8rem] text-white">
                        {WEATHER_ICONS[info.current.condition.text.toLowerCase()] || <IoCloudOffline/>}
                      </div>

                      <div className="flex flex-col gap-2 justify-center">
                        <StatisticsRow asset='Condition' value={info.current.condition.text}/>
                        <StatisticsRow asset='Tempreture' value={`${info.current.temp_c}°`}/>
                        <StatisticsRow asset='Feels like' value={`${info.current.feelslike_c}°`}/>
                      </div>
                    </div>

                    <div className="self-start flex flex-col gap-2 justify-center">
                      <StatisticsRow asset='Humidity' value={info.current.humidity}/>
                      <StatisticsRow asset='Wind speed' value={`${info.current.wind_kph} km/h`}/>
                      <StatisticsRow asset='Sun rise/set' value={`${info.forecast.forecastday[0].astro.sunrise} / ${info.forecast.forecastday[0].astro.sunset}`}/>
                    </div>
                </div>
              )
            }
            else {
              return (
                <div key={forecast.date} className={`flex flex-col gap-10 ${pageTracker != index && 'absolute -z-10'}`}>
                    <div className="w-fit flex gap-10">
                      <div className="text-[8rem] text-white">
                        {WEATHER_ICONS[forecast.day.condition.text.toLowerCase()] || <IoCloudOffline/>}
                      </div>

                      <div className="flex flex-col gap-2 justify-center">
                        <StatisticsRow asset='Condition' value={forecast.day.condition.text}/>
                        <StatisticsRow asset='Tempreture' value={`${forecast.day.avgtemp_c}°`}/>
                      </div>
                    </div>

                    <div className="self-start flex flex-col gap-2 justify-center">
                      <StatisticsRow asset='Humidity' value={forecast.day.avghumidity}/>
                      <StatisticsRow asset='Wind speed' value={`${forecast.day.maxwind_kph} km/h`}/>
                      <StatisticsRow asset='Sun rise/set' value={`${info.forecast.forecastday[index].astro.sunrise} / ${info.forecast.forecastday[index].astro.sunset}`}/>
                    </div>
                </div>
              )
            }
          })
        }
      </div>

      <div className="self-center flex gap-5">
        {pageTracker != 0 && <MdNavigateBefore onClick={_ => setPageTracker(prev => prev - 1)} className="text-[3rem] text-[var(--color-text-secondary)] cursor-pointer"/>}
        {pageTracker != 6 && <MdNavigateNext onClick={_ => setPageTracker(prev => prev + 1)} className="text-[3rem] text-[var(--color-text-secondary)] cursor-pointer"/>}
      </div>
    </div>
  )
}
