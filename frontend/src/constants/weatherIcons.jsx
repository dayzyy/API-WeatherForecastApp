import { FaSun, FaCloud, FaSmog, FaCloudShowersHeavy, FaSnowflake, FaBolt } from "react-icons/fa";
import { IoMdRainy, IoMdThunderstorm } from "react-icons/io";
import { MdCloudQueue } from "react-icons/md";
import { WiDayRainMix, WiRaindrops, WiSnowflakeCold, WiDust, WiSandstorm } from "react-icons/wi";

import { IoCloudOffline } from "react-icons/io5";

const WEATHER_ICONS = {
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
export default WEATHER_ICONS
