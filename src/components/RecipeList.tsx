import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRecipes } from "@/lib/utils";
import Search from "./Search";

export default function RecipeList() {
  const [recipes, setRecipes] = useState<{ id: number; name: string }[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      const results = await searchRecipes(query);
      setRecipes(results);
    } else {
      setRecipes([]);
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      {recipes.length > 0 && (
        <ul className="border border-gray-300 rounded-md p-2">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
