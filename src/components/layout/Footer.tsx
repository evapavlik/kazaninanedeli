import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1f1a16]">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-lora text-[15px] font-semibold text-white">
              {`K\u00E1z\u00E1n\u00ED na ned\u011Bli`}
            </p>
            <p className="mt-1 text-xs text-white/40">
              {`Pr\u016Fvodce p\u0159\u00EDpravou k\u00E1z\u00E1n\u00ED pro C\u00EDrkev \u010Deskoslovenskou husitskou`}
            </p>
          </div>
          <nav className="flex gap-6 text-xs text-white/50">
            <Link href="/o-projektu" className="transition-colors hover:text-white/80">
              O projektu
            </Link>
            <Link href="/metodika" className="transition-colors hover:text-white/80">
              Metodika
            </Link>
            <Link href="/zdroje" className="transition-colors hover:text-white/80">
              Zdroje
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
