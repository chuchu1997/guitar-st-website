// Enums for Categorization
export enum MainCategoryEnum {
    PHONES = 'Phones',
    LAPTOPS = 'Laptops'
  }
  
  export enum PhoneSubcategoryEnum {
    ANDROID = 'Android Phones',
    IOS = 'iOS Phones'
  }
  
  export enum LaptopBrandEnum {
    APPLE = 'Apple',
    DELL = 'Dell',
    HP = 'HP',
    LENOVO = 'Lenovo',
    ASUS = 'Asus'
  }
  

  export interface Billboard { 
    id:string;
    label:string;
    imageUrl:string;
    linkHref?:string;
    
  }
  export interface Category {
    id:string;
    billboard:Billboard
    name:string;
    slug:string;
    products:Product[];
    subcategories:SubCategory[]
    services:Service[];

  }

  
  export interface Product {
    id:string;
    name:string;
    price:number;
    images:Image[]
    description:string;
    category:Category;
    isFeatured:boolean;
    shortDescription:string;
    slug:string;
    sku:string;
    viewCount:number;
    ratingCount:number;
    stockQuantity:number;
    productSizes:ProductSize[]
  }
 export interface ProductSize{
    productId:string;
    sizeId:string;
    size:Size;
    stockQuantity:number;
    price:number;

  }
  export interface Size { 
    id:string;
    description:string;
    name:string;

  }



  export interface Service { 
     id:string;
     name:string;
     description:string;
     slug:string;
     images: Image[];
     price:number;
     category:Category;
     subcategory:SubCategory;
   
  }

  export interface SubCategory{
    id:string;
    billboard:Billboard
    name:string;
    slug:string;
    products:Product[];
    categoryId:string;
    services:Service[];
    parentCategorySlug:string;

 



  }



  export interface Image {
    id:string;
    url:string;

  }


  