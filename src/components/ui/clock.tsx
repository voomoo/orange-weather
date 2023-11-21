import useCurrentTime from "@/hooks/useCurrentTime";

const DigitalClock = () => {
  const currentTime = useCurrentTime();
  return <span>{currentTime.toLocaleTimeString()}</span>;
};

export default DigitalClock;
