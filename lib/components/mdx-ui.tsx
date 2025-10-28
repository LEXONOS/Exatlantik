import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";

/* === Encadré / Callout ========================================= */
export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warn";
  title?: string;
  children: React.ReactNode;
}) {
  const styles =
    type === "tip"
      ? "border-teal-300/60 bg-white/70"
      : type === "warn"
      ? "border-amber-300/70 bg-white/70"
      : "border-sky-300/60 bg-white/70";
  const dot =
    type === "tip" ? "from-[#0FB5AE] to-cyan-500" : type === "warn" ? "from-amber-400 to-orange-400" : "from-sky-400 to-indigo-400";

  return (
    <div className={`not-prose my-6 rounded-2xl border p-4 shadow-sm backdrop-blur-xl ${styles}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className={`h-2 w-2 rounded-full bg-gradient-to-r ${dot}`} />
        {title || (type === "tip" ? "Astuce" : type === "warn" ? "À surveiller" : "À savoir")}
      </div>
      <div className="mt-2 text-[15px] leading-7 text-slate-700">{children}</div>
    </div>
  );
}

/* === Citation mise en avant =================================== */
export function PullQuote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <figure className="my-8 rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur-xl">
      <blockquote className="text-xl font-semibold leading-8 text-slate-900">
        “{children}”
      </blockquote>
      {author && <figcaption className="mt-2 text-sm text-slate-500">— {author}</figcaption>}
    </figure>
  );
}

/* === Lien bouton ============================================== */
export function ButtonLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0FB5AE] to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
    />
  );
}

/* === Image responsive MDX ===================================== */
export function Img({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="not-prose my-8">
      <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl shadow">
        <Image
          src={src}
          alt={alt}
          width={width || 1600}
          height={height || 900}
          className="h-auto w-full object-cover"
          sizes="100vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-500">{caption}</figcaption>
      )}
    </figure>
  );
}

/* === Séparateur doux ========================================== */
export function Divider() {
  return (
    <div className="my-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
    </div>
  );
}
