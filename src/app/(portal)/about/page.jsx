import { ShieldCheck, Rocket, Users, TrendingUp, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-brand-blue text-white">
        <div className="page-container py-16 text-center">
          <h1 className="text-2xl font-bold font-display tracking-tight sm:text-4xl">
            Về Saigon Speed
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto text-blue-100">
            Chuyên gia hàng đầu trong lĩnh vực chuyển phát nhanh quốc tế, mang đến giải pháp vận chuyển tối ưu và đáng tin cậy cho mọi khách hàng.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex gap-6">
                <Target className="w-12 h-12 text-brand-orange flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold text-brand-blue font-display">Sứ Mệnh Của Chúng Tôi</h2>
                  <p className="mt-2 text-lg text-slate-600">
                    SaiGonSpeed Express chuyên cung cấp các giải pháp giao hàng chuyển phát nhanh quốc tế tại Việt Nam, kết nối doanh nghiệp và cá nhân với thế giới một cách nhanh chóng và hiệu quả.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <Eye className="w-12 h-12 text-brand-orange flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold text-brand-blue font-display">Tầm Nhìn Doanh Nghiệp</h2>
                  <p className="mt-2 text-lg text-slate-600">
                    Trở thành nhà cung cấp hàng đầu trong ngành chuyển phát nhanh quốc tế, không ngừng mang đến dịch vụ tối ưu nhất cho khách hàng thông qua kinh nghiệm dày dặn và hợp tác chuyên nghiệp.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="/banner.png" alt="Saigon Speed Team" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-slate-50 py-20">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-brand-blue font-display">Giá Trị Cốt Lõi</h2>
            <p className="mt-4 text-lg text-slate-600">
              Nền tảng cho mọi hoạt động của chúng tôi, đảm bảo chất lượng dịch vụ và sự hài lòng của khách hàng.
            </p>
          </div>
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={ShieldCheck}
              title="Chuyên Nghiệp"
              description="Cung cấp dịch vụ thông qua các đối tác toàn cầu uy tín như FedEx, UPS, và TNT, đảm bảo tiêu chuẩn cao nhất."
            />
            <ValueCard
              icon={Users}
              title="Khách Hàng Là Trung Tâm"
              description="Luôn nỗ lực để cung cấp dịch vụ tối ưu và phù hợp nhất với nhu cầu đa dạng của từng khách hàng."
            />
            <ValueCard
              icon={Rocket}
              title="Đáng Tin Cậy & Kinh Nghiệm"
              description="Xây dựng niềm tin dựa trên nhiều năm kinh nghiệm trong lĩnh vực vận chuyển quốc tế, xử lý mọi lô hàng một cách an toàn."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="page-container text-center">
          <h2 className="text-4xl font-bold text-brand-blue font-display">Tại Sao Chọn Saigon Speed?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-12 text-left">
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-lg">
              <h3 className="text-xl font-bold text-brand-orange">Đối Tác Toàn Cầu</h3>
              <p className="mt-2 text-slate-600">Hợp tác với các hãng vận chuyển lớn nhất thế giới, đảm bảo mạng lưới rộng khắp và thời gian vận chuyển nhanh chóng.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-lg">
              <h3 className="text-xl font-bold text-brand-orange">Giải Pháp Tối Ưu</h3>
              <p className="mt-2 text-slate-600">Tư vấn và cung cấp các giải pháp vận chuyển phù hợp nhất với chi phí cạnh tranh, đáp ứng mọi yêu cầu của bạn.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-lg">
              <h3 className="text-xl font-bold text-brand-orange">Hỗ Trợ Tận Tâm</h3>
              <p className="mt-2 text-slate-600">Đội ngũ nhân viên chuyên nghiệp luôn sẵn sàng hỗ trợ 24/7, theo dõi và xử lý mọi vấn đề phát sinh.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="mx-auto w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-brand-blue">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  );
}