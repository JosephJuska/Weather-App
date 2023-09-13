import './style/App.css'
import { Header } from './components/Header'
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState('');
  const [windSpeed, setWindSpeed] = useState(0.0);
  const [humidity, setHumidity] = useState(0.0);

  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showValues = (data: any) => {
    setTemp(Math.round(data.main.temp));
    setHumidity(Math.round(data.main.humidity *100) / 100);
    setWindSpeed(Math.round(data.wind.speed * 100) / 100);
    setWeather(data.weather[0].main.toLowerCase());
    setName(data.name);
    setShow(true);
  }

  const getValues = async (name: string) => {
    const API_KEY = 'YOUR_API_KEY';
    const API_REQUEST = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric&lang=en`;
    setIsLoading(true);
    setError('');
    setShow(false);
    try{
      const res = await axios.get(API_REQUEST);
      showValues(res.data);
    }catch(err: any){
      if(err.response && err.response.status === 404){
        setError(`Error: '${name}' named city or country does not exist.`);
        setShow(false);
      }else{
        setError(err);
      }
    }finally{
      setIsLoading(false);
    }
  }

  const controlClick = (name: string) => {
    getValues(name);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    controlClick(inputValue);
  }
  
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="search-bar">
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Enter a country or a city..." value={inputValue} onChange={(event) => setInputValue(event.target.value) } />
              <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>
          <div className={`result ${show ? 'show' : ''}`}>
            <img className="weather-img" src={`src/icons/${weather}.png`} alt="" />
            <h1 className="celcius">{temp} ℃</h1>
            <h1 className="name">{name}</h1>
            <div className="info-block-wrapper">
              <div className="info-block">
                <i className="fa-solid fa-water"></i>
                <h2>Humidity:</h2>
                <span>{humidity} %</span>
              </div>
              <div className="info-block">
                <i className="fa-solid fa-wind"></i>
                <h2>Wind Speed:</h2>
                <span>{windSpeed} m/s</span>
              </div>
            </div>
          </div>
          <div className={`error ${!!error ? 'show' : ''}`}>
            <p className="error-message">{error}</p>
          </div>
          <div className={`loading ${isLoading ? 'show' : ''}`}>
            <svg className="spinner" width="150px" height="150px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
              <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
