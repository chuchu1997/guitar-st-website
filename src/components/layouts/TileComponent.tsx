import React from 'react';

interface TileProps { 
  title: string;
}

const TileComponent: React.FC<TileProps> = (props) => {
  const { title } = props;

  return (
    <div className="flex items-center justify-center py-5 relative w-5/6 mx-auto">
      <div className="flex-grow border-t border-2 border-yellow-500 relative">
        <div className="absolute left-[-2px] -top-2.5 w-5 h-5 bg-yellow-500 rounded-full hidden sm:block"></div>
        <div className="absolute left-5 -top-2 w-4 h-4 bg-yellow-500 rounded-full hidden sm:block"></div>
      </div>
      <h1 className="mx-4 text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-800 uppercase">
        {title}
      </h1>
      <div className="flex-grow border-t border-2 border-yellow-500 relative">
        <div className="absolute right-5 -top-2 w-4 h-4 bg-yellow-500 rounded-full hidden sm:block"></div>
        <div className="absolute right-[-2px]  -top-2.5 w-5 h-5 bg-yellow-500 rounded-full hidden sm:block"></div>
      </div>
    </div>
  );
};

export default TileComponent;



