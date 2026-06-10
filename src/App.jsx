import { useEffect, useState } from 'react'
import './App.css'
import PropTypes from "prop-types";

/* images */

import SearchIcon from "./assets/search.png";
import clearIcon from "./assets/clear.png";
import cloudIcon from "./assets/cloud.png";
import drizzleIcon from "./assets/drizzle.png";
import rainIcon from "./assets/rain.png";
import windIcon from "./assets/wind.png";
import snowIcon from "./assets/snow.png";
import humidityIcon from "./assets/humidity.png";

const WeatherDetails=({icon,temp,city,country,lat,log,wind,humidity})=>{
 return(
   <>
  <div className='image'>
    <img src={icon} alt="image" />
  </div>
  <div className="temp">{temp}°C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className='log'>longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className="data-container">
    <div className="element">
      <img src={humidityIcon} alt="" className='icon' />
      <div className="data">
        <div className="humidity-percentage">{humidity}%</div>
        <div className="text">humidity</div>
      </div>
    </div>
    <div className="element">
      <img src={windIcon} alt="" className='icon' />
      <div className="data">
        <div className="wind-percentage">{wind}km/h</div>
        <div className="text">wind speed</div>
      </div>
    </div>
  </div>
  </>
 );
}

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
};


function App() {
  
  let api_key = "fd9f654dab5b9c8442edc569a4611baa";

  const[text,setText] = useState("coimbatore")
const[icon,setIcon] = useState(snowIcon);
const[temp,setTemp] = useState(0);
const[city,setCity] = useState("coimbatore")
const[country,setCountry] = useState("IN")
const[lat,setLat] = useState(0);
const[log,setLog] = useState(0);
const[humidity,setHumidity] = useState(0);
const[wind,setWind] = useState(0);
const[error,setError]= useState(null)
const[weatherData,setWeatherData] = useState(false)

const[cityNotFound,setCityNotFound] = useState(false);
const [loading,setLoading] = useState(false);


const weatherIconMap = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": drizzleIcon,
  "03n": drizzleIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};

const search=async () =>{

  setLoading(true);
  setCityNotFound(false);
  setError(null);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;


  try{
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data)
    if(data.cod === "404"){
      console.error("city noy found");
      setCityNotFound(true);
      setWeatherData(false)
      setLoading(false);
      return;
    }

    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);
    const weatherIconcode = data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconcode]|| clearIcon);
    setCityNotFound(false);
    setWeatherData(true)

  }catch(error){
    console.error("An error occured:",error.message)
    setError("An error occured while fetching a data.")
  }finally{
setLoading(false)
  };
  
}

const handlecity = (e) =>{
setText(e.target.value);
}

const handlekeydown = (e) =>{
  if (e.key === "Enter")
{
  search();
}}


useEffect(function (){
  search();
},[]);


  return (
    <>
      
        <div className='container'>
          <div className='input-container'>
            <input type="text" 
            className='cityinput'
            placeholder='search city' onChange={handlecity}
            value={text} onKeyDown={handlekeydown}/>
            <div className='search-icon'onClick={()=>
              search()
            }>
              <img src={SearchIcon} alt="Search" />
            </div>

          </div>
         


                { loading &&<div className='loading-message'>loading....</div>}
                 {  error && <div className='error-message'>{error}</div>}
                { cityNotFound && <div className="city-not-found">city-not-found
                </div>}

                {!loading && !cityNotFound && weatherData && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>}

                <p className="copyright">
                     Designed by <span>Thanseer ahamed</span>
                  </p>
        
        </div>
    

      
      
    </>
  )
}

export default App






