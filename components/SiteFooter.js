"use client";
import { useState } from "react";
import Link from "next/link";
import { footerPillars } from "@/lib/pages";

function Chev({ open }) {
  return (
    <svg className={"h-5 w-5 flex-none text-[#C7BAA8] transition-transform " + (open ? "rotate-180" : "")} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}
const href = (slug) => (slug ? "/" + slug + "/" : "/");
const linkCls = "text-sm text-[#FAF4EA]/70 no-underline transition-colors hover:text-[#FF2D6B]";

export default function SiteFooter() {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (t) => setOpen((p) => { const n = new Set(p); if (n.has(t)) n.delete(t); else n.add(t); return n; });
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#17110F] px-4 pt-14 pb-8 text-[#FAF4EA] sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-md">
          <div className="text-2xl font-extrabold tracking-tight">adwali</div>
          <p className="mt-3 leading-relaxed text-[#C7BAA8]">Har brand ki adwali baat. A full-service digital marketing agency in Jaipur for brands that refuse to stay quiet.</p>
          <a href="mailto:hello@adwali.com" className="mt-3 inline-block font-semibold text-[#FF2D6B] hover:underline">hello@adwali.com</a>
        </div>

        <nav aria-label="All pages" className="border-t border-white/10">
          {footerPillars.map((p) => {
            const isOpen = open.has(p.title);
            return (
              <div key={p.title} className="border-b border-white/10">
                <button onClick={() => toggle(p.title)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent py-4 text-left text-[15px] font-semibold text-[#FAF4EA]">
                  <span>{p.title}</span>
                  <Chev open={isOpen} />
                </button>
                <div className={isOpen ? "pb-6" : "hidden"}>
                  {p.subgroups ? (
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
                      {p.subgroups.map((sg) => (
                        <div key={sg.name}>
                          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#C7BAA8]">{sg.name}</h3>
                          <ul className="m-0 list-none space-y-2 p-0">
                            {sg.links.map((l) => (<li key={l.slug} className="m-0"><Link href={href(l.slug)} className={linkCls}>{l.label}</Link></li>))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-2 p-0 sm:grid-cols-3 lg:grid-cols-4">
                      {p.links.map((l) => (<li key={l.slug} className="m-0"><Link href={href(l.slug)} className={linkCls}>{l.label}</Link></li>))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mt-8 flex flex-col justify-between gap-2 text-sm text-[#9C8F82] sm:flex-row">
          <span>&copy; {year} adwali. All rights reserved.</span>
          <span>Digital Marketing Agency in Jaipur, India</span>
        </div>
      </div>
    </footer>
  );
}
