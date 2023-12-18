import { useState } from "react";
import FormInput from "./FormInput";
import CardInfoWeather from "./CardInfoWeather";

export default function WeatherApp() {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_API_KEY
  }&lang=en&q=`;

  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, message: "" });
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    condition: "",
    icon: "",
    text: "",
    lat: "",
    lon: "",
    time: "",
  });

  const getWeather = async (e) => {
    e.preventDefault();
    setError({ error: false, message: "" });
    setLoading(false);

    try {
      const response = await fetch(URL + city);
      const data = await response.json();

      if (data.error) {
        throw { message: data.error.message };
      } else {
        setLoading(true);
        setTimeout(() => {
          setWeather({
            city: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.code,
            icon: data.current.condition.icon,
            text: data.current.condition.text,
            lat: data.location.lat,
            lon: data.location.lon,
            time: data.location.localtime,
          });
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  return (
    <div>
      <div className="py-10 px-2 grid place-items-center gap-3">
        <div className="mb-3 p-0">
          <h1 className="text-5xl sm:text-6xl text-center font-bold bg-transparent bg-clip-text text-transparent bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
            Weather App
          </h1>
          <p className="text-center text-gray-400 py-2">
            Search for a city or country to get the weather
          </p>
        </div>
        <div className="w-fit flex gap-4 mb-5">
          <FormInput
            city={city}
            setCity={setCity}
            loading={loading}
            getWeather={getWeather}
          />
        </div>

        <div className="w-fit text-center">
          {error.error && (
            <div
              className="p-3 text-red-600 rounded-lg border border-gray-700 bg-gray-900 mb-3"
              role="alert"
            >
              <span className="font-medium text-sm sm:text-lg">
                {error.message}
              </span>
            </div>
          )}
          {weather.city && <CardInfoWeather weather={weather} />}
        </div>
      </div>
    </div>
  );
}
