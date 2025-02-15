import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import StatisticsRow from "../components/StatisticsRow";
import Loading from "../components/Loading";

import WEATHER_ICONS from "../constants/weatherIcons";
import fetch_weather from "../services/weatherService";

import { IoMdArrowBack, IoMdArrowRoundBack } from "react-icons/io";
import { FaBackspace } from "react-icons/fa";
import { IoIosBackspace } from "react-icons/io";

export default function WeatherInfoPage() {
  const { location } = useParams()
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')
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
    <div className= "rounded-[20px] md:py-4 md:px-12 md:bg-[var(--color-bg-secondary)] flex flex-col items-center gap-10">
      <div className="w-full flex flex-col">
        <FaBackspace onClick={_ => navigate('/')} className="self-start text-[2.5rem] text-[var(--color-text-secondary)] cursor-pointer"/>

        <p className="self-center text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>{info ? info.location : location}</p>
      </div>

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
                {WEATHER_ICONS[info.condition.toLowerCase()] || <IoCloudOffline/>}
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
