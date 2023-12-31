import ForcastCard from "./components/ui/forcast-card";
import Layout from "./layout/layout";
import { Gauge, Bar } from "@ant-design/plots";
import DigitalClock from "./components/ui/clock";
import WeatherCard from "./components/ui/weather-card";
import { useApi } from "./hooks/useApi";
import { latAtom, longAtom, useGeolocation } from "./hooks/useGeolocation";
import { useEffect } from "react";
import { useAtom } from "jotai";

const getDayoftheWeek = (dateToConvert: number) => {
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date: Date = new Date(dateToConvert || Date.now());
  console.log(dateToConvert);
  return days[date.getDay()];
};

const options: any = { day: "numeric", month: "long", year: "numeric" };

const sunset = 1700482560;
const sunrise = 1700435460;

function App() {
  const { error: geoError } = useGeolocation();
  const [lat, setLat] = useAtom(latAtom);
  const [long, setLong] = useAtom(longAtom);
  useEffect(() => {
    console.log(lat, long);
  }, [lat, long]);
  const {
    data: forecast,
    loading: forecastLoading,
    error: forecastError,
  } = useApi(
    `weather?lat=${lat || 0}&lon=${long || 0}&units=metric&appid=${
      import.meta.env.VITE_API_APP_ID
    }`
  );
  const {
    data: futureForecast,
    loading,
    error,
  } = useApi(
    `forecast?lat=${lat || 0}&lon=${long || 0}&units=metric&appid=${
      import.meta.env.VITE_API_APP_ID
    }`
  );

  //   const currentTime = useCurrentTime();
  const config: any = {
    percent:
      (new Date().getTime() / 1000 - (forecast?.sys?.sunrise || 0)) /
      ((forecast?.sys?.sunset || 0) - (forecast?.sys?.sunrise || 0)),
    range: {
      color: "#fed7aa",
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    axis: {
      label: {
        formatter(v: number) {
          return `${new Date(
            ((sunset - sunrise) * v + sunrise) * 1000
          ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}`;
        },
        style: {
          fontSize: 12,
        },
      },

      subTickLine: {
        count: 0,
      },
    },
  };

  const config2: any = {
    percent:
      ((forecast?.main?.temp || 0) - (forecast?.main?.temp_min || 0)) /
      ((forecast?.main?.temp_max || 0) - (forecast?.main?.temp_min || 0)),
    range: {
      color: "#fed7aa",
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    axis: {
      label: {
        formatter(v: number) {
          return `${(
            ((forecast?.main?.temp_max || 0) -
              (forecast?.main?.temp_min || 0)) *
              v +
            (forecast?.main?.temp_min || 0)
          ).toFixed(2)}º`;
        },
        style: {
          fontSize: 12,
        },
      },

      subTickLine: {
        count: 0,
      },
    },
  };

  const tempData = futureForecast
    ? futureForecast?.list?.map((item: any) => ({
        dataDate: new Date(item.dt * 1000).toLocaleDateString(),
        timestamp: new Date(item.dt * 1000).toTimeString().slice(0, 5),
        temp: item.main.temp,
      }))
    : [];

  const tempDataGenerate = () => {
    const tempData = futureForecast
      ? futureForecast?.list?.map((item: any) => ({
          date: new Date(item.dt * 1000).toDateString(),
          time: new Date(item.dt * 1000).toLocaleTimeString(),
          temp: item.main.temp,
        }))
      : [];
    return tempData;
  };

  console.log(tempData, tempDataGenerate());

  const config3 = {
    data: tempDataGenerate().slice(3, 40) || [],
    xField: "temp",
    yField: "date",
    seriesField: "time",
  };

  if (forecastError || error) {
    return (
      <div className="w-scren h-screen text-6xl flex items-center justify-center">
        Error retrieving data or api limit reached.
      </div>
    );
  }

  if (geoError && lat === null && long === null) {
    return (
      <div className="w-scren h-screen flex items-center justify-center flex-col">
        <span className="text-4xl ">
          Please allow location information to view data and refresh the page.
        </span>
        <span className="text-4xl ">
          To continue without your current location {lat} {long}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              setLat(0);
              setLong(0);
            }}
          >
            Click Here
          </span>
        </span>
      </div>
    );
  }

  if (forecastLoading || loading) {
    return (
      <div className="w-scren h-screen text-6xl flex items-center justify-center">
        Loading
      </div>
    );
  }

  return (
    <Layout location={forecast?.name}>
      <div className="grid lg:grid-cols-5 lg:gap-4 grid-cols-1 gap-x-0 gap-y-4">
        <div className="grid lg:grid-cols-5 lg:gap-4 gap-y-8 gap-x-2 col-span-4 grid-cols-1 md:grid-cols-2  bg-white p-6 rounded-lg border border-orange-200">
          <div className="p-4 rounded-md col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-8xl font-bold text-gray-700">
              {forecast?.main?.temp?.toFixed(1) || 0}º
            </h3>
            <span className="text-gray-700">
              Feels like {forecast?.main?.feels_like?.toFixed(1) || 0}º
            </span>
            <h5 className="text-xl text-gray-700">
              {forecast?.weather[0]?.main || "Haze"}
            </h5>
            <p className="text-sm text-gray-500 capitalize">
              {forecast?.weather[0]?.description || "Haze"}
            </p>
          </div>
          <ForcastCard
            icon={`https://openweathermap.org/img/wn/${futureForecast?.list[13]?.weather[0]?.icon}@4x.png`}
            temperature={futureForecast?.list[8]?.main?.temp.toFixed(1)}
            day={getDayoftheWeek(futureForecast?.list[8]?.dt * 1000)}
            date={new Date(futureForecast?.list[8]?.dt * 1000).toDateString()}
          />
          <ForcastCard
            icon={`https://openweathermap.org/img/wn/${futureForecast?.list[21]?.weather[0]?.icon}@4x.png`}
            temperature={futureForecast?.list[16]?.main?.temp.toFixed(1)}
            day={getDayoftheWeek(futureForecast?.list[16]?.dt * 1000)}
            date={new Date(futureForecast?.list[16]?.dt * 1000).toDateString()}
          />
          <ForcastCard
            icon={`https://openweathermap.org/img/wn/${futureForecast?.list[29]?.weather[0]?.icon}@4x.png`}
            temperature={futureForecast?.list[24]?.main?.temp.toFixed(1)}
            day={getDayoftheWeek(futureForecast?.list[24]?.dt * 1000)}
            date={new Date(futureForecast?.list[24]?.dt * 1000).toDateString()}
          />
          <ForcastCard
            icon={`https://openweathermap.org/img/wn/${futureForecast?.list[37]?.weather[0]?.icon}@4x.png`}
            temperature={futureForecast?.list[32]?.main?.temp.toFixed(1)}
            day={getDayoftheWeek(futureForecast?.list[32]?.dt * 1000)}
            date={new Date(futureForecast?.list[32]?.dt * 1000).toDateString()}
          />
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg border border-orange-200 text-center flex flex-col justify-between order-first lg:order-last">
          <h3 className="text-xl font-semibold text-gray-700">Welcome</h3>
          <h2 className="text-4xl font-bold text-gray-700">
            <DigitalClock />
          </h2>
          <div>
            <h3 className="text-md font-semibold text-gray-700">
              {getDayoftheWeek(Date.now())}
            </h3>
            <h3 className="text-md font-semibold text-gray-700">
              {new Date().toLocaleDateString("en-US", options)}
            </h3>
          </div>
        </div>
      </div>
      <span className="text-xl mt-4 block">Today's Highlight</span>
      <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <WeatherCard
          image="./humidity.png"
          title="Humidity"
          value={`${forecast?.main?.humidity} %`}
        />
        <WeatherCard
          image="./atmospheric.png"
          title="Pressure"
          value={`${forecast?.main?.pressure} mbar`}
        />
        <WeatherCard
          image="./storm.png"
          title="Wind Speed"
          value={`${forecast?.wind?.speed} km/h`}
        />
        <WeatherCard
          image="./low-visibility.png"
          title="Visibility"
          value={`${forecast?.visibility / 1000} km`}
        />
        <WeatherCard
          image="./cloudy.png"
          title="Clouds"
          value={`${forecast?.clouds?.all}`}
        />
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 mt-4 gap-4">
        <div className="border w-100 h-80 p-6 rounded-md bg-white shadow-md">
          <div className="h-60">
            <Gauge {...config} />
            <div className="flex mt-4 justify-center gap-36">
              <p className="text-xl font-semibold text-gray-400">Sunrise</p>
              <p className="text-xl font-semibold text-gray-400">Sunset</p>
            </div>
          </div>
        </div>
        <div className="border w-100 h-80 p-6 rounded-md bg-white shadow-md">
          <div className="h-60">
            <Gauge {...config2} />
            <div className="flex mt-4 justify-center gap-36">
              <p className="md:text-md text-xs font-semibold text-gray-400">
                Min Temp {forecast?.main?.temp_min || 0}
              </p>
              <p className="md:text-md text-xs font-semibold text-gray-400">
                Max Temp {forecast?.main?.temp_min || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border w-100 h-80 p-6 rounded-md bg-white lg:col-span-2 col-span-1">
          <div className="h-60">
            <Bar {...config3} />
            <div className="flex mt-4 justify-center gap-36">
              <p className="text-xl font-semibold text-gray-400">
                Temperature Trend
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
