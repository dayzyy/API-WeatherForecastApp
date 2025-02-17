import { FaBackspace } from "react-icons/fa";
import { IoCloudOffline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import WEATHER_ICONS from "../constants/weatherIcons";

export default function WeatherCard({location, date, icon_type, main_rows, additional_rows, focused}) {
  const navigate = useNavigate()
  console.log(WEATHER_ICONS)

  return (
    <div 
      className={`rounded-[20px] md:py-4 md:px-12 md:bg-[var(--color-bg-secondary)] shadow-md flex flex-col items-center gap-10 duration-300 ease-in-out
                  ${!focused && 'absolute translate-x-[100dvw] lg:translate-x-[70dvw]'}`}
    >
      <div className="w-full flex flex-col">
        <FaBackspace onClick={_ => navigate('/')} className="self-start text-[2.5rem] text-[var(--color-text-secondary)] hover:text-[var(--color-logo-dark)] cursor-pointer"/>

        <p className="self-center text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>
          {location}
        </p>

        <p className="self-center text-[var(--color-text-primary)]">{date}</p> 
      </div>

      <div key={date} className={`flex flex-col gap-10`}>
          <div className="w-fit flex gap-10">
            <div className="text-[8rem] text-white">
              {WEATHER_ICONS[icon_type] || <IoCloudOffline/>}
            </div>

            <div className="flex flex-col gap-2 justify-center">
              {main_rows.map((row, index) => <span key={`${index}main`}>{row}</span>)}
            </div>
          </div>

          <div className="self-start flex flex-col gap-2 justify-center">
            {additional_rows.map((row, index) => <span key={`${index}add`}>{row}</span>)}
          </div>
      </div>
    </div>
  )
}
