import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const LIMIT = 8;
export async function fetchRecipes(page: number, limit: number = LIMIT) {
  const skip = (page - 1) * limit;
  return axios
    .get(
      `https://dummyjson.com/recipes?sortBy=name&order=asc&limit=${limit}&skip=${skip}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch recipes"
      );
    });
}

export async function searchRecipes(query: string) {
  return axios
    .get(`https://dummyjson.com/recipes/search?q=${query}`)
    .then((response) => response.data.recipes)
    .catch((error) => {
      console.error("Error searching recipes:", error);
      return [];
    });
}
