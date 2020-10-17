export interface Product {
  productId: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  verified: boolean;
  userId: number;
}

export interface Dish {
  dishId: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  eating: string;
  weightRaw: number;
  weightCooked: number;
  verified: boolean;
  dish_product: DishProduct[];
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
}

export interface RationProduct {
  rationProductId: number;
  product: Product;
  weight: number;
  eating: string;
}

export interface DishProduct {
  dishProductId: number;
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
