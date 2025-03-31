import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "@/components/RecipeCard.tsx";
import { fetchRecipes } from "../lib/utils";

export default function FavoriteRecipe() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allRecipes"],
    queryFn: () => fetchRecipes(1, 1000),
  });

  const [likedRecipes, setLikedRecipes] = useState<any[]>([]);

  const updateLikedRecipes = () => {
    const storedLikes = JSON.parse(
      localStorage.getItem("likedRecipes") || "{}"
    );

    if (data?.recipes) {
      const likedRecipesData = data.recipes.filter(
        (recipe: any) => storedLikes[recipe.id]
      );
      setLikedRecipes(likedRecipesData);
    }
  };

  useEffect(() => {
    updateLikedRecipes();
  }, [data]);

  useEffect(() => {
    const handleStorageChange = () => {
      updateLikedRecipes();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (isLoading)
    return (
      <h1 className="flex justify-center items-center min-h-screen">
        Loading...
      </h1>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
        {likedRecipes.length === 0 ? (
          <h1 className="flex justify-center items-center min-h-screen min-w-screen">
            You don't have any Favorite Recipe at this moment.
          </h1>
        ) : (
          likedRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              mealType={recipe.mealType}
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              cuisine={recipe.cuisine}
              rating={recipe.rating}
              image={recipe.image}
            />
          ))
        )}
      </div>
    </div>
  );
}
