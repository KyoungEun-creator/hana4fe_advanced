export type TRecipe = {
  id: number;
  title: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};

export const recipes: TRecipe[] = [
  {
    id: 1,
    title: '참깨라면',
    tags: ['참깨', '라면'],
    ingredients: ['참깨', '라면'],
    steps: ['1.참깨를 넣는다.', '2.라면을 넣는다.'],
  },
  {
    id: 2,
    title: '파계란',
    tags: ['파', '계란'],
    ingredients: ['파', '계란'],
    steps: ['1.파를 넣는다.', '2.계란을 넣는다.'],
  },
  {
    id: 3,
    title: '햄버거',
    tags: ['햄', '버거'],
    ingredients: ['햄', '버거'],
    steps: ['1.햄을 넣는다.', '2.버거를 넣는다.'],
  },
];
