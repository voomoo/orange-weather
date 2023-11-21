import { Button } from "@/components/ui/button";
import { Search, LocateFixed } from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "@/api/axios-instance";
import { Input } from "@/components/ui/input";
import { latAtom, longAtom } from "@/hooks/useGeolocation";
import { useAtom } from "jotai";

interface IProps {
    location?: string;
}

const Topbar: React.FC<IProps> = ({ location }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const lat = useAtom(latAtom);
    const long = useAtom(longAtom);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue) {
                setLoading(true);
                Axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=100f863d3d4fae06325740a0023ccd30`)
                    .then((response) => {
                        setData(response.data);
                        setLoading(false);
                        console.log(response.data);
                    })
                    .catch((error) => {
                        setError(error);
                        setLoading(false);
                    });
            }
        }, 1000);

        return () => clearTimeout(timer); // this will clear Timeout
        // if useEffect is run again before 1s (user types something in input)
    }, [inputValue]);

    return (
        <nav className="border-b bg-white fixed top-0 w-screen">
            <div className="container my-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">
                    <span className="text-orange-500">GDN</span>TEST
                </h3>
                <div className="relative hidden md:block">
                    <div className="relative hidden md:block">
                        <Input placeholder="Search Location" className="w-96 pr-9 text-gray-500" onChangeCapture={handleInputChange} />
                        <Search className="w-4 h-4 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
                        {inputValue && (
                            <div className="fixed bg-white w-96 p-4 z-10 border-b border-r border-l">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {data?.map((item: any) => (
                                    <span
                                        key={item?.lat}
                                        className="block p-2 cursor-pointer hover:text-orange-500"
                                        onClick={() => {
                                            lat[1](item?.lat);
                                            long[1](item?.lon);
                                        }}
                                    >
                                        {item?.name}, {item?.state}, {item?.country}
                                    </span>
                                ))}
                                {loading && <span className="block p-2 cursor-pointer hover:text-orange-500">Loading...</span>}
                                {error && <span className="block p-2 cursor-pointer hover:text-orange-500">Error...</span>}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <Button variant={"outline"} size={"sm"} className="pointer-events-none">
                        <LocateFixed className="w-4 h-4 mr-2" />
                        {location}
                    </Button>
                    <Button size={"sm"} className="ml-2 inline-block md:hidden">
                        <Search className="w-4 h-4 text-white" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Topbar;
