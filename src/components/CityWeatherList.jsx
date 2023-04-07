import React from 'react'
import getRandomArray from '../utils/getRandomArray'


const CityWeatherList = ({ cityList, citySelectInList, setNumberBackground }) => {
    
    const handleCitySelect = (city) => {
        citySelectInList(city)
        setNumberBackground(getRandomArray([1,2,3,4]))
        
    }
  
    // console.log({listaDeCiudades:cityList});


    return (
        <ul>
            {
                cityList?.map((city, index) => {
                   const name =cityList?.[index].name
                   const state = cityList?.[index].state
                   const country = cityList?.[index].country
                    return (
                        <li key={index} >
                            <button onClick={() => handleCitySelect(city) }>{name} - { state ? `${state},`:"" } {country} </button>
                        </li>
                    )
                })
            }
            {/* <li>{indexCity}</li> */}
        </ul>
    )
}

export default CityWeatherList