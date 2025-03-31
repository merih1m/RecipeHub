import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Home from "./routes/home.tsx";
import FavoriteRecipe from "./routes/favoriteRecipe.tsx";
import Header from "@/components/Header.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import RecipeDetail from "./routes/RecipeDetail.tsx";
import Cart from "@/routes/Cart.tsx";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite-recipe" element={<FavoriteRecipe />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
