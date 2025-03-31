import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchRecipes } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useClickAway } from "react-use";
import debounce from "lodash.debounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim().length > 1) {
        const recipes = await searchRecipes(value);
        setResults(recipes);
      } else {
        setResults([]);
      }
    }, 500),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleRecipeClick = (recipe: any) => {
    setQuery("");
    setResults([]);
    navigate(`/recipe/${recipe.id}`, { state: { ...recipe } });
  };

  useClickAway(searchRef, () => {
    setQuery("");
    setResults([]);
  });

  return (
    <div className="relative w-full" ref={searchRef}>
      <Input
        type="text"
        placeholder="Search recipes..."
        value={query}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
      {results.length > 0 && (
        <ul className="absolute bg-background w-full border rounded-md mt-1 shadow-md z-10">
          {results.map((recipe) => (
            <li
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe)}
              className="p-2 cursor-pointer hover:bg-muted-foreground"
            >
              {recipe.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
