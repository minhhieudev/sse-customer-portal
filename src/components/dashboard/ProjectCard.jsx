import Image from "next/image";

export default function ProjectCard({ project }) {
  return (
    <article className="rounded-[32px] border border-indigo-50 bg-white/95 p-6 shadow-[0_22px_60px_rgba(75,56,189,0.09)]">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <span className="inline-flex items-center rounded-full bg-[#f0edff] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#5146ff]">
            {project.badge}
          </span>
          <h3 className="mt-3 text-2xl font-semibold text-[#1f2050]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-500">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-[#f7f7fd] px-3 py-1 text-xs font-semibold text-[#5146ff]"
              >
                {chip}
              </span>
            ))}
          </div>

          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.points.map((point) => (
              <div
                key={point.label}
                className="rounded-2xl border border-indigo-50 bg-[#f9f8ff] p-4"
              >
                <dt className="text-xs uppercase tracking-[0.3em] text-indigo-300">
                  {point.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-[#1f2050]">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-[#5146ff] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(81,70,255,0.3)] transition hover:bg-[#3c32d7]">
              {project.primary}
            </button>
            <button className="rounded-full border border-indigo-100 px-4 py-2 text-sm font-semibold text-[#1f2050] transition hover:border-indigo-200 hover:text-[#5146ff]">
              {project.secondary}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="relative flex h-64 w-64 items-center justify-center rounded-[36px] p-6"
            style={{
              background: `linear-gradient(135deg, ${project.accent.from}, ${project.accent.to})`,
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={220}
              height={220}
              className="object-contain"
              priority={project.id === "auth"}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
