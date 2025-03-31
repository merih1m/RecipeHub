import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button.tsx";
import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RecipeCard({
  id,
  name,
  mealType,
  ingredients,
  instructions,
  cuisine,
  rating,
  image,
}: {
  id: number;
  name: string;
  mealType: string;
  ingredients: string[];
  instructions: string[];
  cuisine: string;
  rating: number;
  image: string;
}) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLikes = JSON.parse(
      localStorage.getItem("likedRecipes") || "{}"
    );
    if (storedLikes[id]) {
      setLiked(true);
    }
  }, [id]);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const storedLikes = JSON.parse(
      localStorage.getItem("likedRecipes") || "{}"
    );

    if (liked) {
      delete storedLikes[id];
      toast("Recipe was removed from Favorite Recipes.");
    } else {
      storedLikes[id] = true;
      toast("Recipe was added to Favorite Recipes.");
    }

    setLiked(!liked);
    localStorage.setItem("likedRecipes", JSON.stringify(storedLikes));

    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const storedIngredients = JSON.parse(
      sessionStorage.getItem("cart") || "[]"
    );

    const updatedIngredients = Array.from(
      new Set([...storedIngredients, ...ingredients])
    );
    sessionStorage.setItem("cart", JSON.stringify(updatedIngredients));

    toast("Ingredients were added to the Cart page.");
  };

  const handleCardClick = () => {
    navigate(`/recipe/${id}`, {
      state: {
        id,
        name,
        mealType,
        ingredients,
        instructions,
        cuisine,
        rating,
        image,
      },
    });
  };

  return (
    <Card
      className="flex flex-col p-4 justify-center sm:max-w-xs md:max-w-sm lg:max-w-md border border-cartBorder shadow dark:bg-headerBg dark:cartBorder"
      onClick={handleCardClick}
    >
      <CardHeader className="relative">
        <Button
          onClick={handleLike}
          className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-black shadow-md transition-colors hover:bg-transparent dark:hover:bg-transparent"
        >
          <Heart
            className={`w-6 h-6 transition-colors duration-900 ${
              liked ? "text-red-500" : "text-black dark:text-white"
            }`}
          />
        </Button>
        <img
          src={image}
          alt={name}
          className="h-65 sm:h-39 md:h-44 lg:h-76 w-full object-cover aspect-[3/4]"
        />
      </CardHeader>

      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>MealType: {mealType}</CardDescription>
        <CardDescription>Cuisine: {cuisine}</CardDescription>
        <CardDescription>Rating: {rating}⭐</CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
