import React from 'react'


const CityWeatherList = ({ cityList, citySelectInList }) => {
    
    const handleCitySelect = (city) => {
        citySelectInList(city)
        console.log({ciudadSelecionada:city});
    }
    //    const indexCity = cityList?.map((city,index) => {
    //         return(

    //          <li key={index} >{cityList?.[index].state}</li> 
    //            )
    // })
    // console.log(indexCity);
    console.log({listaDeCiudades:cityList});
    // console.log(citySelectInList);


    return (
        <ul>
            {
                cityList?.map((city, index) => {
                   
                    return (
                        <li key={index} >{cityList?.[index].state}
                            <button onClick={() => handleCitySelect(city) }>Select city</button>
                        </li>
                    )
                })
            }
            {/* <li>{indexCity}</li> */}
        </ul>
    )
}

export default CityWeatherList