import { useQuery } from "@tanstack/react-query";
import getWeather from "./api/api";
import AdditionaInfo from "./components/cards/AdditionaInfo";
import Summary from "./components/cards/Summary";
import WeatherInfo from "./components/cards/WeatherInfo";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  console.log(data);

  return (
    <div className="flex flex-col gap-8">
      <WeatherInfo />
      <Summary />
      <AdditionaInfo />
    </div>
  );
}

export default App;
