


interface CartImage {
  url: string;
}

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  stockQuantity: number;
  stockAvailable:number;
  
  isSelect: boolean;
  images: CartImage[];
}
