import { useTheme } from "@/provider/ThemeProvider";
import { Switch } from "./ui/switch";

const DarkLightToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex gap-2 items-center">
      <img src="sunny.png" className="size-4 dark:invert" />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <img src="moon.png" className="size-4 dark:invert" />
    </div>
  );
};

export default DarkLightToggle;
