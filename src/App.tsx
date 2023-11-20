import WeatherCard from "./components/ui/forcast-card";
import useCurrentTime from "./hooks/useCurrentTime";
import Layout from "./layout/layout";
import { Gauge } from "@ant-design/plots";

const getDayoftheWeek = () => {
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date: Date = new Date();
    return days[date.getDay()];
};

const options = { day: "numeric", month: "long", year: "numeric" };

const sunset = 1700482560;
const sunrise = 1700435460;
const minTemp = 297.56;
const maxTemp = 300.05;
const temp = 299.15;

function App() {
    const currentTime = useCurrentTime();
    const config = {
        percent: (new Date().getTime() / 1000 - sunrise) / (sunset - sunrise),
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
                    return `${new Date(((sunset - sunrise) * v + sunrise) * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
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
    const config2 = {
        percent: (temp - minTemp) / (maxTemp - minTemp),
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
                    return `${((maxTemp - minTemp) * v + minTemp).toFixed(2)}º`;
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

    return (
        <Layout>
            <div className="grid grid-cols-5 gap-4">
                <div className="grid grid-cols-5 gap-4 col-span-4 bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="p-4 rounded-md">
                        <h3 className="text-8xl font-bold text-gray-700">16º</h3>
                        <h5 className="text-xl text-gray-700">Today</h5>
                        <p className="text-sm text-gray-500">November 20, 2023</p>
                    </div>
                    <WeatherCard temperature={16} day="Tuesday" date="20 November, 2023" />
                    <WeatherCard temperature={16} day="Tuesday" date="20 November, 2023" />
                    <WeatherCard temperature={16} day="Tuesday" date="20 November, 2023" />
                    <WeatherCard temperature={16} day="Tuesday" date="20 November, 2023" />
                </div>
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 text-center flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-700">Welcome</h3>
                    <h2 className="text-4xl font-bold text-gray-700">{currentTime.toLocaleTimeString()}</h2>
                    <div>
                        <h3 className="text-md font-semibold text-gray-700">{getDayoftheWeek()}</h3>
                        <h3 className="text-md font-semibold text-gray-700">{new Date().toLocaleDateString("en-US", options)}</h3>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 mt-4 gap-4">
                <div className="border w-100 h-80 p-6 rounded-md bg-white">
                    <div className="h-60">
                        <Gauge {...config} />
                        <div className="flex mt-4 justify-center gap-36">
                            <p className="text-xl font-semibold text-gray-400">Sunrise</p>
                            <p className="text-xl font-semibold text-gray-400">Sunset</p>
                        </div>
                    </div>
                </div>
                <div className="border w-100 h-80 p-6 rounded-md bg-white">
                    <div className="h-60">
                        <Gauge {...config2} />
                        <div className="flex mt-4 justify-center gap-36">
                            <p className="text-xl font-semibold text-gray-400">Min Temp</p>
                            <p className="text-xl font-semibold text-gray-400">Max Temp</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default App;
