import { ChevronRight } from "lucide-react";

export const SectionHeader: React.FC<{ title: React.ReactNode; icon?: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-3">
      {icon && (
        <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg flex items-center">
          {icon}
        </div>
      )}
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
        {title}
      </h2>
    </div>
    <button className="flex items-center space-x-1 bg-gradient-to-r   text-black px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold  transition-all duration-300 transform hover:scale-105">
      <span className="text-xs md:text-sm lg:text-base">Xem tất cả</span>
      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
    </button>
  </div>
);