import { identity } from "@/content/portfolio";

// IDE status bar fixed to the bottom: the availability note stays on screen everywhere, as the brief asks.
export default function StatusBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex h-[30px] items-center gap-4 overflow-hidden whitespace-nowrap bg-ink px-4 text-[12px] text-[#dfe1e5] sm:px-8">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-live" aria-hidden="true" />
        <span className="sm:hidden">Open to roles in Ireland, Critical Skills eligible</span>
        <span className="hidden sm:inline">{identity.availability}</span>
      </span>
      <span className="ml-auto hidden text-[#9da0a8] md:inline">{identity.location}</span>
      <span className="hidden text-[#9da0a8] md:inline">C#, .NET, Angular, PostgreSQL</span>
      <span className="hidden text-[#9da0a8] md:inline">UTF-8</span>
    </div>
  );
}
