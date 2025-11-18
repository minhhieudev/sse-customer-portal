export default function OverviewCard({ stats }) {
  return (
    <section className="rounded-[28px] border border-indigo-50 bg-gradient-to-br from-[#f5f3ff] to-white p-6 shadow-[0_18px_50px_rgba(75,56,189,0.08)]">
      <header className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
          Tổng quan
        </p>
        <p className="text-sm text-slate-500">
          Tiến độ các luồng khách hàng đang xây dựng.
        </p>
      </header>
      <dl className="grid gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/80 px-4 py-3"
          >
            <dt className="text-sm text-slate-500">{stat.label}</dt>
            <dd className="text-lg font-semibold text-[#1f2050]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
