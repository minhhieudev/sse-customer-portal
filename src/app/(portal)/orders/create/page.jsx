"use client";

import { useState } from "react";
import { ArrowLeft, Package, MapPin, User } from "lucide-react";
import Link from "next/link";

export default function CreateOrderPage() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    packageWeight: "",
    packageDimensions: "",
    deliveryDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", formData);
    // Here you would typically send this data to an API
    alert("Đơn hàng đã được tạo thành công (chức năng giả lập)!");
    // Optionally redirect to orders list or show success message
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/orders" className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-[#1f2050]">Tạo đơn hàng mới</h1>
          <p className="mt-1 text-slate-500">
            Điền thông tin chi tiết để tạo một yêu cầu gửi hàng mới.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-8">
        {/* Thông tin người gửi */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1f2050] flex items-center gap-2">
            <User className="h-5 w-5 text-[#5146ff]" /> Thông tin người gửi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="senderName" className="block text-sm font-medium text-slate-700">
                Họ và tên
              </label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                required
              />
            </div>
            <div>
              <label htmlFor="senderPhone" className="block text-sm font-medium text-slate-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="senderPhone"
                name="senderPhone"
                value={formData.senderPhone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="senderAddress" className="block text-sm font-medium text-slate-700">
                Địa chỉ
              </label>
              <input
                type="text"
                id="senderAddress"
                name="senderAddress"
                value={formData.senderAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                required
              />
            </div>
          </div>
        </section>

        {/* Thông tin người nhận */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1f2050] flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#5146ff]" /> Thông tin người nhận
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="receiverName" className="block text-sm font-medium text-slate-700">
                Họ và tên
              </label>
              <input
                type="text"
                id="receiverName"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                required
              />
            </div>
            <div>
              <label htmlFor="receiverPhone" className="block text-sm font-medium text-slate-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="receiverPhone"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="receiverAddress" className="block text-sm font-medium text-slate-700">
                Địa chỉ
              </label>
              <input
                type="text"
                id="receiverAddress"
                name="receiverAddress"
                value={formData.receiverAddress}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                required
              />
            </div>
          </div>
        </section>

        {/* Thông tin gói hàng */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-[#1f2050] flex items-center gap-2">
            <Package className="h-5 w-5 text-[#5146ff]" /> Thông tin gói hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="packageWeight" className="block text-sm font-medium text-slate-700">
                Trọng lượng (kg)
              </label>
              <input
                type="number"
                id="packageWeight"
                name="packageWeight"
                value={formData.packageWeight}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                step="0.1"
              />
            </div>
            <div>
              <label htmlFor="packageDimensions" className="block text-sm font-medium text-slate-700">
                Kích thước (DxRxC cm)
              </label>
              <input
                type="text"
                id="packageDimensions"
                name="packageDimensions"
                value={formData.packageDimensions}
                onChange={handleChange}
                placeholder="VD: 10x20x30"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
              />
            </div>
            <div>
              <label htmlFor="deliveryDate" className="block text-sm font-medium text-slate-700">
                Ngày giao hàng mong muốn
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
                Ghi chú
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-[#5146ff] focus:ring-[#5146ff]/50"
              ></textarea>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Link
            href="/orders"
            className="rounded-full px-6 py-3 text-base font-semibold text-slate-600 transition-colors hover:bg-slate-100"
          >
            Hủy
          </Link>
          <button
            type="submit"
            className="rounded-full bg-[#5146ff] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#5146ff]/30 transition-transform hover:scale-105"
          >
            Tạo đơn hàng
          </button>
        </div>
      </form>
    </div>
  );
}
