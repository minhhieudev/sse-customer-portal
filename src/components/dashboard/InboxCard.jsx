export default function InboxCard({ contacts }) {
  return (
    <section className="rounded-[28px] border border-indigo-50 bg-white/95 p-6 shadow-[0_18px_50px_rgba(75,56,189,0.08)]">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-300">
            Trung tâm trao đổi
          </p>
          <p className="text-sm text-slate-500">
            Ghi chú nhanh từ các team liên quan.
          </p>
        </div>
        <button className="text-xs font-semibold text-[#5146ff] hover:text-[#372ce6]">
          Xem tất cả
        </button>
      </header>
      <ul className="space-y-3">
        {contacts.map((contact) => (
          <li
            key={contact.name}
            className="flex items-center gap-3 rounded-2xl border border-indigo-50 px-3 py-2"
          >
            <Avatar name={contact.name} online={contact.online} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1f2050]">
                {contact.name}
              </p>
              <p className="text-xs text-slate-500">{contact.message}</p>
            </div>
            <span className="text-xs text-slate-400">1 phút trước</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Avatar({ name, online }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="relative">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ffa4e3] to-[#ffd995] text-sm font-semibold text-[#1f2050]">
        {initials}
      </div>
      {online && (
        <span className="absolute -right-0.5 -top-0.5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-[#27da8c]" />
      )}
    </div>
  );
}
