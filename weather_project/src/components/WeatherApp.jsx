import { useState } from "react";

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
    <>
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
            <form className="md:w-[500px] w-[350px] sm:w-[400px]">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
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
                  className="block w-full p-4 pl-10 text-sm border border-gray-500 rounded-lg bg-gray-900 outline-none text-blue-50"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  placeholder="Enter a country or city"
                  autoComplete="true"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-3 py-2 sm:px-4 sm:py-2"
                  onClick={(e) => {
                    getWeather(e);
                  }}
                >
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="sm:w-5 sm:h-5 w-4 h-4 text-gray-200 animate-spin dark:text-white fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="w-fit text-center">
            {error.error && (
              <div
                className="p-3 text-red-600 rounded-lg border border-gray-700 bg-gray-900 mb-3"
                role="alert"
              >
                <span className="font-medium text-sm sm:text-lg">{error.message}</span>
              </div>
            )}
            {weather.city && (
              <div className="w-fit h-fit flex flex-col gap-10 py-5 px-16 border-none rounded-xl bg-gray-900 shadow-[0_0px_15px_rgba(8,_112,_184,_0.7)]">
                <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-center w-fit">
                  <div className="flex flex-col md:flex-row items-center w-fit">
                    <img
                      src={weather.icon}
                      alt={weather.city}
                      className="md:w-[100px] md:h-[100px] w-[90px] h-[90px]"
                    />{" "}
                    <div className="ml-5 h-fit w-fit">
                      <p className="font-light text-md text-gray-300">
                        {weather.text}
                      </p>
                    </div>
                  </div>

                  <div className="mx-auto h-fit flex gap-2 font-light text-gray-400">
                    <p>Lat: {weather.lat}</p> | <p>Long: {weather.lon}</p> |
                    <h2>Temp: {weather.temp} °C</h2>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-light text-blue-700">
                    {weather.country}
                  </h1>
                  <h1 className="text-2xl font-light text-gray-700 md:hidden">-</h1>
                  <h1 className="text-2xl font-light text-blue-700">
                    {weather.city}
                  </h1>
                </div>
                <div className="flex justify-center md:justify-end border-t border-gray-700 md:border-none py-3">
                  <h1 className="text-sm font-light text-gray-400">
                    <p className="w-fit inline-block">Date: </p> {weather.time}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
