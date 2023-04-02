import React from 'react'


const CityWeatherList = ({ cityList }) => {

 
   const indexCity = cityList?.map((city,index) => {
        return(
        //    <li>{index}</li>   
         <li key={index} >{cityList?.[index].state}</li> 
           )
    })
    console.log(indexCity);
     console.log(cityList);
    return (
        <ul>
        {/* <li>{cityList?.[{indexCity}].state}</li> */}
        <li>{indexCity}</li>
        </ul>
    )
}

export default CityWeatherList