import React from 'react'
import Heading from './components/Heading'
import ExtendedWeatherCard from './components/ExtendedWeatherCard'
import CountrySearchBar from './components/CountrySearchBar'
import WeatherCard from './components/WeatherCard'
import Footer from './components/Footer'

function App() {

  return (
    <div className= 'w-3/5 mx-auto bg-red-200'>
      <Heading />
      <CountrySearchBar />
      <WeatherCard place=''/>
      <ExtendedWeatherCard />
      <Footer />
    </div>
  )
}

export default App
