"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { site } from "@/lib/site";

const SOCIAL_ICONS = {
  "Azure Palms on Instagram": <InstagramGlyph />,
  "Azure Palms on Facebook": <FacebookGlyph />,
  "Azure Palms on YouTube": <YoutubeGlyph />,
};

function InstagramGlyph() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
}
function FacebookGlyph() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
}
function YoutubeGlyph() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>;
}

function TideLetterForm() {
  const preview = () => toast({ title: "Public demo only. Newsletter sign-ups are not sent or saved." });

  return (
    <div className="newsletter">
      <button type="button" onClick={preview} aria-label="Newsletter demo notice">
        Preview only
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
      </button>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brandrow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width={44} height={44} className="size-11" loading="lazy" />
              <p className="footer__brand">Azure&nbsp;Palms</p>
            </div>
            <p>
              A private mile of the Caribbean, family-run since 1998. Twenty-four villas, one long tide, and the catch
              of the morning.
            </p>
            <div className="socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>
                  {SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS]}
                </a>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#story">Our story</a></li>
              <li><a href="#villas">Villas &amp; suites</a></li>
              <li><a href="#rooms">Rooms</a></li>
              <li><a href="#pack">The Exclusive Pack</a></li>
              <li><a href="#experiences">Experiences</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Getting here</a></li>
            </ul>
          </div>
          <div>
            <h4>The Tide Letter</h4>
            <TideLetterForm />
            <p className="news-note">
              Public demo only. Newsletter sign-ups are not sent or saved.
            </p>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 {site.name}, Costa Verde Peninsula. Salt in the air, always.</span>
          <span>
            Reservations {site.phone} · {site.email}
          </span>
        </div>
      </div>
    </footer>
  );
}
