import { ChevronRight } from "lucide-react";

export const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-3">
      <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg flex items-center">
        {/* Adjust icon size for responsiveness */}
        <div className="">
          {icon}
        </div>
      </div>
      {/* Responsive text sizes */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    <button className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <span className="text-sm md:text-base lg:text-lg">Xem tất cả</span>
      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
    </button>
  </div>
);
