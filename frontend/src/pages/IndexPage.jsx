import { useState } from "react";
import { FaCloud } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handle_enter = event => {
    if (!location) {
      console.log('Enter location first!')
      return
    }

    if (event.key === 'Enter') {
      navigate(`/${location}`)
    }
  }

  return (
    <div className= "rounded-xl md:w-[500px] md:p-4 md:bg-[var(--color-bg-secondary)] flex flex-col gap-10">
      <p className="text-[var(--color-text-primary)] font-bold" style={{fontSize: 'var(--text-heading-secondary)'}}>Find out the weather forecast at your location!</p>
      <div className="self-center relative w-fit">
        <FaCloud className="text-white text-[9rem]"/>
        <IoSearch className="absolute -bottom-5 -right-10 text-[6rem] text-[#121212]"/>
      </div>
      <div className="relative flex items-center w-11/12 h-16 max-w-[400px] self-center rounded-2xl bg-[#252525] px-4">
        <input value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => handle_enter(e)}
          id="location" placeholder="" type="text" className="outline-none self-end w-full h-5/6 text-white font-bold"
        />
        <label id="location_label" htmlFor="location" className="absolute text-white duration-75 ease" style={{fontSize: 'var(--text-body-primary)'}}>Enter location</label>
      </div>
    </div>
  )
}
