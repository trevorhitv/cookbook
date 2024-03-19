import { eq, sql, asc } from "drizzle-orm";
import { db } from "~/.server/db/db";
import {
  InsertRecipeSchema,
  InsertRecipeStepSchema,
  SelectRecipeSchema,
  recipes,
  recipeSteps,
  recipeIngredients,
  InsertRecipeIngredientSchema,
  InsertRecipeTagSchema,
  recipeTags,
  InsertRecipeImageSchema,
  recipeImages,
} from "~/.server/db/schema/recipe.server";
import { RecipeSearchArraySchema } from "~/resources/recipe.server";

export async function createRecipe(
  data: InsertRecipeSchema,
): Promise<InsertRecipeSchema["id"]> {
  const recipeId = await db
    .insert(recipes)
    .values(data)
    .returning({ insertedId: recipes.id });

  return recipeId[0].insertedId;
}

export async function getRecipeById(
  id: SelectRecipeSchema["id"],
): Promise<SelectRecipeSchema | null> {
  const recipe = await db.select().from(recipes).where(eq(recipes.id, id));

  return recipe[0];
}

export async function getRecipeBySlug(slug: string) {
  const recipe = await db.select().from(recipes).where(eq(recipes.slug, slug));

  return recipe[0];
}

export async function getRecipeSteps(id: number) {
  return await db
    .select()
    .from(recipeSteps)
    .where(eq(recipeSteps.recipeId, id))
    .all();
}

export async function getRecipeTags(id: number) {
  return await db
    .select()
    .from(recipeTags)
    .where(eq(recipeTags.recipeId, id))
    .all();
}

export async function getRecipeIngredients(id: number) {
  return await db
    .select()
    .from(recipeIngredients)
    .where(eq(recipeIngredients.recipeId, id))
    .all();
}

export async function getRecipeImages(id: number) {
  return await db
    .select()
    .from(recipeImages)
    .where(eq(recipeImages.id, id))
    .all();
}

export async function createRecipeSteps(steps: InsertRecipeStepSchema[]) {
  if (steps.length > 0) await db.insert(recipeSteps).values(steps);
}

export async function createRecipeIngredients(
  ingredients: InsertRecipeIngredientSchema[],
) {
  if (ingredients.length > 0)
    await db.insert(recipeIngredients).values(ingredients);
}

export async function createRecipeTags(tags: InsertRecipeTagSchema[]) {
  if (tags.length > 0) await db.insert(recipeTags).values(tags);
}

export async function createRecipeImages(images: InsertRecipeImageSchema[]) {
  if (images.length > 0) await db.insert(recipeImages).values(images);
}

export async function searchRecipes(query: string) {
  const recipesResult = await db.run(
    sql`select slug, title, description from recipe where slug in (select slug from recipe_search WHERE recipe_search MATCH lower(${query}));`,
  );

  const resultRows = recipesResult.rows;
  const parsedRows = await RecipeSearchArraySchema.parseAsync(resultRows);
  return parsedRows;
}

export async function getRecipes(limit: number, offset: number) {
  const recipesResult = await db
    .select({
      slug: recipes.slug,
      title: recipes.title,
      description: recipes.description,
    })
    .from(recipes)
    .orderBy(asc(recipes.id)) // order by is mandatory
    .limit(limit)
    .offset(offset);

  return recipesResult;
}

export async function getRecipeCount() {
  const result = await db
    .select({
      count: sql<number>`cast(count(${recipes.id}) as int)`,
    })
    .from(recipes);

  return result[0].count;
}

export async function deleteRecipeById(id: number) {
  await db.delete(recipes).where(eq(recipes.id, id));
}

export async function getRandomRecipes(count: number) {
  const result = await db
    .select()
    .from(recipes)
    .orderBy(sql`RANDOM()`)
    .limit(count)
    .all();

  return result;
}
