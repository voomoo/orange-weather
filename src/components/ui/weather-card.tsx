interface IProps {
  image: string;
  title: string;
  value: string;
}

const WeatherCard: React.FC<IProps> = ({ image, title, value }) => {
  return (
    <div className="w-100 border rounded-md p-4 drop-shadow-xl">
      <div className="flex items-center gap-4 justify-center">
        <img src={image || "./vite.svg"} alt="pressure" />
        <span className="text-xl font-semibold">{title}</span>
      </div>
      <span className="text-4xl mt-4 block text-center">{value}</span>
    </div>
  );
};

export default WeatherCard;
