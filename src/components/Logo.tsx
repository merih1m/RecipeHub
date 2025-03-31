import Recepeicon from "../../public/recipes-svgrepo-com.svg";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider.tsx";

export default function Logo() {
  const getSystemTheme = (): "dark" | "light" =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const { theme } = useTheme();
  const appliedTheme = theme === "system" ? getSystemTheme() : theme;
  return (
    <div className="flex flex-row">
      <img
        src={Recepeicon}
        className={twMerge("w-10", appliedTheme === "dark" ? "invert" : "")}
      />

      <Link to={"/"} className="text-3xl">
        Recipes
      </Link>
    </div>
  );
}
