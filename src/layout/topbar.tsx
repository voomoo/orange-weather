import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LocateFixed } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const Topbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container my-4 flex justify-between items-center">
        <h3 className="text-xl font-bold">
          <span className="text-orange-500">GDN</span>TEST
        </h3>
        <div className="relative hidden md:block">
          <Command className="border">
            <CommandInput placeholder="Enter a location name" />
            {/* <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                {[1, 2, 3].map((item) => (
                  <CommandItem key={item}>Calendar</CommandItem>
                ))}
              </CommandGroup>
            </CommandList> */}
          </Command>
        </div>
        <div>
          <Button
            variant={"outline"}
            size={"sm"}
            className="pointer-events-none"
          >
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
