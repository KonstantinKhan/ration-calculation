export interface DataComponent {
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export interface Product extends DataComponent {
  productId: number;
  verified: boolean;
  userId: number;
}

export interface Dish extends DataComponent {
  dishId: number;
  eating: string;
  weightRaw: number;
  weightCooked: number;
  dish_product: DishProduct[];
}

export interface DishTemplate extends DataComponent {
  dishTemplateId: number;
  weightRaw: number;
  weightCooked: number;
  verified: boolean;
  dishTemplate_product: DishTemplateProduct[];
}

export interface Ration {
  rationId: number;
  date: Date;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  userId: number;
  ration_product: RationProduct[];
  ration_dish: RationDish[];
}

export interface RationProduct {
  rationProductId: number;
  product: Product;
  weight: number;
  eating: string;
}

export interface RationDish {
  rationDishId: number;
  dish: Dish;
  weight: number;
  eating: string;
}

export interface DishProduct {
  dishProductId: number;
  product: Product;
  weight: number;
}

export interface DishTemplateProduct {
  dishTemplateProductId: number;
  product: Product;
  weight: number;
}

export interface RationCompositionDish {
  dish: Dish;
  eating: string;
}

export interface User {
  userName: string;
  userPassword: string;
}

export interface AuthResponse {
  idToken: string;
  expiresIn: string;
}
