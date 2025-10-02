import { useEffect, useState } from "react";
import Day_Dropdown from "../ui/Day_Dropdown";

const ApiCall = ({
  search,
  shouldFetch,
  setShouldFetch,
  selectedUnit,
  setIsDropdownOpen,
  isDropdownOpen,
  selectedDay,
  setSelectedDay,
  setSearch,
}: {
  search: string;
  shouldFetch: boolean;
  setShouldFetch: (value: boolean) => void;
  selectedUnit: string;
  setIsDropdownOpen: (value: boolean) => void;
  isDropdownOpen: boolean;
  selectedDay: string;
  setSelectedDay: (value: string) => void;
  setSearch: (value: string) => void;
}) => {
  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      0: "/assets/images/icon-sunny.webp", // Clear sky
      1: "/assets/images/icon-partly-cloudy.webp", // Mainly clear
      2: "/assets/images/icon-partly-cloudy.webp", // Partly cloudy
      3: "/assets/images/icon-partly-cloudy.webp", // Overcast
      45: "/assets/images/icon-fog.webp", // Fog
      48: "/assets/images/icon-fog.webp", // Depositing rime fog
      51: "/assets/images/icon-rain.webp", // Light rain
      53: "/assets/images/icon-rain.webp", // Moderate rain
      55: "/assets/images/icon-rain.webp", // Dense drizzle
      61: "/assets/images/icon-rain.webp", // Slight rain
      63: "/assets/images/icon-rain.webp", // Moderate rain
      65: "/assets/images/icon-storm.webp", // Heavy rain
      71: "/assets/images/icon-snow.webp", // Slight snow
      73: "/assets/images/icon-snow.webp", // Moderate snow
      75: "/assets/images/icon-snow.webp", // Heavy snow
      80: "/assets/images/icon-storm.webp", // Rain showers
      95: "/assets/images/icon-storm.webp", // Thunderstorm
    };

    return iconMap[weatherCode] || "";
  };

  const getDayOffset = (selectedDay) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    const selectedDayIndex = days.indexOf(selectedDay);

    let offset = selectedDayIndex - today;
    if (offset < 0) offset += 7;

    return offset;
  };

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUserCurrentLocation = async () => {
    setLoading(true);

    try {
      const locationResponse = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_CURRENT_LOCATION_API_KEY}`
      );
      const data = await locationResponse.json();

      const cityName = data.location.city;
      setSearch(cityName.toLowerCase());
      setShouldFetch(true);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCurrentLocation();
  }, []);

  useEffect(() => {
    if (!shouldFetch || !search) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(false);

      try {
        // Get coordinates
        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`
        );
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
          setError(true);
          setLoading(false);
          setShouldFetch(false);
          return;
        }
        
        const location = geoData.results[0];

        // Get weather
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${
            location.latitude
          }&longitude=${
            location.longitude
          }&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=${selectedUnit.toLowerCase()}&precipitation_unit=${
            selectedUnit === "celsius" ? "mm" : "inch"
          }&wind_speed_unit=${selectedUnit === "celsius" ? "kmh" : "mph"}`
        );
        const weatherData = await weatherResponse.json();

        setWeather({ location, ...weatherData });
      } catch (error) {
        console.log("Error:", error);
        setError(true);
      } finally {
        setLoading(false);
        setShouldFetch(false);
      }
    };

    const timeout = setTimeout(fetchWeather, 300);
    return () => clearTimeout(timeout);
  }, [search, shouldFetch, selectedUnit]);

  if (!search && !loading) return null;

  return (
    <div className="p-4 md:p-8 grid lg:grid-cols-3 gap-6">
      <div className={`space-y-6 ${error ? 'lg:col-span-3 flex items-center justify-center' : 'lg:col-span-2'}`}>
        {/* Main weather */}
        {loading ? (
          <div className="bg-neutral-800 rounded-xl p-6 min-h-[250px] flex items-center justify-center">
            <div className="text-center">
              <div className="flex gap-2 justify-center mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              <span className="text-white">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="w-full text-center">
            <span className="text-white text-xl font-bold">No search result found!</span>
          </div>
        ) : weather ? (
          <div className="rounded-xl p-6 min-h-[250px] flex justify-between text-center items-center bg-[url('/assets/images/bg-today-large.svg')] bg-cover bg-center bg-no-repeat">
            <div className="text-white flex flex-col md:flex-row justify-between items-center md:items-center w-full gap-4">
              <div className="flex-col flex items-center md:items-start w-full md:w-auto">
                <h1 className="text-3xl font-bold items-start">{weather.location.name}</h1>
                <p>
                  {new Date().toLocaleDateString("en", {
                    weekday: "long",
                    year: "numeric",

                    
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
                <img
                  src={getWeatherIcon(weather.current.weather_code)}
                  alt="weather condition"
                  className="w-28 h-28 mt-2"
                />
                <p className="text-8xl font-semibold italic">
                  {Math.round(weather.current.temperature_2m)}°
                </p>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-neutral-400">Search for a location</span>
        )}

        {/* Weather cards */}
        {weather && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-800 rounded-xl p-4 ">
            <h3 className="text-neutral-200">Feels Like</h3>
            <p className="text-2xl  text-white mt-5">
              {weather
                ? `${Math.round(weather.current.apparent_temperature)}°`
                : "-"}
            </p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-neutral-200">Humidity</h3>
            <p className="text-2xl  text-white mt-5">
              {weather ? `${weather.current.relative_humidity_2m}%` : "-"}
            </p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-neutral-200">Wind</h3>
            <p className="text-2xl  text-white mt-5">
              {weather
                ? `${weather.current.wind_speed_10m} ${
                    selectedUnit === "celsius" ? "km/h" : "mph"
                  }`
                : "-"}
            </p>
          </div>
          <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-neutral-200">Rain</h3>
            <p className="text-2xl  text-white mt-5">
              {weather
                ? `${weather.current.precipitation} ${
                    selectedUnit === "celsius" ? "mm" : "in"
                  }`
                : "-"}
            </p>
          </div>
        </div>
        )}

        {/* Daily forecast */}
        {weather && !error && (
        <div>
          <h2 className="text-white font-semibold mb-4">Daily forecast</h2>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
            {Array(7)
              .fill(0)
              .map((_, i) => {
                return (
                  <div
                    key={i}
                    className="bg-neutral-700 rounded-xl p-3 h-36 flex flex-col justify-between text-center text-white"
                  >
                    {weather && i < weather.daily.time.length && (
                      <>
                        <p className="text-sm">
                          {new Date(weather.daily.time[i]).toLocaleDateString(
                            "en",
                            { weekday: "short" }
                          )}
                        </p>
                        <img
                          src={getWeatherIcon(weather.daily.weather_code[i])}
                        />
                        <div className="flex justify-between  items-center">
                          <p className="text-base text-white ">
                            {Math.round(weather.daily.temperature_2m_max[i])}°
                          </p>
                          <p className="text-neutral-200 text-base">
                            {Math.round(weather.daily.temperature_2m_min[i])}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        )}
      </div>

      {/* Sidebar */}
      {weather && !error && (
      <aside className="bg-neutral-800 rounded-xl p-6 lg:col-span-1">
        <div className="flex justify-between items-center text-center">
          <h2 className="text-white font-semibold mb-4">Hourly forecast</h2>
          <Day_Dropdown
            closedText={
              <div className="flex justify-between gap-2">
                <div className="font-dm-sans font-semibold text-white">
                  {selectedDay || "-"}
                </div>
                <img src="/assets/images/icon-dropdown.svg" />
              </div>
            }
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            onDaySelect={setSelectedDay}
            selectedDay={selectedDay}
          />
        </div>

        <div className="space-y-3">
          {Array(8)
            .fill(0)
            .map((_, i) => {
              const currentHour = new Date().getHours();
              const dayOffset = getDayOffset(selectedDay);
              const hourIndex = dayOffset * 24 + currentHour + i; // Start from

              return (
                <div
                  key={i}
                  className="bg-neutral-700 rounded-xl       
  h-12 flex items-center justify-between px-4"
                >
                  {weather && hourIndex < weather.hourly.time.length && (
                    <>
                      <span className="text-white text-sm flex justify-between items-center">
                        <img
                          src={getWeatherIcon(
                            weather.hourly.weather_code[hourIndex]
                          )}
                          alt="weather condition"
                          className="w-12 h-12 "
                        />
                        {new Date(
                          weather.hourly.time[hourIndex]
                        ).toLocaleTimeString("en", { hour: "2-digit" })}
                      </span>
                      <span className="text-white font-bold">
                        {Math.round(weather.hourly.temperature_2m[hourIndex])}°
                      </span>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </aside>
      )}
    </div>
  );
};

export default ApiCall;
