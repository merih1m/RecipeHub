import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu.tsx";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={twMerge(navigationMenuTriggerStyle(), "text-xl")}
          >
            <Link to="/favorite-recipe">Favorite-Recipe</Link>
          </NavigationMenuLink>
          <NavigationMenuLink
            asChild
            className={twMerge(navigationMenuTriggerStyle(), "text-xl")}
          >
            <Link to="/cart">Cart</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
