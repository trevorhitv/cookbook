import { SelectRecipeSchema } from "~/db/schema/recipe.server";
import RecipeBox from "./recipeBox";

interface RecipeGridProps {
  recipes: SelectRecipeSchema[];
}

export default function RecipeGrid(props: RecipeGridProps) {
  const { recipes } = props;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {recipes.map((recipe, idx) => (
        <li
          key={idx}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <RecipeBox recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}