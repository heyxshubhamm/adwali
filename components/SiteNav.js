"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const SERVICES = [
  { name: "SEO", href: "/seo/", color: "#0FA968", desc: "Rank higher and pull in search traffic that converts.", icon: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>) },
  { name: "Paid Media", href: "/paid-media/", color: "#2563EB", desc: "Google, Meta, and LinkedIn ads that pay for themselves.", icon: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /></>) },
  { name: "Social Media", href: "/social-media/", color: "#FF2D6B", desc: "Build a following and keep it engaged.", icon: (<path d="M20.6 8.6a4.5 4.5 0 00-7.6-2.4L12 7.1l-1-1a4.5 4.5 0 10-6.4 6.4l7.4 7.4 7.4-7.4a4.5 4.5 0 001.2-3.9z" />) },
  { name: "Content", href: "/content-marketing/", color: "#FF6B35", desc: "Blogs, copy, and stories that do the selling.", icon: (<><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>) },
  { name: "Email Marketing", href: "/email-marketing-automation/", color: "#0891B2", desc: "Automated flows that nurture and close.", icon: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></>) },
  { name: "Influencer", href: "/influencer/", color: "#EF4444", desc: "Creator partnerships that reach the right people.", icon: (<path d="M12 3l2.4 4.9 5.4.5-4.1 3.7 1.2 5.3L12 20.6l-5.3 2.8 1.2-5.3-4.1-3.7 5.4-.5z" />) },
  { name: "Video", href: "/video/", color: "#6366F1", desc: "Reels, ad films, and motion that stop the scroll.", icon: (<><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" fill="white" /></>) },
  { name: "Branding", href: "/branding/", color: "#E8A400", desc: "Identity, design, and reputation done right.", icon: (<path d="M12 3l1.9 5 5.1 1.9-5.1 1.9L12 17l-1.9-5.2L5 9.9l5.1-1.9z" />) },
  { name: "Web", href: "/web-design/", color: "#7C3AED", desc: "Sites and stores built to load fast and convert.", icon: (<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />) },
  { name: "Consulting", href: "/consulting/", color: "#0D9488", desc: "Strategy and growth advice when you need direction.", icon: (<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.4 1 1 1 1.6V16h5v-.5c0-.6.4-1.2 1-1.6A6 6 0 0012 3z" />) },
];
const INDUSTRIES = [
  { name: "Automotive", href: "/industry-automotive/" }, { name: "B2B", href: "/industry-b2b/" },
  { name: "D2C Brands", href: "/industry-d2c/" }, { name: "E-commerce", href: "/industry-ecommerce/" },
  { name: "Education", href: "/industry-education/" }, { name: "Fashion & Beauty", href: "/industry-fashion-beauty/" },
  { name: "Fintech", href: "/industry-fintech/" }, { name: "FMCG", href: "/industry-fmcg/" },
  { name: "Food & Beverage", href: "/industry-food-beverage/" }, { name: "Healthcare", href: "/industry-healthcare/" },
  { name: "Hospitality", href: "/industry-hospitality/" }, { name: "Jewellery", href: "/industry-jewellery/" },
  { name: "Logistics", href: "/industry-logistics/" }, { name: "Manufacturing", href: "/industry-manufacturing/" },
  { name: "Media & Entertainment", href: "/industry-media-entertainment/" }, { name: "Personal Care", href: "/industry-personal-care/" },
  { name: "Real Estate", href: "/industry-real-estate/" }, { name: "SaaS & Technology", href: "/industry-saas/" },
  { name: "Startups", href: "/industry-startups/" }, { name: "Travel & Tourism", href: "/industry-travel-tourism/" },
];
const LINKS = [{ name: "Work", href: "/work/" }, { name: "Blog", href: "/blog/" }, { name: "About", href: "/about/" }];

function Chev({ open }) {
  return (
    <svg className={"ml-1 h-4 w-4 flex-none transition-transform " + (open ? "rotate-180" : "")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}
function Icon({ paths }) {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">{paths}</svg>);
}

export default function SiteNav() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [msub, setMsub] = useState(null);
  const [canHover, setCanHover] = useState(false);
  const timer = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  useEffect(() => {
    function onDoc(e) { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const openMenu = (n) => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } setOpen(n); };
  const scheduleClose = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(null), 160); };
  const enter = (n) => { if (canHover) openMenu(n); };
  const leave = () => { if (canHover) scheduleClose(); };
  const toggle = (n) => setOpen((c) => (c === n ? null : n));

  const trigger = "flex h-16 items-center bg-transparent border-0 cursor-pointer px-3 text-[15px] font-medium no-underline transition-colors";
  const panelWrap = "absolute left-0 right-0 top-full z-[200] px-4 pt-2 xl:px-6";
  const panelCard = "overflow-hidden rounded-2xl border border-[#E4D8C6] bg-[#FAF4EA] shadow-2xl";
  const barText = "text-sm text-[#17110F]/70";
  const viewAll = "text-sm font-semibold text-[#FF2D6B] no-underline hover:underline";

  return (
    <header ref={navRef} className="sticky top-0 z-[200] border-b border-[#E4D8C6] bg-[#FAF4EA]/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => { setMobile(false); setOpen(null); }} className="text-2xl font-extrabold tracking-tight text-[#17110F] no-underline">adwali<span className="text-[#FF2D6B]">.</span></Link>

        <nav className="hidden h-16 items-center gap-0.5 lg:flex">
          <div className="flex h-16 items-center" onMouseEnter={() => enter("services")} onMouseLeave={leave}>
            <button className={trigger + (open === "services" ? " text-[#FF2D6B]" : " text-[#17110F] hover:text-[#FF2D6B]")} aria-expanded={open === "services"} onClick={() => toggle("services")}>Services <Chev open={open === "services"} /></button>
            {open === "services" && (
              <div className={panelWrap} onMouseEnter={() => enter("services")} onMouseLeave={leave}>
                <div className={panelCard}>
                  <div className="grid grid-cols-2 gap-1 p-3 sm:p-4 lg:grid-cols-3 xl:grid-cols-4">
                    {SERVICES.map((s) => (
                      <Link key={s.href} href={s.href} onClick={() => setOpen(null)} className="group flex items-start gap-3 rounded-xl p-3 no-underline transition-colors hover:bg-[#F2E8D8]">
                        <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg" style={{ backgroundColor: s.color }}><Icon paths={s.icon} /></span>
                        <span className="block min-w-0">
                          <span className="block text-sm font-semibold text-[#17110F] group-hover:text-[#FF2D6B]">{s.name}</span>
                          <span className="mt-0.5 block text-xs leading-snug text-[#17110F]/60">{s.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E4D8C6] bg-[#F2E8D8] px-4 py-3 sm:px-6">
                    <span className={barText}>Ten services, one team that talks to each other.</span>
                    <Link href="/services/" onClick={() => setOpen(null)} className={viewAll}>View all services &rarr;</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex h-16 items-center" onMouseEnter={() => enter("industries")} onMouseLeave={leave}>
            <button className={trigger + (open === "industries" ? " text-[#FF2D6B]" : " text-[#17110F] hover:text-[#FF2D6B]")} aria-expanded={open === "industries"} onClick={() => toggle("industries")}>Industries <Chev open={open === "industries"} /></button>
            {open === "industries" && (
              <div className={panelWrap} onMouseEnter={() => enter("industries")} onMouseLeave={leave}>
                <div className={panelCard}>
                  <div className="grid grid-cols-2 gap-1 p-3 sm:p-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {INDUSTRIES.map((i) => (
                      <Link key={i.href} href={i.href} onClick={() => setOpen(null)} className="rounded-lg px-3 py-2 text-sm text-[#17110F]/80 no-underline transition-colors hover:bg-[#F2E8D8] hover:text-[#FF2D6B]">{i.name}</Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#E4D8C6] bg-[#F2E8D8] px-4 py-3 sm:px-6">
                    <span className={barText}>Marketing built around how your industry actually buys.</span>
                    <Link href="/industries/" onClick={() => setOpen(null)} className={viewAll}>View all industries &rarr;</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 text-[15px] font-medium text-[#17110F] no-underline transition-colors hover:text-[#FF2D6B]">{l.name}</Link>
          ))}
          <Link href="/contact/" className="ml-2 whitespace-nowrap rounded-full bg-[#FF2D6B] px-4 py-2 text-[15px] font-semibold text-white no-underline transition-colors hover:bg-[#D91752]">Book a Free Consultation</Link>
        </nav>

        <button className="inline-flex items-center justify-center bg-transparent border-0 cursor-pointer rounded-md p-2 text-[#17110F] lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Toggle menu" aria-expanded={mobile}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">{mobile ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}</svg>
        </button>
      </div>

      {mobile && (
        <div className="border-t border-[#E4D8C6] bg-[#FAF4EA] lg:hidden">
          <div className="mx-auto max-h-[78vh] max-w-3xl space-y-1 overflow-y-auto px-4 py-4 sm:px-6">
            <button onClick={() => setMsub(msub === "services" ? null : "services")} className="flex w-full items-center justify-between bg-transparent border-0 cursor-pointer rounded-md px-3 py-3 text-left text-base font-semibold text-[#17110F]">Services <Chev open={msub === "services"} /></button>
            {msub === "services" && (
              <div className="grid grid-cols-1 gap-1 pb-2 pl-1 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setMobile(false)} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#17110F]/80 no-underline"><span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-md" style={{ backgroundColor: s.color }}><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">{s.icon}</svg></span>{s.name}</Link>
                ))}
                <Link href="/services/" onClick={() => setMobile(false)} className="px-3 py-2 text-sm font-semibold text-[#FF2D6B] no-underline sm:col-span-2">View all services &rarr;</Link>
              </div>
            )}
            <button onClick={() => setMsub(msub === "industries" ? null : "industries")} className="flex w-full items-center justify-between bg-transparent border-0 cursor-pointer rounded-md px-3 py-3 text-left text-base font-semibold text-[#17110F]">Industries <Chev open={msub === "industries"} /></button>
            {msub === "industries" && (
              <div className="grid grid-cols-2 gap-1 pb-2 pl-1 sm:grid-cols-3">
                {INDUSTRIES.map((i) => (
                  <Link key={i.href} href={i.href} onClick={() => setMobile(false)} className="rounded-md px-3 py-2 text-sm text-[#17110F]/80 no-underline">{i.name}</Link>
                ))}
                <Link href="/industries/" onClick={() => setMobile(false)} className="px-3 py-2 text-sm font-semibold text-[#FF2D6B] no-underline sm:col-span-3">View all industries &rarr;</Link>
              </div>
            )}
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMobile(false)} className="block rounded-md px-3 py-3 text-base font-semibold text-[#17110F] no-underline">{l.name}</Link>
            ))}
            <Link href="/contact/" onClick={() => setMobile(false)} className="mt-2 block rounded-full bg-[#FF2D6B] px-5 py-3 text-center text-base font-semibold text-white no-underline">Book a Free Consultation</Link>
          </div>
        </div>
      )}
    </header>
  );
}
