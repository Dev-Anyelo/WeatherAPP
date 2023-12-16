import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <div className="w-full h-full min-h-screen md:grid md:place-items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black text-white">
      <WeatherApp />
    </div>
  );
}

export default App;
