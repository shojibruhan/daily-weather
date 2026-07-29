import { useQuery } from "@tanstack/react-query";
import getWeather from "./api/api";

function App() {
  const { data } = useQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  });
  console.log(data);

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}

export default App;
