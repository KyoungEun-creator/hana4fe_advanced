export type TRecipeVersion = {
  date: string;
  recipe: TRecipe;
};

export type TRecipe = {
  id: number;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  versions: TRecipeVersion[];
};
