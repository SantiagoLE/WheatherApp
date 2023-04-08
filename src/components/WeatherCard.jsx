import React, { useState } from 'react'

const WeatherCard = ({ weather, citySelect, temperature }) => {

    const [isCelsius, setisCelsius] = useState(true)

    const handleChangeTemperature = () => {
        setisCelsius(!isCelsius)
    }

    return (
        <article className='weather_card'>
            <h1 className='weather_card-title'>{citySelect ? citySelect?.name : weather?.name}  {citySelect?.state ? `- ${citySelect?.state}` : ""}, {citySelect ? citySelect?.country : weather?.sys.country}</h1>
            <section>
                <header>
                    <img className='imageClima' src={` https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
                </header>
                <article>
                    <h2>{weather?.weather[0].description}</h2>
                    <ul className='weather_info'>
                        <li>Win speed:  <span>{weather?.wind.speed}m/s</span></li>
                        <li>Clouds:  <span>{weather?.clouds.all}%</span></li>
                        <li>Presure:  <span>{weather?.main.pressure}hpa</span></li>
                    </ul>
                </article>
            </section>
            <footer className='weather_footer'>
                <h2 className='temp'>{
                    isCelsius
                        ? `${temperature?.celsius} °C`
                        : `${temperature?.fahrenheit} °F`

                }</h2>
                <button className='' onClick={handleChangeTemperature}>Change to {isCelsius ? "°F" : "°C"}</button>
            </footer>
        </article>
    )
}

export default WeatherCard