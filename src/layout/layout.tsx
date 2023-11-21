import { Button } from "@/components/ui/button";
import Topbar from "./topbar";
import { Dribbble, Github, Linkedin } from "lucide-react";

interface IProps {
  children: React.ReactNode;
  location?: string;
}

const Layout: React.FC<IProps> = ({ children, location }) => {
  return (
    <div>
      <Topbar location={location} />
      <div className="container bg-gray-50 py-8 mb-10 mt-16">{children}</div>
      <footer className="py-2 px-8 border-t flex items-center justify-between fixed w-screen bottom-0 bg-white">
        <h1 className="text-center text-sm">
          Created by Rakibul Hasan with 💙
        </h1>
        <div className="flex items-center gap-2">
          <a href="https://github.com/voomoo" target="_blank">
            <Button size={"sm"}>
              <Github className="w-4 h-4" />
            </Button>
          </a>
          <a
            href="https://www.linkedin.com/in/rakibul-hasan-922708155/"
            target="_blank"
          >
            <Button size={"sm"}>
              <Linkedin className="w-4 h-4" />
            </Button>
          </a>
          <a href="https://dribbble.com/voomoo" target="_blank">
            <Button size={"sm"}>
              <Dribbble className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
