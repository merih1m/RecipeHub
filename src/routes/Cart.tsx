import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";

export default function Cart() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    const storedIngredients = JSON.parse(
      sessionStorage.getItem("cart") || "[]"
    );
    setIngredients(storedIngredients);
  }, []);

  const clearCart = () => {
    sessionStorage.removeItem("cart");
    setIngredients([]);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <Card className="mt-2">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Ingredient</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={clearCart} className="mt-4">
            Clear Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
