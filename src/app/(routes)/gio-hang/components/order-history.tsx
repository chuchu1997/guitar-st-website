// /** @format */
// "use client";

// // import {
// //   onCancelOrderWithID,
// //   onGetOrderByCustomerID,
// // } from "@/actions/create-order";
// import DialogConfirm from "@/components/alert-confirm";
// import OrderType from "@/types/ProjectInterface";
// import { useState, useEffect } from "react";

// import { useCookies } from "react-cookie";
// import toast from "react-hot-toast";
// const OrderHistory = () => {
//   const [orders, setOrders] = useState<OrderType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [cookies] = useCookies(["customerID"]);
//   const [isConfirmingCancel, setIsConfirmingCancel] = useState<string | null>(
//     null
//   );

//   const fetchOrders = async () => {
//     try {
//       setLoading(true); // Đảm bảo đang tải dữ liệu
//       const customerID = cookies.customerID;
//       // if (customerID) {
//       //   const res = await onGetOrderByCustomerID(customerID);
//       //   setOrders(res || []);
//       // }
//     } catch (error) {
//       console.error("Lỗi khi lấy đơn hàng:", error);
//     } finally {
//       setLoading(false); // Hoàn thành quá trình tải
//     }
//   };

//   // Gọi lại `fetchOrders` khi `customerID` thay đổi hoặc khi hủy đơn hàng thành công
//   useEffect(() => {
//     fetchOrders();
//   }, [cookies.customerID]);

//   if (loading) {
//     return <p className="text-gray-600 italic">Đang tải đơn hàng...</p>;
//   }
//   const handleCancelOrder = async (orderId: string) => {
//     const customerID = cookies.customerID;
//     if (customerID) {
//       try {
//         // Hủy đơn hàng với API
//         const res = await onCancelOrderWithID(orderId, customerID);

//         // Kiểm tra xem phản hồi từ API có hợp lệ không
//         if (res) {
//           toast.success("Đơn hàng đã được hủy thành công!");
//           console.log("Dữ liệu sau khi hủy:", res);
//           // Cập nhật lại danh sách đơn hàng
//           fetchOrders();

//           // Đóng modal xác nhận hủy đơn hàng
//           setIsConfirmingCancel(null);
//         } else {
//           toast.error("Không thể cập nhật đơn hàng.");
//         }
//       } catch (error) {
//         console.error("Lỗi khi hủy đơn hàng:", error);
//         toast.error("Lỗi khi hủy đơn hàng!");
//       }
//     }
//   };
//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Lịch sử đơn hàng</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-600 italic">Bạn chưa có đơn hàng nào.</p>
//       ) : (
//         <div className="space-y-5">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
//               <div className="flex justify-between items-center mb-3">
//                 <div>
//                   <p className="text-sm text-gray-500">
//                     Mã đơn hàng:{" "}
//                     <span className="font-semibold">{order.id ?? ""}</span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Ngày đặt:{" "}
//                     {new Date(order.createAt ?? "").toLocaleDateString()}
//                   </p>
//                 </div>

//                 <span
//                   className={`text-sm font-semibold px-3 py-1 rounded-full ${
//                     order.orderStatus === "pending"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : order.orderStatus === "completed"
//                       ? "bg-green-100 text-green-700"
//                       : order.orderStatus === "shipped"
//                       ? "bg-blue-100 text-blue-700"
//                       : order.orderStatus === "delivered"
//                       ? "bg-purple-100 text-purple-700"
//                       : order.orderStatus === "cancelled"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-gray-100 text-gray-600"
//                   }`}>
//                   {order.orderStatus === "pending"
//                     ? "Đang chờ xử lý"
//                     : order.orderStatus === "completed"
//                     ? "Đã xác nhận"
//                     : order.orderStatus === "shipped"
//                     ? "Đã gửi hàng"
//                     : order.orderStatus === "delivered"
//                     ? "Đã giao hàng"
//                     : order.orderStatus === "cancelled"
//                     ? "Đã huỷ"
//                     : order.orderStatus}
//                 </span>
//               </div>

//               {/* Sản phẩm đã đặt */}
//               <div className="space-y-4">
//                 {order.orderItems?.map((item: any) => (
//                   <div
//                     key={item.productId}
//                     className="flex items-center justify-between border-t pt-4 text-sm text-gray-700">
//                     <img
//                       src={item.product.images[0].url}
//                       alt={item.product.name}
//                       className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shadow-sm"
//                     />
//                     <div className="flex-1 ml-4">
//                       <p className="font-semibold text-gray-900">
//                         {item.product.name}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Giá: {item.product.price.toLocaleString()}₫
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         Số lượng: {item.quantity}
//                       </p>
//                     </div>
//                     <p className="font-medium text-gray-900">
//                       {(item.product.price * item.quantity).toLocaleString()}₫
//                     </p>
//                   </div>
//                 ))}

//                 <div className="mt-4 flex justify-between items-center font-medium text-xl text-accent">
//                   <span>Tổng tiền:</span>
//                   <span>{order.totalPrice.toLocaleString()}₫</span>
//                 </div>

//                 {/* Nút hủy đơn hàng */}
//                 {order.orderStatus === "pending" && (
//                   <button
//                     onClick={() => setIsConfirmingCancel(order.id ?? "")}
//                     className="mt-4 px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
//                     Hủy đơn hàng
//                   </button>
//                 )}

//                 {/* Modal xác nhận hủy đơn hàng */}
//                 <DialogConfirm
//                   title="Bạn có chắc muốn hủy ?"
//                   description="Nếu bạn đồng ý hủy sẽ không hoàn lại được !!"
//                   isOpen={!!isConfirmingCancel}
//                   onCancel={() => setIsConfirmingCancel(null)}
//                   onConfirm={() => handleCancelOrder(isConfirmingCancel ?? "")}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderHistory;
