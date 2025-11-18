export default function PageHeader({ label, title, description, children }) {
  return (
    <section className="rounded-[32px] border border-indigo-50 bg-gradient-to-br from-[#f3f1ff] to-white p-6 shadow-[0_22px_60px_rgba(75,56,189,0.09)]">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
          {label}
        </p>
      )}
      <h1 className="mt-2 text-3xl font-semibold text-[#1f2050]">{title}</h1>
      <p className="mt-2 text-slate-500">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}
