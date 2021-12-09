import Head from "next/head";
import { useWindowSize } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";

const images = {
  "Adult Nellie": "/compare/AdultNellie.jpg",
  Luke: "/compare/Luke.jpg",
};

export default function Compare() {
  const bar = useRef(null);
  const { width } = useWindowSize();
  const [moving, setMoving] = useState(false);
  const [left, setLeft] = useState(width / 2);
  const [leftImage, setLeftImage] = useState("/compare/AdultNellie.jpg");
  const [rightImage, setRightImage] = useState("/compare/Luke.jpg");

  const style = {
    bar: {
      transform: `translateX(${left}px)`,
    },
    left: {
      width: left,
      backgroundImage: `url(${leftImage})`,
      backgroundSize: "100vw 100vh",
    },
    right: {
      backgroundImage: `url(${rightImage})`,
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

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Who Is The Bent Neck Lady?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative max-h-screen" onMouseMove={onMouseMove}>
        <div
          className="absolute w-2 h-full bg-black bg-opacity-75 cursor-move"
          style={style.bar}
          ref={bar}
          onMouseDown={() => setMoving(true)}
          onMouseUp={() => setMoving(false)}
        ></div>
        <section className="flex h-screen">
          <div className="left bg-green-500 h-screen" style={style.left}></div>
          <div
            className="right bg-red-500 h-screen flex-1"
            style={style.right}
          ></div>
        </section>
        <nav className="absolute left-0 w-screen bottom-0 h-24 bg-black flex items-center justify-between px-12">
          <label className="text-3xl block text-left text-white bg-black cursor-pointer" htmlFor="left">
            <select class="form-select block w-full mt-1 bg-black bg-opacity-60" id="left" onChange={value => setLeftImage(value)}>
              {Object.entries(images).map(([name, src]) => (
                <option key={name} value={src}>{name}</option> 
              ))}
            </select>
          </label>
          <label className="text-3xl block text-left text-white bg-black cursor-pointer" htmlFor="right">
            <select class="form-select block w-full mt-1 bg-black bg-opacity-60" id="right" onChange={value => setRightImage(value)}>
            {Object.entries(images).map(([name, src]) => (
                <option key={name} value={src}>{name}</option> 
              ))}
            </select>
          </label>
        </nav>
      </main>
    </div>
  );
}
