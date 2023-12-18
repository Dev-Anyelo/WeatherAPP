
const CardInfoWeather = ({ weather }) => {
  return (
    <div className="w-fit h-fit flex flex-col gap-10 py-5 px-16 border-none rounded-xl bg-gray-900 shadow-[0_0px_15px_rgba(8,_112,_184,_0.7)]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-center w-fit">
        <div className="flex flex-col md:flex-row items-center w-fit">
          <img
            src={weather.icon}
            alt={weather.city}
            className="md:w-[100px] md:h-[100px] w-[90px] h-[90px]"
          />{" "}
          <div className="ml-5 h-fit w-fit">
            <p className="font-light text-md text-gray-300">{weather.text}</p>
          </div>
        </div>

        <div className="mx-auto h-fit flex gap-2 font-light text-gray-400">
          <p>Lat: {weather.lat}</p> | <p>Long: {weather.lon}</p> |
          <h2>Temp: {weather.temp} °C</h2>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-light text-blue-700">{weather.country}</h1>
        <h1 className="text-2xl font-light text-gray-700 md:hidden">-</h1>
        <h1 className="text-2xl font-light text-blue-700">{weather.city}</h1>
      </div>
      <div className="flex justify-center md:justify-end border-t border-gray-700 md:border-none py-3">
        <h1 className="text-sm font-light text-gray-400">
          <p className="w-fit inline-block">Date: </p> {weather.time}
        </h1>
      </div>
    </div>
  );
};

export default CardInfoWeather;
