"use client";

import { useState } from "react";
import { Building, Mail, MapPin, PhoneCall, Send, Briefcase, Landmark } from "lucide-react";
import { useToast } from "@/hooks/useToast";

const OFFICES = [
  {
    icon: Landmark,
    name: "Trụ sở chính",
    address: "Số 124/11 Cộng Hòa, Phường Tân Sơn Nhất, TP. Hồ Chí Minh",
    phone: "0889 741 931",
    email: "admin@saigonspeed.vn",
  },
  {
    icon: Briefcase,
    name: "Bưu cục Bình Thạnh",
    address: "53/2/50 Bình Lợi, Phường 13, Bình Thạnh, TPHCM",
    phone: "0909 612 186",
  },
  {
    icon: Briefcase,
    name: "Bưu cục Vũng Tàu",
    address: "D33 Lê Văn Lộc, phường 8, TP Vũng Tàu, BRVT",
    phone: "0939 917 268",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export default function ContactPage() {
  return (
    <main className="py-12 bg-white">
      <div className="page-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-blue font-display sm:text-5xl">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe bạn. Vui lòng điền vào biểu mẫu bên dưới hoặc liên hệ trực tiếp với chúng tôi qua thông tin được cung cấp.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-brand-blue mb-6">Gửi Yêu Cầu</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {OFFICES.map((office) => (
              <OfficeInfo key={office.name} {...office} />
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-brand-blue text-center mb-8">Tìm Chúng Tôi Trên Bản Đồ</h2>
          <div className="rounded-2xl overflow-hidden border-4 border-white shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.159381124499!2d106.66289931529893!3d10.8021549923064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b8cb0632af%3A0x8d389755a7eb2a3c!2zMTI0LzExIEPhu5luZyBIw7JhLCBQaMaw4budbmcgNCwgVMOibiBCw6xuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1670516059051!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}

function OfficeInfo({ icon: Icon, name, address, phone, email }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-brand-blue">{name}</h3>
        <div className="mt-2 space-y-2 text-slate-600">
          <p className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-brand-orange" />
            <span>{address}</span>
          </p>
          <p className="flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-brand-orange" />
            <a href={`tel:${phone}`} className="hover:text-brand-blue">{phone}</a>
          </p>
          {email && (
            <p className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-orange" />
              <a href={`mailto:${email}`} className="hover:text-brand-blue">{email}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const { showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      showToast("FORM_INCOMPLETE");
      return;
    }
    // Here you would typically send the form data to a server
    showToast("CONTACT_SENT");
    setFormData(INITIAL_FORM);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Họ và Tên" name="name" placeholder="Nguyễn Văn A" value={formData.name} onChange={handleChange} />
      <InputField label="Email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
      <InputField label="Số Điện Thoại" name="phone" placeholder="0123 456 789" value={formData.phone} onChange={handleChange} />
      <InputField label="Nội dung" name="message" placeholder="Bạn cần hỗ trợ về vấn đề gì?" value={formData.message} onChange={handleChange} multiline />
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-8 py-3 text-base font-bold text-white shadow-lg shadow-brand-orange/30 transition hover:bg-opacity-90 hover:shadow-xl"
      >
        Gửi Đi <Send className="h-5 w-5" />
      </button>
    </form>
  );
}

function InputField({ label, placeholder, type = "text", multiline = false, name, value, onChange }) {
  const commonProps = {
    name,
    value,
    placeholder,
    onChange,
    className: "mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50"
  };
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {multiline ? (
        <textarea {...commonProps} rows={4} />
      ) : (
        <input {...commonProps} type={type} />
      )}
    </label>
  );
}