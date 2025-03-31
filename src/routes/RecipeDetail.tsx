import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const RecipeDetail = () => {
  const location = useLocation();
  const {
    id,
    name,
    mealType,
    ingredients,
    instructions,
    cuisine,
    rating,
    image,
  } = location.state || {};

  if (!id) {
    return (
      <div className="text-center text-destructive text-xl">
        Recipe not found!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-primary mb-4">{name}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={image}
          alt={name}
          className="h-80 w-full md:w-1/2 object-cover rounded-lg"
        />
        <div className="flex flex-col justify-start  w-full md:w-1/2">
          <p className="text-lg">
            <strong>Meal Type:</strong> {mealType}
          </p>
          <p className="text-lg">
            <strong>Cuisine:</strong> {cuisine}
          </p>
          <p className="text-lg">
            <strong>Rating:</strong> {rating} ⭐
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <Card className="mt-2">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Ingredient</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients?.map((item: number, index: number) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <Card className="mt-2">
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            {instructions?.map((step: number, index: number) => (
              <li key={index} className="text-lg">
                {step}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeDetail;
