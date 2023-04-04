
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import CityWeatherList from './components/CityWeatherList';

function App() {

  const [latlon, setLatlon] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [inputCity, setInputCity] = useState()
  const [cityList, setCityList] = useState()
   const [citySelect, setCitySelect] = useState(null)
  console.log({ cordenadasiniciales: latlon });

  useEffect(() => {
    const success = pos => {
      const cardinalPoints = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude

      }
      setLatlon(cardinalPoints)
    }
    const error = err => {
      console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error)

  }, [])

  useEffect(() => {

    if (latlon) {
      const apiKey = "90a6ccdbd9699098bb70d55789023e85"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apiKey}`
      axios.get(url)
        .then(res => {
          const celsius = ((res.data.main.temp) - 273.15).toFixed(1)
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1)

          setTemperature({ celsius, fahrenheit })
          setWeather(res.data)

        })
        .catch(err => console.log(err))
    }
  }, [latlon])

  useEffect(() => {
    if (inputCity) {
      const apiKey = "90a6ccdbd9699098bb70d55789023e85"
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=5&appid=${apiKey}`

      axios.get(url)
        .then(res => {
          const arrayCitys = res.data
          setCityList(arrayCitys)

          // arrayCitys.forEach(city => {
          //   const cardinalPoints = {
          //     name: city.name,
          //     state: city.state,
          //     country: city.country,
          //     lat: city.lat,
          //     lon: city.lon
          //   }
          //   setLatlon(cardinalPoints)
          //   console.log(arrayCitys);

          //   console.log(cardinalPoints);
          // });

        })
        .catch(err => console.log(err))
    }

  }, [inputCity])

  const handleSubmit = event => {
    event.preventDefault()
    setInputCity(event.target.inputCity.value.toLowerCase().trim())
    event.target.inputCity.value = ""
    console.log({ ciudadBuscada: inputCity });
  }


  const citySelectInList = (city) => {
    
    setCitySelect(city)
   
  }

  useEffect(() => {
    if(citySelect){
      const cardinalPoints = {
        lat: citySelect.lat,
        lon: citySelect.lon
      }
    setLatlon(cardinalPoints)
      setInputCity(false)
      console.log({ actualizacionCordenadas: cardinalPoints })

    }
  }, [citySelect])


  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input id='inputCity' type="text" />
        <button>Search city</button>
      </form>

      {
        inputCity
          ?  <CityWeatherList
              cityList={cityList}
              citySelectInList={citySelectInList}

            />
          : <WeatherCard
            weather={weather}
            temperature={temperature}

          />
      }



      {/* {
        inputCity
          ? citySelectInList
            ? <WeatherCard
              weather={weather}
              temperature={temperature}

            />
            : <CityWeatherList
              cityList={cityList}
              citySelectInList={citySelectInList}

            />
          : <WeatherCard
            weather={weather}
            temperature={temperature}

          />
      }
 */}

      {/* {
        weather
          ?

          <WeatherCard
            weather={weather}
            temperature={temperature}
          />
          : <Loading />
      } */}

    </div>
  )
}

export default App
