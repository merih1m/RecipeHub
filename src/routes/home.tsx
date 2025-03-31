import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import RecipeCard from "@/components/RecipeCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { fetchRecipes } from "@/lib/utils.ts";

const LIMIT = 8;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["recipes", currentPage],
    queryFn: () => fetchRecipes(currentPage),
    refetchOnWindowFocus: false,
    staleTime: 10 * 1000,
    keepPreviousData: true,
    initialData: () => queryClient.getQueryData(["recipes", currentPage]),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const nextPage = currentPage + 1;
    const totalPages = Math.ceil((data?.total || 0) / LIMIT);

    if (nextPage <= totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["recipes", nextPage],
        queryFn: () => fetchRecipes(nextPage),
        staleTime: 10 * 1000,
        cacheTime: 5 * 60 * 1000,
      });
    }
  }, [currentPage, data, queryClient]);

  if (isLoading)
    return (
      <h1 className="flex justify-center items-center min-h-screen">
        Loading...
      </h1>
    );

  if (error) return <h1>Error: {error.message}</h1>;

  const totalRecipes = data?.total || 0;
  const totalPages = Math.ceil(totalRecipes / LIMIT);
  const filteredProducts = data?.recipes ?? [];

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
        {filteredProducts.map((recipe) => (
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
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <button
                    className={`px-4 py-2 ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white rounded-full"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
