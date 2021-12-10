import Head from "next/head";
import { useWindowSize } from "../lib/hooks";
import { useEffect, useRef, useState } from "react";

const images = {
  "Adult Nellie": "/compare/AdultNellie.jpg",
  Luke: "/compare/Luke.jpg",
  "Young Nellie": "/compare/YoungNellie.webp",
  "Steve": "/compare/Steve.jpg",
  "Olivia": "/compare/Olivia.png",
  "Shirley": "/compare/Shirley.jpg"
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
          className="absolute w-2 h-full bg-black bg-opacity-75 cursor-move flex items-center justify-center"
          style={style.bar}
          ref={bar}
          onMouseDown={() => setMoving(true)}
          onMouseUp={() => setMoving(false)}
        >
          <div className="h-12 w-12 rounded-full bg-white bg-opacity-50 rotate-90" />
        </div>
        <section className="flex h-screen">
          <div className="left bg-black h-screen" style={style.left}></div>
          <div
            className="right bg-black h-screen flex-1"
            style={style.right}
          ></div>
        </section>
        <nav className="absolute left-0 w-screen bottom-0 h-24 bg-black flex items-center justify-between px-12">
          <label className="text-3xl block text-left text-white bg-black cursor-pointer" htmlFor="left">
            <select class="form-select block w-full mt-1 bg-black bg-opacity-60" id="left" value={leftImage} onChange={event => setLeftImage(event.target.value)}>
              {Object.entries(images).map(([name, src]) => (
                <option key={name} value={name}>{name}</option> 
              ))}
            </select>
          </label>
          <label className="text-3xl block text-left text-white bg-black cursor-pointer" htmlFor="right">
            <select class="form-select block w-full mt-1 bg-black bg-opacity-60" id="right" value={rightImage} onChange={event => setRightImage(event.target.value)}>
            {Object.entries(images).map(([name, src]) => (
                <option key={name} value={name}>{name}</option> 
              ))}
            </select>
          </label>
        </nav>
      </main>
    </div>
  );
}
