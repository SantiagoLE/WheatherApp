
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import Loading from './components/Loading';
import CityWeatherList from './components/CityWeatherList';
import getRandomArray from './utils/getRandomArray';


function App() {

    const [latlon, setLatlon] = useState()
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [inputCity, setInputCity] = useState()
    const [cityList, setCityList] = useState([])
    const [citySelect, setCitySelect] = useState()
    const [hasError, setHasError] = useState(false)
    const [classError, setClassError] = useState(false)
    const [hasEmptyCity, setHasEmptyCity] = useState(false)
    const [geolocationError, setGeolocationError] = useState()
    const [numberBackground, setNumberBackground] = useState(getRandomArray([1,2,3,4]))
    console.log(numberBackground);

    

    
    useEffect(() => {
        const success = pos => {
            const cardinalPoints = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude

            }
            setGeolocationError(false)
            console.log(cardinalPoints);
            setLatlon(cardinalPoints)
        }
        const error = err => {
            console.log(err);
            setGeolocationError(true)
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
                    // setWeather(false)
                    console.log(res.data);
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
                    if (arrayCitys?.length < 1) {
                        setHasError(true)
                        setClassError(true)
                        setTimeout(() => {
                            setClassError(false)
                        }, 3000);
                    } else {
                        setHasError(false)
                    }
                    setCityList(arrayCitys)
                    console.log(res);

                })

                .catch(err => console.log(err))
        }

    }, [inputCity])

    useEffect(() => {
        if (citySelect) {
            const cardinalPoints = {
                lat: citySelect.lat,
                lon: citySelect.lon
            }
            setLatlon(cardinalPoints)
            setInputCity(false)
            console.log({ actualizacionCordenadas: cardinalPoints })

        }
    }, [citySelect])




    console.log(hasError);
    console.log(cityList);
    console.log(cityList?.length);


    const handleSubmit = event => {
        event.preventDefault()

        if (event.target.inputCity.value.toLowerCase().trim() === "") {
            setHasEmptyCity("true")
            setTimeout(() => {
                setHasEmptyCity(false)
            }, 3000);
        } else {
            // if (arrayCitys?.length < 1) {
            //             setHasError(true)
            //             setClassError(true)
            //             setTimeout(() => {
            //                 setClassError(false)
            //             }, 3000);
            //         } else {
            //             setHasError(false)
            //         }


            setInputCity(event.target.inputCity.value.toLowerCase().trim())

            event.target.inputCity.value = ""


        }



    }

    console.log({ ciudadBuscada: inputCity });

    const citySelectInList = (city) => {

        setCitySelect(city)
        console.log(citySelect);
        setCityList([])
    }

    const backGroundGeolocation = {
        backgroundImage: `url(/backgrounds/backgroundGeolocation/geolocation.png)`
    }

    const backgroundsApp = {
        backgroundImage: `url('/backgrounds/backgroundApp/background${numberBackground}.jpg')`
    }



    
    return (
        <div className="App" style={geolocationError ? backGroundGeolocation : backgroundsApp}>
            {
                geolocationError
                ?
""
                : weather
                    ? <>

                        <form onSubmit={handleSubmit}>
                            <input id='inputCity' type="entrar" placeholder="Enter a city" />
                            <button className='buttonSearch' >Search city</button>
                        </form>

                        {
                            hasEmptyCity
                                ? <p>Please enter a city</p>
                                : hasError
                                    ? <p className={classError ? "view_error" : "hidden_error"} style={{color:"white"}} >The searched city does not exist</p>
                                    : <p> <br /> </p>
                        }
                        {
                            inputCity
                                ? hasError
                                    ? <>

                                        <WeatherCard
                                            weather={weather}
                                            citySelect={citySelect}
                                            temperature={temperature}
                                        />
                                    </>
                                    : <CityWeatherList
                                        cityList={cityList}
                                        citySelectInList={citySelectInList}
                                        setNumberBackground={setNumberBackground}
                                    />

                                :
                                <WeatherCard
                                    weather={weather}
                                    citySelect={citySelect}
                                    temperature={temperature}

                                />
                        }
                    </>
                    : <Loading />
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
