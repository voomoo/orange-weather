import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LocateFixed } from "lucide-react";

const Topbar = () => {
    return (
        <nav className="border-b">
            <div className="container my-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">
                    <span className="text-orange-500">GDN</span>TEST
                </h3>
                <div className="relative hidden md:block">
                    <Input placeholder="Search Location" className="w-96 pr-9 text-gray-500" name="search" />
                    <Search className="w-4 h-4 absolute top-1/2 right-4 -translate-y-1/2 text-gray-400" />
                </div>
                <div>
                    <Button variant={"outline"} size={"sm"} className="pointer-events-none">
                        <LocateFixed className="w-4 h-4 mr-2" />
                        Dhaka, Bangladesh
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
