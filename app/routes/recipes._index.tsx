import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Paginator from "~/components/paginator";
import RecipeGrid from "~/components/recipeGrid";
import SearchBar from "~/components/searchBar";
import {
  getRecipeCount,
  getRecipes,
  searchRecipes,
} from "~/models/recipe.server";

export async function loader() {
  const recipes = await getRecipes(8, 0);
  const recipeCount = await getRecipeCount();
  return { recipes, recipeCount };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);

  const skip = (parseInt(values.page as string) - 1) * 8;

  if (values.searchText === "") {
    const recipes = await getRecipes(8, skip);
    const recipeCount = await getRecipeCount();

    return { recipes, recipeCount, shouldShowPaginator: true };
  }

  const recipes = await searchRecipes(values.searchText as string);
  return { recipes, recipeCount: 1, shouldShowPaginator: false };
}

export default function RecipesPage() {
  let { recipes, recipeCount } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  if (actionData) {
    recipes = actionData.recipes;
    recipeCount = actionData.recipeCount;
  }

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-24">
      <Form method="post">
        <input name="page" value={page} hidden readOnly />
        <input name="searchText" value={searchText} hidden readOnly />
        <SearchBar setSearchText={setSearchText} page={page} />

        {recipeCount === 0 && <p className="mt-6 text-xl">No recipes found</p>}
        {recipeCount > 0 && (
          <>
            <div className="mt-6 py-4">
              <RecipeGrid recipes={recipes} />
            </div>

            {searchText === "" && recipes.length > 0 && (
              <Paginator page={page} setPage={setPage} length={recipeCount} />
            )}
          </>
        )}
      </Form>
    </div>
  );
}
