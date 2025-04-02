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
  }
  export interface Category {
    id:string;
    billboard:Billboard
    name:string;
    slug:string;
    products:Product[];
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
   
    
  }

  export interface Image {
    id:string;
    url:string;

  }