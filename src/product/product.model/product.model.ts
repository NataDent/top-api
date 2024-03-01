export class ProductModel {
  _id: string;
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  credit: number;
  calculatedRating: number;
  description: string;
  advanteges: string;
  disAdvanteges: string;
  categories: string[];
  tags: string[];
  charakteristics: {
    [key: string]: string;
  };
}
