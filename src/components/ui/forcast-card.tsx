interface IProps {
    temperature: number;
    day: string;
    date: string;
    icon?: string;
}

const ForcastCard: React.FC<IProps> = ({ temperature, day, date, icon }) => {
    return (
        <div className="bg-white p-4 rounded-md text-center border-1 border-gray-200">
            <img src={icon || "/vite.svg"} alt="weather-icon" className="mx-auto w-16 h-16 relative bottom-8 -mb-6" />
            <h3 className="text-4xl font-bold text-gray-700">
                {temperature || "N/A"}º<sup>C</sup>
            </h3>
            <h5 className="text-xl text-gray-700">{day || "Today"}</h5>
            <p className="text-sm text-gray-500">{date || "date"}</p>
        </div>
    );
};

export default ForcastCard;
