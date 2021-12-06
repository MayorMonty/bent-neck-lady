import Head from "next/head";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useWindowSize } from "../lib/hooks";
import { useState } from "react";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const { height } = useWindowSize();

  useScrollPosition(({ currPos: position }) => {
    setOffset(position.y);
    console.log(position.y);
  });

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Who Is The Bent Neck Lady?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        className="bg-hero-pattern bg-cover bg-center flex flex-col items-center justify-end"
        style={{ height: Math.min(height - offset, 1.75 * height) }}
      >
        <h1
          className="text-white text-center text-4xl mb-24"
          style={{ opacity: Math.max(1 + offset / height, 0) }}
        >
          Who Is The Bent Neck Lady?
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-white w-8 h-8 mb-24 animate-bounce"
          style={{ opacity: Math.max(1 + offset / height, 0) }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </header>
      <main className="min-h-screen bg-black p-6 md:w-2/3 sm:w-full m-auto mt-12">
        <p class="text-white text-opacity-90">
          In Mike Flanagan's Netflix series, <em>The Haunting of Hill House</em>, 
        </p>
      </main>
    </div>
  );
}
