import React, { useState } from 'react'

const WeatherCard = ({ weather, citySelect, temperature }) => {

    const [isCelsius, setisCelsius] = useState(true)

    const handleChangeTemperature = () => {
        setisCelsius(!isCelsius)
    }

    return (
        <article className='cardWeather'>
            <h1>{ citySelect ? citySelect?.name  : weather?.name }  {citySelect?.state ? `- ${citySelect?.state}` : "" }, {citySelect ? citySelect?.country : weather?.sys.country}</h1>
            <section>
                <header>
                    <img className='imageClima' src={` https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                </header>
                <article>
                    <h2>{weather?.weather[0].description}</h2>
                    <ul className='weather_Info'>
                        <li><span>win Speed  </span>{weather?.wind.speed}m/s</li>
                        <li><span>Clouds  </span>{weather?.clouds.all}%</li>
                        <li><span>Presure  </span>{weather?.main.pressure}hpa</li>
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