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
  
  // Phone-specific Enums
  export enum iPhoneModelEnum {
    IPHONE_14 = 'iPhone 14',
    IPHONE_14_PRO = 'iPhone 14 Pro',
    IPHONE_14_PRO_MAX = 'iPhone 14 Pro Max',
    IPHONE_15 = 'iPhone 15',
    IPHONE_15_PRO = 'iPhone 15 Pro',
    IPHONE_15_PRO_MAX = 'iPhone 15 Pro Max'
  }
  
  // Laptop-specific Enums
  export enum AppleLaptopModelEnum {
    MACBOOK_AIR = 'MacBook Air',
    MACBOOK_PRO_13 = 'MacBook Pro 13-inch',
    MACBOOK_PRO_14 = 'MacBook Pro 14-inch',
    MACBOOK_PRO_16 = 'MacBook Pro 16-inch'
  }
  
  // Common Interfaces
  export interface ProductSpecification {
    key: string;
    value: string;
  }
  
  export interface ProductPricing {
    basePrice: number;
    salePrice?: number;
    discountPercentage?: number;
  }
  
  export interface ProductInventory {
    totalQuantity: number;
    availableQuantity: number;
  }
  
  // Product Interface
  // export interface Product {
  //   // Identification
  //   id: string;
  //   name: string;
  //   slug: string;
  //   brand: string;
  //   model: string;
  
  //   // Categorization
  //   mainCategory: MainCategoryEnum;
  //   subcategory?: PhoneSubcategoryEnum | string;
  
  //   // Descriptions
  //   shortDescription: string;
  //   fullDescription: string;
  
  //   // Media
  //   primaryImageUrl: string;
  //   additionalImageUrls?: string[];
  
  //   // Pricing and Inventory
  //   pricing: ProductPricing;
  //   inventory: ProductInventory;
  
  //   // Technical Specifications
  //   specifications: ProductSpecification[];
  
  //   // Variants
  //   variants?: {
  //     id: string;
  //     color: string;
  //     storage: string;
  //     additionalPrice?: number;
  //   }[];
  
  //   // Additional Metadata
  //   releaseDate: Date;
  //   isNewModel: boolean;
  //   isBestSeller: boolean;
  // }
  
  // // Category Interface
  // export interface Category {
  //   // Identification
  //   id: string;
  //   name: string;
  //   slug: string;
  
  //   // Hierarchy
  //   parentId?: string;
  //   mainCategory: MainCategoryEnum;
  
  //   // Descriptive Information
  //   description?: string;
  //   imageUrl?: string;
  
  //   // Subcategories or Nested Items
  //   subcategories?: string[];
    
  //   // Product Relationship
  //   productIds: string[];
  
  //   // Display and Navigation
  //   displayOrder?: number;
  //   isActive: boolean;
  // }



  



  ///NEW INSTANCE INTERFACE !!!



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