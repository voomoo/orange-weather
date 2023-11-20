import Topbar from "./topbar";

interface IProps {
    children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
    return (
        <div>
            <Topbar />
            <div className="container bg-gray-50 py-8">{children}</div>
            <h1>Footer</h1>
        </div>
    );
};

export default Layout;
