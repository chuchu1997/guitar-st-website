import { FC } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

export const Footer: FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#5A3E2B] to-[#1F1B16] text-neutral-200 py-12 shadow-xl">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Giới thiệu */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white uppercase border-b-2 border-amber-500 inline-block pb-1">
            Nội thất EcoHome
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">
            Chúng tôi chuyên cung cấp nội thất gỗ cao cấp với thiết kế hiện đại, tinh tế, mang đến sự tiện nghi và sang trọng cho không gian sống của bạn.
          </p>
          <div className="text-sm text-gray-400">
            <p>© 2024 EcoHome Furniture</p>
            <p>MST: 0123456789</p>
          </div>
        </div>

        {/* Thông tin mua hàng */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white uppercase border-b-2 border-amber-500 inline-block pb-1">
            Hỗ trợ khách hàng
          </h2>
          <ul className="mt-4 space-y-4 text-base">
            <li className="flex items-center gap-3">
              <Phone className="text-amber-400 w-5 h-5" />
              <span>Đặt hàng: <strong>0938 123 456</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-amber-400 w-5 h-5" />
              <span>Bảo hành: <strong>0909 789 321</strong></span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-amber-400 w-5 h-5" />
              <span>Email: <strong>support@ecohome.vn</strong></span>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white uppercase border-b-2 border-amber-500 inline-block pb-1">
            Liên hệ
          </h2>
          <ul className="mt-4 space-y-4 text-base">
            <li className="flex items-start gap-3">
              <MapPin className="text-amber-400 w-5 h-5 mt-1" />
              <span>258 Nguyễn Văn Trỗi, P.8, Q.Phú Nhuận, TP.HCM</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="text-amber-400 w-5 h-5 mt-1" />
              <span>Hotline: <strong>0938 123 456</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="text-amber-400 w-5 h-5 mt-1" />
              <span>info@ecohome.vn</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-neutral-700 pt-6 text-center text-sm text-neutral-400">
        <p>© 2024 EcoHome Furniture. All rights reserved.</p>
        <p className="mt-1">
          Thiết kế bởi <span className="text-amber-400 hover:underline cursor-pointer">NguyenCuong</span>
        </p>
      </div>
    </div>
  </footer>
  )
}

