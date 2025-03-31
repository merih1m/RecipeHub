import { ThemeToggle } from "@/components/theme-toggle.tsx";
import { Navigation } from "@/components/Navigation.tsx";
import Logo from "@/components/Logo.tsx";
import Search from "@/components/Search.tsx";

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-center w-full p-3 border  border--border">
      <Logo />

      <Navigation />
      <div className={"flex flex-row justify-between items-center"}>
        <ThemeToggle />
        <Search />
      </div>
    </div>
  );
}
