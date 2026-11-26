import { cn } from "@/lib/utils";

/** Marca da Prostore: colarinho de camisa com botões. Acompanha o tema. */
const LogoMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    aria-hidden
    className={cn("size-8", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="7" className="fill-primary" />
    <g
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-primary-foreground"
    >
      <path d="M11 8.5 16 14l5-5.5" />
      <path d="M11 8.5 8.5 14l4.5 2.5L16 14l3 2.5 4.5-2.5L21 8.5" />
      <path d="M16 14v11" />
    </g>
    <circle cx="16" cy="19" r="1.2" className="fill-thread" />
    <circle cx="16" cy="23" r="1.2" className="fill-thread" />
  </svg>
);

export default LogoMark;
