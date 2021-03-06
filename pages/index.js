import Head from "next/head";
import { useWindowSize } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";

const images = {
  "Adult Nellie": "/compare/AdultNellie.jpg",
  Luke: "/compare/Luke.jpg",
  "Young Nellie": "/compare/YoungNellie.webp",
  Steve: "/compare/Steve.jpg",
  Olivia: "/compare/Olivia.png",
  Shirley: "/compare/Shirley.jpg",
  Theo: "/compare/Theo.png",
};

export default function Compare() {
  const bar = useRef(null);
  const { width } = useWindowSize();
  const [moving, setMoving] = useState(false);
  const [left, setLeft] = useState(width / 2);
  const [leftImage, setLeftImage] = useState("Adult Nellie");
  const [rightImage, setRightImage] = useState("Luke");

  const style = {
    bar: {
      transform: `translateX(${left}px)`,
    },
    left: {
      width: left,
      backgroundImage: `url(${images[leftImage]})`,
      backgroundSize: "100vw 100vh",
    },
    right: {
      backgroundImage: `url(${images[rightImage]})`,
      backgroundSize: "100vw 100vh",
      backgroundPositionX: `${width - left}px`,
    },
  };

  function onMouseMove(e) {
    if (!moving) return;
    e.preventDefault();
    setLeft(
      Math.max(
        width / 5,
        Math.min((4 * width) / 5, e.clientX + bar.current.offsetLeft)
      )
    );
  }

  useEffect(() => {
    setLeft(width / 2);
  }, [width]);

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Who Is The Bent Neck Lady?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative max-h-screen" onMouseMove={onMouseMove}>
        <div
          className="absolute w-2 h-full bg-black bg-opacity-75 cursor-move flex items-center justify-center group"
          style={style.bar}
          ref={bar}
          onMouseDown={() => setMoving(true)}
          onMouseUp={() => setMoving(false)}
        >
          <div className="group-hover:animate-pulse relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-12 w-12 absolute right-full mr-12 text-white text-opacity-50 invisible group-hover:visible"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-12 w-12 absolute left-full ml-12 text-white text-opacity-50 invisible group-hover:visible"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <section className="flex h-screen">
          <div className="left bg-black h-screen" style={style.left}></div>
          <div
            className="right bg-black h-screen flex-1"
            style={style.right}
          ></div>
        </section>
        <nav className="absolute left-0 w-screen bottom-0 h-24 bg-black flex items-center justify-between px-12">
          <label
            className="text-3xl block text-left text-white bg-black cursor-pointer"
            htmlFor="left"
          >
            <select
              class="form-select block w-full mt-1 bg-black bg-opacity-60"
              id="left"
              value={leftImage}
              onChange={(event) => setLeftImage(event.target.value)}
            >
              {Object.entries(images).map(([name, src]) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label
            className="text-3xl block text-left text-white bg-black cursor-pointer"
            htmlFor="right"
          >
            <select
              class="form-select block w-full mt-1 bg-black bg-opacity-60"
              id="right"
              value={rightImage}
              onChange={(event) => setRightImage(event.target.value)}
            >
              {Object.entries(images).map(([name, src]) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </nav>
      </main>
    </div>
  );
}
