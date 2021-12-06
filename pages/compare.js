import Head from "next/head";
import { useWindowSize } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";
import PointerTracker from "pointer-tracker";

export default function Compare() {
  const bar = useRef(null);
  const { width } = useWindowSize();
  const [moving, setMoving] = useState(false);
  const [left, setLeft] = useState(width / 2 ?? 100);
  const [leftImage, setLeftImage] = useState(
    "https://images.unsplash.com/photo-1638642639326-464f9d8f39dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  );
  const [rightImage, setRightImage] = useState(
    "https://images.unsplash.com/photo-1638735807537-55b767cd19e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  );

  const style = {
    transform: `translateX(${left}px)`,
  };

  function onMouseMove(e) {
    if (!moving) return;
    e.preventDefault();
    setLeft(
      Math.max(width / 5, Math.min(4 * width / 5, e.clientX + bar.current.offsetLeft))
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Who Is The Bent Neck Lady?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="relative max-h-screen" onMouseMove={onMouseMove}>
        <div
          className="absolute w-2 h-full bg-black bg-opacity-75 cursor-move"
          style={style}
          ref={bar}
          onMouseDown={() => setMoving(true)}
          onMouseUp={() => setMoving(false)}
        ></div>
        <section className="flex h-screen">
          <div
            className="left bg-green-500 h-screen"
            style={{
              width: left,
              backgroundImage: `url(${leftImage})`,
              backgroundSize: "100vw",
            }}
          ></div>
          <div
            className="right bg-red-500 h-screen flex-1"
            style={{
              backgroundImage: `url(${rightImage})`,
              backgroundSize: "100vw",
              backgroundPositionX: `${width - left}px`,
            }}
          ></div>
        </section>
        <nav className="absolute left-0 w-screen bottom-0 h-48 bg-gray-900"></nav>
      </main>
    </div>
  );
}
