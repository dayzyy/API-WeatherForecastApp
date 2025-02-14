import { useParams } from "react-router-dom";
import { MdCloudySnowing } from "react-icons/md";

import StatisticsRow from "../components/StatisticsRow";

export default function WeatherInfoPage() {
  const { location } = useParams()

  return (
    <div className= "rounded-xl md:w-[500px] md:p-4 md:bg-[var(--color-bg-secondary)] flex flex-col items-center gap-10">
      <p className="text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>{location}</p>

      <div className="flex flex-col gap-10">
          <div className="w-fit flex gap-10">
            <MdCloudySnowing className="text-[9rem] text-white"/>

            <div className="flex flex-col gap-2 justify-center">
              <StatisticsRow asset='Condition' value='Snowy'/>
              <StatisticsRow asset='Tempreture' value='28'/>
              <StatisticsRow asset='Feels like' value='21'/>
            </div>
          </div>

          <div className="self-start flex flex-col gap-2 justify-center">
            <StatisticsRow asset='Humidity' value='12'/>
            <StatisticsRow asset='Wind speed' value='3 km/h'/>
            <StatisticsRow asset='Sun rise/set' value='7am/6:30pm'/>
          </div>
      </div>
    </div>
  )
}
