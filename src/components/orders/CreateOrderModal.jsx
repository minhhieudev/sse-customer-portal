"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Checkbox,
} from "@nextui-org/react";
import {
  Package,
  User,
  Phone,
  Mail,
  Send,
  Zap,
  ShoppingCart,
  Search,
} from "lucide-react";


const serviceOptions = [
  { value: "sse-express", label: "SSE Express" },
  { value: "fedex", label: "FEDEX" },
  { value: "dhl", label: "DHL" },
  { value: "tnt", label: "TNT" },
];

const countryOptions = ["Việt Nam", "Singapore", "United States", "Hong Kong", "Australia"];

const shipmentReasons = [
  { value: "commercial", label: "Commercial" },
  { value: "gift", label: "Gift" },
  { value: "sample", label: "Sample" },
];

const shipmentTypes = [
  { value: "pack", label: "Hàng hóa" },
  { value: "doc", label: "Tài liệu" },
];

export default function CreateOrderModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    serviceCode: "sse-express",
    pickup: true,
    insurance: false,
    packageCount: "1",
    packageWeight: "",
    packageLength: "",
    packageWidth: "",
    packageHeight: "",
    shipmentType: "pack",
    shipmentReason: "commercial",
    senderName: "",
    senderPhone: "",
    senderEmail: "",
    senderAddress: "",
    senderCountry: "Việt Nam",
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverCountry: "",
    notes: "",
  });

  // Search & Filter State
  const [searchSender, setSearchSender] = useState("");
  const [searchReceiver, setSearchReceiver] = useState("");

  // Mock saved contacts data
  const savedContacts = useMemo(() => [
    { id: 1, name: "Nguyễn Văn A", phone: "0901234567", email: "a@example.com", address: "123 Đường Lê Lợi, Hà Nội" },
    { id: 2, name: "Trần Thị B", phone: "0912345678", email: "b@example.com", address: "456 Đường Hoàng Liệt, Hà Nội" },
    { id: 3, name: "Công Ty XYZ", phone: "0923456789", email: "info@xyz.com", address: "789 Đường Quang Trung, TP HCM" },
    { id: 4, name: "Phạm Minh Tuấn", phone: "0934567890", email: "tuan@example.com", address: "101 Đường Nguyễn Huệ, TP HCM" },
  ], []);

  // Filter contacts based on search
  const filteredSenderContacts = useMemo(() => {
    if (!searchSender) return [];
    const query = searchSender.toLowerCase();
    return savedContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.email.toLowerCase().includes(query)
    );
  }, [searchSender, savedContacts]);

  const filteredReceiverContacts = useMemo(() => {
    if (!searchReceiver) return [];
    const query = searchReceiver.toLowerCase();
    return savedContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query) ||
        contact.email.toLowerCase().includes(query)
    );
  }, [searchReceiver, savedContacts]);

  // Handle contact selection
  const selectContact = (contact, type) => {
    if (type === "sender") {
      setFormData((prev) => ({
        ...prev,
        senderName: contact.name,
        senderPhone: contact.phone,
        senderEmail: contact.email,
        senderAddress: contact.address,
      }));
      setSearchSender("");
    } else {
      setFormData((prev) => ({
        ...prev,
        receiverName: contact.name,
        receiverPhone: contact.phone,
        receiverEmail: contact.email,
        receiverAddress: contact.address,
      }));
      setSearchReceiver("");
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      serviceCode: "sse-express",
      pickup: true,
      insurance: false,
      packageCount: "1",
      packageWeight: "",
      packageLength: "",
      packageWidth: "",
      packageHeight: "",
      shipmentType: "pack",
      shipmentReason: "commercial",
      senderName: "",
      senderPhone: "",
      senderEmail: "",
      senderAddress: "",
      senderCountry: "Việt Nam",
      receiverName: "",
      receiverPhone: "",
      receiverEmail: "",
      receiverAddress: "",
      receiverCountry: "",
      notes: "",
    });
  };

  const weightNumber = Number(formData.packageWeight) || 0;
  const pieces = Math.max(Number(formData.packageCount) || 0, 1);
  const length = Number(formData.packageLength) || 0;
  const width = Number(formData.packageWidth) || 0;
  const height = Number(formData.packageHeight) || 0;

  const dimensionalWeight = length && width && height ? (length * width * height * pieces) / 5000 : 0;
  const billableWeight = Math.max(weightNumber * pieces, dimensionalWeight);

  const estimatedFee = useMemo(() => {
    if (!billableWeight) return 0;
    const serviceMultiplier = {
      dhl: 11000,
      fedex: 10000,
      tnt: 9000,
      "sse-express": 8500,
    }[formData.serviceCode] || 9000;

    let fee = Math.max(45000, Math.round(billableWeight * serviceMultiplier));
    if (formData.pickup) fee += 12000;
    if (formData.insurance) fee += Math.round(Math.max(fee * 0.01, 15000));
    return fee;
  }, [billableWeight, formData.insurance, formData.pickup, formData.serviceCode]);

  const formatCurrency = (value) => {
    if (!value) return "—";
    const number = Number(value);
    if (Number.isNaN(number)) return "—";
    return `${number.toLocaleString("vi-VN")} đ`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 reset-margin z-[9999] flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="relative max-w-6xl w-full max-h-[92vh] bg-white rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tạo đơn hàng</h2>
                <p className="text-sm text-gray-600">Nhanh • Đơn giản • Tự động tối ưu</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
              <Zap className="h-3 w-3 inline mr-1" />
              Trực tuyến
            </span>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Tab 1: Service */}
            <div className="space-y-3 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 border border-blue-200">
              <h3 className="flex items-center gap-2 font-bold text-gray-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <ShoppingCart className="h-4 w-4" />
                </div>
                Chọn dịch vụ
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="serviceCode" className="block text-sm font-medium text-slate-700 mb-1">
                    Dịch vụ chính
                  </label>
                  <Select
                    selectedKeys={[formData.serviceCode]}
                    onSelectionChange={(keys) => setFormData((prev) => ({ ...prev, serviceCode: keys.currentKey }))}
                    className="w-full"
                  >
                    {serviceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-700">Lấy hàng tận nơi?</p>
                  <RadioGroup
                    orientation="horizontal"
                    value={formData.pickup ? "yes" : "no"}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, pickup: value === "yes" }))}
                  >
                    <Radio value="yes">Có</Radio>
                    <Radio value="no">Khách tự giao</Radio>
                  </RadioGroup>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    isSelected={formData.insurance}
                    onValueChange={(checked) => setFormData((prev) => ({ ...prev, insurance: checked }))}
                    className="mr-2"
                  >
                    <span className="text-sm text-slate-700">Bảo hiểm hàng hóa</span>
                  </Checkbox>
                </div>
              </div>
            </div>

            {/* Tab 2: Package Info */}
            <div className="space-y-3 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 border border-amber-200">
              <h3 className="flex items-center gap-2 font-bold text-gray-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                  <Package className="h-4 w-4" />
                </div>
                Thông tin hàng hóa
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="packageCount" className="block text-sm font-medium text-slate-700 mb-1">
                    Số kiện
                  </label>
                  <input
                    type="number"
                    id="packageCount"
                    name="packageCount"
                    value={formData.packageCount}
                    onChange={handleChange}
                    min={1}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                  />
                </div>
                <div>
                  <label htmlFor="packageWeight" className="block text-sm font-medium text-slate-700 mb-1">
                    Cân nặng (kg)
                  </label>
                  <input
                    type="number"
                    id="packageWeight"
                    name="packageWeight"
                    value={formData.packageWeight}
                    onChange={handleChange}
                    min={0}
                    step={0.1}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700">Kích thước (cm)</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: "packageLength", label: "Dài" },
                    { key: "packageWidth", label: "Rộng" },
                    { key: "packageHeight", label: "Cao" },
                  ].map((field) => (
                    <div key={field.key}>
                      <label htmlFor={field.key} className="block text-sm font-medium text-slate-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        id={field.key}
                        name={field.key}
                        value={formData[field.key]}
                        onChange={handleChange}
                        min={0}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="shipmentReason" className="block text-sm font-medium text-slate-700 mb-1">
                    Loại hàng
                  </label>
                  <select
                    id="shipmentReason"
                    name="shipmentReason"
                    value={formData.shipmentReason}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                  >
                    {shipmentReasons.map((reason) => (
                      <option key={reason.value} value={reason.value}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="shipmentType" className="block text-sm font-medium text-slate-700 mb-1">
                    Loại bưu gửi
                  </label>
                  <select
                    id="shipmentType"
                    name="shipmentType"
                    value={formData.shipmentType}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                  >
                    {shipmentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1">
                  Ghi chú cho SSE (tuỳ chọn)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Hàng dễ vỡ, cần gọi trước, thời gian nhận..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                ></textarea>
              </div>
            </div>

            {/* Tab 3: Sender & Receiver */}
            <div className="space-y-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100/50 p-4 border border-green-200">
              <h3 className="flex items-center gap-2 font-bold text-gray-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <User className="h-4 w-4" />
                </div>
                Thông tin gửi & nhận
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Sender Info */}
                <div className="space-y-3 rounded-lg bg-blue-50 p-3 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white text-xs font-bold">
                        1
                      </div>
                      Người gửi
                    </h4>
                  </div>
                  
                  {/* Search for saved contacts */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm người gửi (tên, SĐT, email)..."
                      value={searchSender}
                      onChange={(e) => setSearchSender(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-10 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    />
                    <Search className="h-4 w-4 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    {searchSender && (
                      <button type="button" onClick={() => setSearchSender("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700">
                        ×
                      </button>
                    )}
                    {searchSender && filteredSenderContacts.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border-2 border-blue-300 bg-white shadow-2xl">
                        {filteredSenderContacts.map((contact, idx) => (
                          <button
                            key={contact.id}
                            type="button"
                            onClick={() => selectContact(contact, "sender")}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-100 transition-colors text-sm font-medium ${
                              idx !== filteredSenderContacts.length - 1 ? "border-b border-slate-200" : ""
                            }`}
                          >
                            <p className="font-bold text-gray-900">{contact.name}</p>
                            <p className="text-xs text-blue-600 mt-1">📞 {contact.phone} • 📧 {contact.email}</p>
                            <p className="text-xs text-gray-500 mt-1">📍 {contact.address}</p>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchSender && filteredSenderContacts.length === 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border-2 border-blue-200 bg-white p-3 text-center text-sm text-gray-500">
                        Không tìm thấy liên hệ phù hợp
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="senderName" className="block text-sm font-medium text-slate-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="senderPhone" className="block text-sm font-medium text-slate-700 mb-1">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        id="senderPhone"
                        name="senderPhone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-10 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="senderEmail" className="block text-sm font-medium text-slate-700 mb-1">
                      Email (tuỳ chọn)
                    </label>
                    <div className="relative">
                      <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        id="senderEmail"
                        name="senderEmail"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-10 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="senderAddress" className="block text-sm font-medium text-slate-700 mb-1">
                      Địa chỉ lấy hàng
                    </label>
                    <input
                      type="text"
                      id="senderAddress"
                      name="senderAddress"
                      value={formData.senderAddress}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="senderCountry" className="block text-sm font-medium text-slate-700 mb-1">
                      Quốc gia
                    </label>
                    <select
                      id="senderCountry"
                      name="senderCountry"
                      value={formData.senderCountry}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    >
                      {countryOptions.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Receiver Info */}
                <div className="space-y-3 rounded-lg bg-indigo-50 p-3 border border-indigo-100">
                  <div className="flex items-center justify-between">
                    <h4 className="flex items-center gap-2 font-semibold text-gray-900">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                        2
                      </div>
                      Người nhận
                    </h4>
                  </div>

                  {/* Search for saved contacts */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Tìm kiếm người nhận (tên, SĐT, email)..."
                      value={searchReceiver}
                      onChange={(e) => setSearchReceiver(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-10 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    />
                    <Search className="h-4 w-4 text-indigo-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    {searchReceiver && (
                      <button type="button" onClick={() => setSearchReceiver("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700">
                        ×
                      </button>
                    )}
                    {searchReceiver && filteredReceiverContacts.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border-2 border-indigo-300 bg-white shadow-2xl">
                        {filteredReceiverContacts.map((contact, idx) => (
                          <button
                            key={contact.id}
                            type="button"
                            onClick={() => selectContact(contact, "receiver")}
                            className={`w-full px-4 py-3 text-left hover:bg-indigo-100 transition-colors text-sm font-medium ${
                              idx !== filteredReceiverContacts.length - 1 ? "border-b border-slate-200" : ""
                            }`}
                          >
                            <p className="font-bold text-gray-900">{contact.name}</p>
                            <p className="text-xs text-indigo-600 mt-1">📞 {contact.phone} • 📧 {contact.email}</p>
                            <p className="text-xs text-gray-500 mt-1">📍 {contact.address}</p>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchReceiver && filteredReceiverContacts.length === 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border-2 border-indigo-200 bg-white p-3 text-center text-sm text-gray-500">
                        Không tìm thấy liên hệ phù hợp
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="receiverName" className="block text-sm font-medium text-slate-700 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverPhone" className="block text-sm font-medium text-slate-700 mb-1">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="tel"
                        id="receiverPhone"
                        name="receiverPhone"
                        value={formData.receiverPhone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-10 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="receiverEmail" className="block text-sm font-medium text-slate-700 mb-1">
                      Email (tuỳ chọn)
                    </label>
                    <div className="relative">
                      <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="email"
                        id="receiverEmail"
                        name="receiverEmail"
                        value={formData.receiverEmail}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 pl-10 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="receiverAddress" className="block text-sm font-medium text-slate-700 mb-1">
                      Địa chỉ giao hàng
                    </label>
                    <input
                      type="text"
                      id="receiverAddress"
                      name="receiverAddress"
                      value={formData.receiverAddress}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="receiverCountry" className="block text-sm font-medium text-slate-700 mb-1">
                      Quốc gia
                    </label>
                    <select
                      id="receiverCountry"
                      name="receiverCountry"
                      value={formData.receiverCountry}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-[#5146ff] focus:ring-[#5146ff]/50"
                    >
                      <option value="">Chọn quốc gia</option>
                      {countryOptions.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-lg">📊 Tóm tắt đơn hàng</p>
                  <span className="font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                    {formData.senderCountry} → {formData.receiverCountry || "?"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                  <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 text-center shadow-md">
                    <p className="text-xs font-semibold opacity-90">Cước dự kiến</p>
                    <p className="text-lg font-bold mt-1">{formatCurrency(estimatedFee)}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white p-3 text-center shadow-md">
                    <p className="text-xs font-semibold opacity-90">Khối lượng</p>
                    <p className="text-lg font-bold mt-1">
                      {billableWeight ? `${billableWeight.toFixed(1)}kg` : "—"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white p-3 text-center shadow-md">
                    <p className="text-xs font-semibold opacity-90">Số kiện</p>
                    <p className="text-lg font-bold mt-1">{formData.packageCount}</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 text-center shadow-md">
                    <p className="text-xs font-semibold opacity-90">Dịch vụ</p>
                    <p className="text-xs font-bold mt-1">
                      {serviceOptions.find((s) => s.value === formData.serviceCode)?.label || "—"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 gap-2 bg-white px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 mr-2"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg px-4 py-2 bg-gradient-to-r from-[#5146ff] to-[#7c8bff] text-white flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Gửi yêu cầu
          </button>
        </div>
      </div>
    </div>
  );
}
