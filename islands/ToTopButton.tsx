import { useEffect, useState } from "preact/hooks";

import { UrartsTrimBrush } from "@components/Assets.tsx";

export default function ToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(globalThis.scrollY > 50);
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    globalThis.scrollTo({ top: 0, behavior: "smooth" });
    
    const target: HTMLElement | null = document.querySelector('.scrollable');
    if (target) {
      target.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        class={`fixed right-2 bottom-2 md:right-4 md:bottom-4 flex items-center justify-center p-2 bg-red text-white border-none rounded-full shadow-md cursor-pointer z-[9999] ${
          showButton ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-300 ease-in-out`}
      >
        <UrartsTrimBrush />
      </button>
    </>
  );
}
