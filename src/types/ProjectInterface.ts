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
  export interface Product {
    // Identification
    id: string;
    name: string;
    slug: string;
    brand: string;
    model: string;
  
    // Categorization
    mainCategory: MainCategoryEnum;
    subcategory?: PhoneSubcategoryEnum | string;
  
    // Descriptions
    shortDescription: string;
    fullDescription: string;
  
    // Media
    primaryImageUrl: string;
    additionalImageUrls?: string[];
  
    // Pricing and Inventory
    pricing: ProductPricing;
    inventory: ProductInventory;
  
    // Technical Specifications
    specifications: ProductSpecification[];
  
    // Variants
    variants?: {
      id: string;
      color: string;
      storage: string;
      additionalPrice?: number;
    }[];
  
    // Additional Metadata
    releaseDate: Date;
    isNewModel: boolean;
    isBestSeller: boolean;
  }
  
  // Category Interface
  export interface Category {
    // Identification
    id: string;
    name: string;
    slug: string;
  
    // Hierarchy
    parentId?: string;
    mainCategory: MainCategoryEnum;
  
    // Descriptive Information
    description?: string;
    imageUrl?: string;
  
    // Subcategories or Nested Items
    subcategories?: string[];
    
    // Product Relationship
    productIds: string[];
  
    // Display and Navigation
    displayOrder?: number;
    isActive: boolean;
  }




  // EXAMPLE USING 



  const exampleProducts = {
    // iPhone Product
    iPhone14Pro: {
      id: 'prod_iphone_14_pro',
      name: 'iPhone 14 Pro',
      slug: 'iphone-14-pro',
      brand: 'Apple',
      model: iPhoneModelEnum.IPHONE_14_PRO,
  
      mainCategory: MainCategoryEnum.PHONES,
      subcategory: PhoneSubcategoryEnum.IOS,
  
      shortDescription: 'Advanced iPhone with professional camera system',
      fullDescription: 'Experience the most powerful and advanced iPhone yet.',
  
      primaryImageUrl: '/images/iphone-14-pro-main.jpg',
      additionalImageUrls: [
        '/images/iphone-14-pro-side.jpg',
        '/images/iphone-14-pro-back.jpg'
      ],
  
      pricing: {
        basePrice: 999.99,
        salePrice: 899.99,
        discountPercentage: 10
      },
  
      inventory: {
        totalQuantity: 1000,
        availableQuantity: 750
      },
  
      specifications: [
        { key: 'Display', value: '6.1-inch Super Retina XDR display' },
        { key: 'Chip', value: 'A16 Bionic chip' },
        { key: 'Camera', value: 'Pro camera system with 48MP main' }
      ],
  
      variants: [
        {
          id: 'var_iphone_14_pro_purple',
          color: 'Deep Purple',
          storage: '128GB'
        },
        {
          id: 'var_iphone_14_pro_gold',
          color: 'Gold',
          storage: '256GB',
          additionalPrice: 100
        }
      ],
  
      releaseDate: new Date('2022-09-16'),
      isNewModel: false,
      isBestSeller: true
    },
  
    // MacBook Product
    MacBookPro14: {
      id: 'prod_macbook_pro_14',
      name: 'MacBook Pro 14-inch',
      slug: 'macbook-pro-14-inch',
      brand: 'Apple',
      model: AppleLaptopModelEnum.MACBOOK_PRO_14,
  
      mainCategory: MainCategoryEnum.LAPTOPS,
      subcategory: LaptopBrandEnum.APPLE,
  
      shortDescription: 'Powerful MacBook Pro with M2 Pro chip',
      fullDescription: 'Professional-level performance for creative professionals.',
  
      primaryImageUrl: '/images/macbook-pro-14-main.jpg',
      additionalImageUrls: [
        '/images/macbook-pro-14-side.jpg',
        '/images/macbook-pro-14-open.jpg'
      ],
  
      pricing: {
        basePrice: 1999.99,
        salePrice: 1799.99,
        discountPercentage: 10
      },
  
      inventory: {
        totalQuantity: 500,
        availableQuantity: 350
      },
  
      specifications: [
        { key: 'Chip', value: 'Apple M2 Pro' },
        { key: 'Display', value: '14.2-inch Liquid Retina XDR display' },
        { key: 'Memory', value: '16GB unified memory' }
      ],
  
      variants: [
        {
          id: 'var_macbook_pro_14_silver',
          color: 'Silver',
          storage: '512GB SSD'
        },
        {
          id: 'var_macbook_pro_14_space_gray',
          color: 'Space Gray',
          storage: '1TB SSD',
          additionalPrice: 200
        }
      ],
  
      releaseDate: new Date('2023-01-17'),
      isNewModel: false,
      isBestSeller: true
    }
  };
  
  // Example Categories
  const exampleCategories = {
    // Main Phone Category
    PhonesCategory: {
      id: 'cat_phones',
      name: 'Phones',
      slug: 'phones',
      mainCategory: MainCategoryEnum.PHONES,
      description: 'Explore our range of mobile phones',
      imageUrl: '/images/categories/phones.jpg',
      subcategories: [
        PhoneSubcategoryEnum.ANDROID,
        PhoneSubcategoryEnum.IOS
      ],
      productIds: [
        'prod_iphone_14_pro'
      ],
      displayOrder: 1,
      isActive: true
    },
  
    // iOS Phones Subcategory
    iOSPhonesCategory: {
      id: 'cat_ios_phones',
      name: 'iOS Phones',
      slug: 'ios-phones',
      parentId: 'cat_phones',
      mainCategory: MainCategoryEnum.PHONES,
      description: 'Latest iPhone models',
      productIds: [
        'prod_iphone_14_pro'
      ],
      displayOrder: 2,
      isActive: true
    },
  
    // Laptops Main Category
    LaptopsCategory: {
      id: 'cat_laptops',
      name: 'Laptops',
      slug: 'laptops',
      mainCategory: MainCategoryEnum.LAPTOPS,
      description: 'Powerful laptops for work and play',
      imageUrl: '/images/categories/laptops.jpg',
      subcategories: [
        LaptopBrandEnum.APPLE,
        LaptopBrandEnum.DELL,
        LaptopBrandEnum.HP,
        LaptopBrandEnum.LENOVO,
        LaptopBrandEnum.ASUS
      ],
      productIds: [
        'prod_macbook_pro_14'
      ],
      displayOrder: 2,
      isActive: true
    },
  
    // Apple Laptops Subcategory
    AppleLaptopsCategory: {
      id: 'cat_apple_laptops',
      name: 'Apple Laptops',
      slug: 'apple-laptops',
      parentId: 'cat_laptops',
      mainCategory: MainCategoryEnum.LAPTOPS,
      description: 'MacBook laptops',
      productIds: [
        'prod_macbook_pro_14'
      ],
      displayOrder: 1,
      isActive: true
    }
  };
  