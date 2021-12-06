import Head from "next/head";
import { useWindowSize } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import PointerTracker from "pointer-tracker";

export default function Compare() {
  const bar = useRef(null);
  const { width } = useWindowSize();
  const [moving, setMoving] = useState(false);
  const [left, setLeft] = useState(width / 2 ?? 100);

  const style = {
    transform: `translateX(${left}px)`,
  };

  function onMouseMove(e) {
    if (!moving) return;
    e.preventDefault();
    setLeft(Math.max(
      10, Math.min(width - 10, e.clientX + bar.current.offsetLeft)
    ));
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Who Is The Bent Neck Lady?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="relative max-h-screen" onMouseMove={onMouseMove}>
        <div
          className="absolute w-2 h-full bg-black cursor-move"
          style={style}
          ref={bar}
          onMouseDown={() => setMoving(true)}
          onMouseUp={() => setMoving(false)}
        ></div>
        <section className="flex h-screen">
          <div className="left bg-green-500 h-screen" style={{ width: left }}></div>
          <div className="right bg-red-500 h-screen flex-1"></div>
        </section>
        <nav className="absolute left-0 w-screen bottom-0 h-48 bg-gray-900"></nav>
      </main>
    </div>
  );
}
