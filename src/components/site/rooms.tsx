"use client";

import { Reveal } from "./reveal";
import { useBooking } from "./booking-provider";
import { Button } from "@/components/ui/button";
import { ROOM_LIST } from "@/lib/data";
import { money } from "@/lib/pricing";
import { UsersIcon } from "./icons";

export function Rooms() {
  const { open } = useBooking();
  return (
    <section className="section" id="rooms" aria-labelledby="rooms-h">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <p className="eyebrow">Rooms</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="rooms-h">Three rooms, steps from everything</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="sub">
              Classic hotel comfort for shorter escapes — the same sand, the same kitchen, gentler rates. Every room
              includes breakfast from the beach kitchen.
            </p>
          </Reveal>
        </div>
        <div className="room-list">
          {ROOM_LIST.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1}>
              <article className="room-row">
                <div className="room-media">
                  <img src={r.img} alt={`${r.name} at Azure Palms`} loading="lazy" />
                </div>
                <div className="room-body">
                  <h3>{r.name}</h3>
                  <p className="villa-desc">{r.desc}</p>
                  <ul className="chips">
                    {r.amenities.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
                <div className="room-side">
                  <p className="price">
                    {money(r.price)}
                    <span>/ night</span>
                  </p>
                  <span className="sleeps">
                    <UsersIcon />
                    Sleeps {r.max}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => open({ mode: "villa", villaId: r.id })}>
                    Reserve
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
