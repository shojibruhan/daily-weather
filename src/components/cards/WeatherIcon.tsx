type Props = {
  src: string;
  iconSize?: string;
};

const WeatherIcon = ({ src, iconSize }: Props) => {
  return (
    <img
      className={iconSize ? iconSize : "size-10"}
      // src={src}
      src={`https://openweathermap.org/payload/api/media/file/${src}.png`}
      alt="weather Icon"
    />
  );
};

export default WeatherIcon;
