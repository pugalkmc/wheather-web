import {useEffect, useState} from 'react'
import axios from 'axios'

const Body = () => {
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const position = await getCurrentLocation();
          const { latitude, longitude } = position.coords;
          const options = {
            method: "GET",
            baseURL: "https://api.ambeedata.com",
            url: `/weather/latest/by-lat-lng?lat=${latitude}&lng=${longitude}`,
            headers: {
              "x-api-key":
                "f05fbe51c62ec3864efbcd6892c58f55c261ddc764fac0f215128e0072dfdbfb",
              "Content-type": "application/json",
            },
            // f05fbe51c62ec3864efbcd6892c58f55c261ddc764fac0f215128e0072dfdbfb
          };
          const response = await axios(options);
          setWeatherData(response.data.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

  return (
    <div>
      <div id="navbar" style={{backgroundColor:'rgba(161, 214, 255, 0.2)'}}>
        <span id="web-name">Groove Wheather Web</span>
      </div>
      <div className="container">
        <div>
          <h2>Wheather data for you current location</h2>
        </div>
        {Object.keys(weatherData).map((key, index) => {
          return (
            <div className="data">
              <span className="key">
                {index + 1}. {key}
              </span>
              <span className="value">{weatherData[key]}</span>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default Body;