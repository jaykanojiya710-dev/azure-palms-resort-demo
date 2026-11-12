"use client";

import { Reveal } from "./reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GOOD_TO_KNOW } from "@/lib/data";
import { site } from "@/lib/site";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";

function MapSvg() {
  return (
    <svg viewBox="0 0 600 440" role="img" aria-label="Stylized map: Azure Palms on the Costa Verde Peninsula, 22 minutes from Costa Verde International">
      <rect width="600" height="440" fill="#DCE9E6" />
      <path d="M0,0 H600 V170 C555,196 505,178 455,205 C405,232 360,205 310,232 C262,258 215,235 165,262 C115,289 55,272 0,300 Z" fill="#F0E9DC" />
      <path d="M0,300 C55,272 115,289 165,262 C215,235 262,258 310,232 C360,205 405,232 455,205 C505,178 555,196 600,170" fill="none" stroke="#E8DFD3" strokeWidth="12" strokeLinecap="round" />
      <path d="M60,84 C160,110 250,150 340,224" fill="none" stroke="#837B72" strokeWidth="2" strokeDasharray="1 8" strokeLinecap="round" opacity=".7" />
      <path d="M448,206 C480,196 512,188 545,182" fill="none" stroke="#837B72" strokeWidth="2" strokeDasharray="1 8" strokeLinecap="round" opacity=".55" />
      <circle cx="120" cy="120" r="5" fill="#D9CDBB" /><circle cx="128" cy="127" r="4" fill="#D9CDBB" /><circle cx="112" cy="128" r="3.6" fill="#D9CDBB" />
      <circle cx="250" cy="165" r="5" fill="#D9CDBB" /><circle cx="242" cy="172" r="4" fill="#D9CDBB" />
      <circle cx="395" cy="185" r="4.5" fill="#D9CDBB" /><circle cx="402" cy="192" r="3.6" fill="#D9CDBB" />
      <text x="52" y="64" fontFamily="Inter,sans-serif" fontSize="10" letterSpacing="2.4" fill="#4A4642" fontWeight="600">COSTA VERDE INTL · 22 MIN</text>
      <text x="452" y="166" fontFamily="Inter,sans-serif" fontSize="10" letterSpacing="2.4" fill="#4A4642" fontWeight="600">PUNTA SUR LIGHT</text>
      <text x="236" y="286" fontFamily="Inter,sans-serif" fontSize="10" letterSpacing="2.4" fill="#0E5E5A" opacity=".8" fontWeight="600">PLAYA SERENA</text>
      <text x="150" y="380" fontFamily="Playfair Display,serif" fontSize="22" fontStyle="italic" fill="#0E5E5A" opacity=".45">Bahía Serena</text>
      <circle cx="340" cy="224" r="10" fill="none" stroke="#0E5E5A" opacity=".5">
        <animate attributeName="r" values="10;26" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".5;0" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="340" cy="224" r="9" fill="#0E5E5A" /><circle cx="340" cy="224" r="3.4" fill="#FAF7F2" />
      <rect x="272" y="244" width="136" height="26" rx="13" fill="#FAF7F2" stroke="#0E5E5A" strokeOpacity=".25" />
      <text x="340" y="261" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10.5" letterSpacing="2.6" fill="#0E5E5A" fontWeight="600">AZURE PALMS</text>
      <g transform="translate(556,44)">
        <path d="M0,-14 L6,8 L0,3 L-6,8 Z" fill="#4A4642" />
        <text x="0" y="24" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fill="#4A4642" fontWeight="600">N</text>
      </g>
      <g transform="translate(40,408)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#4A4642" strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="#4A4642" strokeWidth="1.5" />
        <line x1="60" y1="-4" x2="60" y2="4" stroke="#4A4642" strokeWidth="1.5" />
        <text x="72" y="4" fontFamily="Inter,sans-serif" fontSize="10" fill="#4A4642">1 KM</text>
      </g>
    </svg>
  );
}

const ROWS = [
  {
    icon: <MapPinIcon />,
    label: "Address",
    body: (
      <>
        Azure Palms, Playa Serena
        <br />
        Costa Verde Peninsula
      </>
    ),
  },
  { icon: <PhoneIcon />, label: "Reservations", body: <>{site.phone} · daily 7:00–22:00 CST</> },
  { icon: <MailIcon />, label: "Write to us", body: <>{site.email} · {site.concierge}</> },
  {
    icon: <ClockIcon />,
    label: "Getting here",
    body: <>Private transfer from Costa Verde International (CVER), 22 minutes — or by boat from Punta Sur, 40.</>,
  },
];

export function Contact() {
  return (
    <section className="section section--tint" id="contact" aria-labelledby="contact-h">
      <div className="container">
        <div className="contact__grid">
          <div>
            <Reveal>
              <p className="eyebrow">Find Us</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="contact-h">Two hours from anywhere</h2>
            </Reveal>
            <div className="c-details">
              {ROWS.map((r, i) => (
                <Reveal key={r.label} delay={0.12 + i * 0.05}>
                  <div className="c-row">
                    {r.icon}
                    <div>
                      <b>{r.label}</b>
                      <p>{r.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="faq">
              <h4>Good to know</h4>
              <Accordion type="single" collapsible>
                {GOOD_TO_KNOW.map((f, i) => (
                  <AccordionItem key={f.q} value={f.q}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <div className="map-card">
              <MapSvg />
              <div className="map-note">
                <span>{site.coords}</span>
                <span>Boat channel markers begin at Punta Sur</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
