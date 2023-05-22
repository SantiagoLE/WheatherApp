import React from 'react'
import getRandomArray from '../utils/getRandomArray'
import "./styles/citiWeatherList.css"

const CityWeatherList = ({ cityList, citySelectInList, setNumberBackground }) => {

    const handleCitySelect = (city) => {
        citySelectInList(city)
        setNumberBackground(getRandomArray([1, 2, 3, 4, 5, 6, 7]))

    }

    return (
        <div className='city_weather-list'>
            <ul className='city_list'>
                {
                    cityList?.map((city, index) => {
                        const name = cityList?.[index].name
                        const state = cityList?.[index].state
                        const country = cityList?.[index].country
                        return (
                            <li key={index} >
                                <button onClick={() => handleCitySelect(city)}>{name} - {state ? `${state},` : ""} {country} </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    )
}

export default CityWeatherList