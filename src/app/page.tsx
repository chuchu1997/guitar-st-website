


import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, ShoppingCart, Clock, Zap, Music, Guitar, Drum } from 'lucide-react';
import Banner from './components/banner';
import { FlashSaleComponentView } from './components/flash-sale';
import { SectionHeader } from '@/components/ui/section/section-header';
import { ProductQuickView } from '@/types/product';
import { ProductWidgets } from '@/components/ui/product/product';
import FeatureProducts from './components/feature-products';


const MusicStoreLanding: React.FC = () => {



 
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Banner Section */}
      <Banner/>

      {/* Flash Sale Section */}
      <FlashSaleComponentView/>

      {/* Featured Products */}
      <FeatureProducts/>

      {/* Guitars */}
      {/* <section className="py-16 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Guitars" icon={<Guitar className="text-black" size={24} />} />
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {guitars.map(product => (
                          <ProductWidgets.productCardQuickView key={product.id} {...product} />

            ))}
          </div>
        </div>
      </section> */}

      {/* Guitar Accessories */}
      {/* <section className="py-16">
        <div className="container mx-auto px-6">
          <SectionHeader title="Guitar Accessories" icon={<Music className="text-black" size={24} />} />
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {accessories.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Drums & Wind Instruments */}
      {/* <section className="py-16 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="container mx-auto px-6">
          <SectionHeader title="Drums & Wind Instruments" icon={<Drum className="text-black" size={24} />} />
          <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {drumsWindInstruments.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Recommended for You */}
      {/* <section className="py-16">
        <div className="container mx-auto px-6">
          <SectionHeader title="Recommended for You" icon={<Star className="text-black" size={24} />} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {recommended.map(product => (
              <ProductWidgets.productCardQuickView key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default MusicStoreLanding;