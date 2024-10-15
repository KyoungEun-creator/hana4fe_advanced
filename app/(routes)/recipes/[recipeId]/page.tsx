export default async function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  return <>{recipeId}</>;
}
