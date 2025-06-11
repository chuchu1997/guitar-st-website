



export interface ImageInterface { 
    url:string;

}

interface ProductBase { 
    name:string;
    description:string;
    price:number;
    oldPrice?:number;
    isFeatured:boolean;
    slug:string;
    discount:number;
    viewCount:number;
    ratingCount:number;
    orderItems:[];
    colors:ProductColorInterface[],
    sizes:ProductSizeInterface[]
    stock:number;
    images:ImageInterface[],
    categoryId:number;
    reviews:[]
    sku:string;
    storeId:number;
    //sản phẩm này có tặng quà nào không?
    giftProducts?:any[];
    //sản phẩm này có phải quà tặng của sản phẩm nào không?
    giftedIn?:any[]



//       giftProducts GiftProduct[] @relation("ProductWithGifts")

//   // B: sản phẩm này có phải quà tặng của sản phẩm nào không?
//   giftedIn     GiftProduct[] @relation("GiftedToProduct")


    createdAt?: Date;
    updatedAt?: Date;


}

export interface ProductColorInterface {
    id?:number;
    name:string;
    productId?:number;
    hex:string;
    price?:number;
    stock:number;
}
export interface ProductSizeInterface {  
    id?:number;
    name:string;
    productId?:number;
    price?:number;
    stock:number;
   

}
export interface ProductInterface extends ProductBase{
    id:number

};