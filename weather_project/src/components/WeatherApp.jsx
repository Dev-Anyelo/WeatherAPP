import React, { useState } from "react";

export default function WeatherApp() {
  const URL = `https://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_API_KEY
  }&lang=es&q=`;

  // const URL_TO_CURRENT_CITY = `http://api.weatherapi.com/v1/current.json?key=${
  //   import.meta.env.VITE_API_KEY
  // }&lang=es&q=Panama`;

  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Search");
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

    try {
      const response = await fetch(URL + city);
      const data = await response.json();

      if (data.error) {
        throw { message: data.error.message };
      } else {
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
          setLoading(false); // Cambia el estado loading a false después de cargar los datos
          setButtonText("Search"); // Cambia el texto del botón de vuelta a "Search"
        }, 1000);
      }
    } catch (error) {
      setError({ error: true, message: error.message });
    }
  };

  return (
    <>
      <div className="w-full h-screen grid place-items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black text-white">
        <div className="w-1/2 py-10 px-2 grid place-items-center gap-6">
          <h1 className="text-5xl text-center font-bold text-gray-200 mb-10">
            Weather App
          </h1>
          <div className="w-fit flex gap-4 mb-5">
            <form className="w-[500px]">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder="Ingrese el país o ciudad..."
                  autoComplete="true"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    getWeather(e);
                    setLoading(true);
                    setButtonText("Loading"); // Cambia el texto del botón a "Loading" cuando se hace clic
                  }}
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>

          <div className="w-fit text-center">
            {error.error && (
              <div
                className="p-3 mb-3 text-sm text-red-800 rounded-lg dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium text-sm">{error.message}</span>
              </div>
            )}
            {weather.city && (
              <div className="w-fit h-fit flex flex-col gap-10 py-5 px-16 border border-gray-700 rounded-xl bg-[#13222F] shadow-[0_0px_50px_rgba(8,_112,_184,_0.7)]">
                <div className="flex gap-20 items-center">
                  <div className="flex">
                    <img
                      src={weather.icon}
                      alt={weather.city}
                      className="w-[96px] h-[96px]"
                    />{" "}
                    <div className="flex items-center ml-5">
                      <p className="font-light text-md">{weather.text}</p>
                    </div>
                  </div>

                  <div className="mx-auto h-fit flex  gap-2 font-light ">
                    <p>Lat: {weather.lat}</p> |<p>Long: {weather.lon}</p> |
                    <h2>Temp: {weather.temp} °C</h2>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-light text-blue-500">
                    {weather.country}
                  </h1>

                  <h1 className="text-xl font-light text-blue-600">
                    {weather.city}
                  </h1>
                </div>
                <div className="flex justify-end">
                  <h1 className="text-sm font-light text-gray-400">
                    {weather.time}
                  </h1>
                </div>
              </div>
            )}
          </div>

          <div className="text-center font-light text-gray-300 mt-5">
            <p>Powered by</p>
            <a
              href="https://www.weatherapi.com/"
              title="Weather API"
              className="hover:text-blue-500 underline"
            >
              WeatherAPI.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
