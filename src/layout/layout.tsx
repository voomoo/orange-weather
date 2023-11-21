import { Button } from "@/components/ui/button";
import Topbar from "./topbar";
import { Dribbble, Github, Linkedin } from "lucide-react";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div>
      <Topbar />
      <div className="container bg-gray-50 py-8">{children}</div>
      <div className="py-2 px-8 border-t flex items-center justify-between fixed w-screen bottom-0 bg-white">
        <h1 className="text-center text-sm">
          Created by Rakibul Hasan with 💙
        </h1>
        <div className="flex items-center gap-2">
          <Button size={"sm"}>
            <Github className="w-4 h-4" />
          </Button>
          <Button size={"sm"}>
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button size={"sm"}>
            <Dribbble className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
