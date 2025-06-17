
"use client";


import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, ShoppingCart, Clock, Zap, Music, Guitar, Drum } from 'lucide-react';
import Banner from './components/banner';
import { FlashSaleComponentView } from './components/flash-sale';
import { SectionHeader } from '@/components/ui/section/section-header';
import { ProductQuickView } from '@/types/product';
import { ProductWidgets } from '@/components/ui/product/product';


const MusicStoreLanding: React.FC = () => {



  const bannerSlides = [
    {
      title: "Premium Guitars Collection",
      subtitle: "Discover Your Perfect Sound",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=400&fit=crop",
      cta: "Shop Now"
    },
    {
      title: "Professional Drum Sets",
      subtitle: "Beat the Rhythm of Excellence",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      cta: "Explore"
    },
    {
      title: "Complete Music Setup",
      subtitle: "Everything You Need to Create",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
      cta: "Get Started"
    }
  ];


  const featuredProducts: ProductQuickView[] = [
    { id: 5, name: "Yamaha FG830 Acoustic", price: 299, image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300&h=300&fit=crop", rating: 4.6, reviews: 324 },
    { id: 6, name: "Epiphone Les Paul Studio", price: 449, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", rating: 4.5, reviews: 278 },
    { id: 7, name: "Ibanez RG421", price: 329, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop", rating: 4.4, reviews: 145 },
    { id: 8, name: "Seagull S6 Original", price: 399, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", rating: 4.7, reviews: 198 }
  ];

  const guitars: ProductQuickView[] = [
    { id: 9, name: "PRS SE Custom 24", price: 829, image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300&h=300&fit=crop", rating: 4.8, reviews: 167 },
    { id: 10, name: "Telecaster Player", price: 599, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", rating: 4.6, reviews: 234 },
    { id: 11, name: "Gretsch G2622", price: 499, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop", rating: 4.5, reviews: 156 },
    { id: 12, name: "Rickenbacker 330", price: 1899, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", rating: 4.9, reviews: 89 }
  ];

  const accessories: ProductQuickView[] = [
    { id: 13, name: "Boss Katana-50 Amp", price: 229, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", rating: 4.7, reviews: 345 },
    { id: 14, name: "Ernie Ball Strings Set", price: 12, image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300&h=300&fit=crop", rating: 4.8, reviews: 892 },
    { id: 15, name: "Dunlop Pick Variety Pack", price: 8, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", rating: 4.6, reviews: 567 },
    { id: 16, name: "Fender Guitar Stand", price: 25, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop", rating: 4.5, reviews: 234 }
  ];

  const drumsWindInstruments: ProductQuickView[] = [
    { id: 17, name: "Pearl Export Series", price: 699, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop", rating: 4.6, reviews: 178 },
    { id: 18, name: "Yamaha Alto Saxophone", price: 1299, image: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=300&h=300&fit=crop", rating: 4.8, reviews: 134 },
    { id: 19, name: "DW Performance Series", price: 1199, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop", rating: 4.7, reviews: 89 },
    { id: 20, name: "Bach Trumpet TR300H2", price: 449, image: "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?w=300&h=300&fit=crop", rating: 4.5, reviews: 67 }
  ];

  const recommended: ProductQuickView[] = [
    { id: 21, name: "Audio-Technica ATH-M50x", price: 149, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop", rating: 4.9, reviews: 2345 },
    { id: 22, name: "Shure SM58 Microphone", price: 99, image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=300&h=300&fit=crop", rating: 4.8, reviews: 1567 },
    { id: 23, name: "Focusrite Scarlett 2i2", price: 169, image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop", rating: 4.7, reviews: 897 },
    { id: 24, name: "Akai MPK Mini MK3", price: 119, image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop", rating: 4.6, reviews: 456 }
  ];


 
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Banner Section */}
      <Banner/>

      {/* Flash Sale Section */}
      <FlashSaleComponentView/>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <SectionHeader title="Featured Products" icon={<Star className="text-black" size={24} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Guitars */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Guitars" icon={<Guitar className="text-black" size={24} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guitars.map(product => (
                          <ProductWidgets.productCardQuickView key={product.id} {...product} />

            ))}
          </div>
        </div>
      </section>

      {/* Guitar Accessories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <SectionHeader title="Guitar Accessories" icon={<Music className="text-black" size={24} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {accessories.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Drums & Wind Instruments */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Drums & Wind Instruments" icon={<Drum className="text-black" size={24} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {drumsWindInstruments.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended for You */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <SectionHeader title="Recommended for You" icon={<Star className="text-black" size={24} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommended.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MusicStoreLanding;