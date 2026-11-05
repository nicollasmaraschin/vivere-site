import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const IconSearch = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>);
export const IconMenu = (p: P) => (<svg {...base} {...p}><path d="M4 8h16M9 16h11" /></svg>);
export const IconClose = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconArrow = (p: P) => (<svg {...base} {...p}><path d="M4 12h15M14 6l6 6-6 6" /></svg>);
export const IconChevronL = (p: P) => (<svg {...base} {...p}><path d="M15 5l-7 7 7 7" /></svg>);
export const IconChevronR = (p: P) => (<svg {...base} {...p}><path d="M9 5l7 7-7 7" /></svg>);
export const IconWhats = (p: P) => (<svg {...base} {...p}><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" /></svg>);
export const IconCalendar = (p: P) => (<svg {...base} {...p}><path d="M4 6h16v14H4zM4 10h16M8 3v5M16 3v5" /></svg>);
export const IconFilters = (p: P) => (<svg {...base} {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>);
export const IconPin = (p: P) => (<svg {...base} {...p}><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2.2" /></svg>);
export const IconBuilding = (p: P) => (<svg {...base} {...p}><path d="M5 21V5l7-2v18M12 8l7 2v11M3 21h18M8 9h1M8 13h1M8 17h1M15 13h1M15 17h1" /></svg>);
export const IconHome = (p: P) => (<svg {...base} {...p}><path d="M4 11l8-6 8 6v9H4zM10 20v-5h4v5" /></svg>);
export const IconBed = (p: P) => (<svg {...base} strokeWidth={1.5} {...p}><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M6 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" /></svg>);
export const IconBath = (p: P) => (<svg {...base} strokeWidth={1.5} {...p}><path d="M3 12h18v2a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5zM6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2" /></svg>);
export const IconCar = (p: P) => (<svg {...base} strokeWidth={1.5} {...p}><path d="M5 16l1.5-5a2 2 0 0 1 1.9-1.4h7.2a2 2 0 0 1 1.9 1.4L19 16M4 16h16v3H4zM7 19v1.5M17 19v1.5" /></svg>);
export const IconArea = (p: P) => (<svg {...base} strokeWidth={1.5} {...p}><path d="M4 4h16v16H4zM4 9h5M15 20v-5h5" /></svg>);
export const IconPlay = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M7 4.5v15l12-7.5z" /></svg>);
export const IconStar = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8z" /></svg>);
export const GoogleMark = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
    <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
    <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2z" />
    <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6z" />
  </svg>
);
/** Linhas em V decorativas (fundos navy) */
export const VLines = ({ className = "vlines", width = 1, three = false }: { className?: string; width?: number; three?: boolean }) => (
  <svg className={className} viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth={width} aria-hidden="true">
    <path d="M20 10 L200 290 L380 10" /><path d="M70 10 L215 240" />{three && <path d="M110 10 L230 200" />}
  </svg>
);
