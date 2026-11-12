"use client";

import { useEffect, useState } from "react";

// Brief brand loader; adds body.loaded which triggers the hero entrance choreography.
export function Loader() {
  const [, force] = useState(0);
  useEffect(() => {
    const add = () => {
      document.body.classList.add("loaded");
      force((n) => n + 1);
    };
    const t = setTimeout(add, 1000); // fallback — never hold the page hostage
    window.addEventListener("load", add);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", add);
    };
  }, []);
  return (
    <div id="loader" aria-hidden="true">
      <div className="loader-mark">
        <span>Azure&nbsp;Palms</span>
        <small>RESORT&nbsp;&amp;&nbsp;SPA</small>
        <span className="loader-line" />
      </div>
    </div>
  );
}
