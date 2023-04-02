import React, { useState } from 'react'

const WeatherCard = ({ weather, temperature }) => {

    const [isCelsius, setisCelsius] = useState(true)


    const handleChangeTemperature = () => {
        setisCelsius(!isCelsius)
    }
// console.log(weather);
    return (
        <article>
            <h1>Weather App</h1>
            <h2>{weather?.name}, {weather?.sys.country}</h2>
            <section>
                <header>
                    <img src={` https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                </header>
                <article>
                    <h3>{weather?.weather[0].description}</h3>
                    <ul>
                        <li><span>win Speed</span>{weather?.wind.speed}m/s</li>
                        <li><span>Clouds</span>{weather?.clouds.all}%</li>
                        <li><span>Presure</span>{weather?.main.pressure}hpa</li>
                    </ul>
                </article>
            </section>
            <footer>
                <h2>{
                    isCelsius
                        ? `${temperature?.celsius} °C`
                        : `${temperature?.fahrenheit} °F`

                }</h2>
                <button onClick={handleChangeTemperature}>Change to {isCelsius ? "°F" : "°C"}</button>
            </footer>
        </article>
    )
}

export default WeatherCard